import _ from 'lodash';

import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME } from 'constants/pogues-constants';
import { getQuestionLabelFromRaw } from 'utils/model/model-utils';
import { nameFromLabel } from 'utils/name-utils';
import ResponseFormat from './response-format';
import Declaration, { defaultDeclarationForm } from './declaration';
import Control, { defaultControlForm } from './control';
import Redirection, { defaultRedirectionForm } from './redirection';
import { markdownToHtml } from 'layout/forms/controls/rich-textarea';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

export const defaultComponentForm = {
  label: '',
  name: '',
};

export const defaultComponentState = {
  id: undefined,
  type: undefined,
  parent: undefined,
  weight: undefined,
  name: undefined,
  label: undefined,
  rawLabel: undefined,
  children: [],
  responseFormat: undefined,
  declarations: undefined,
  controls: undefined,
  redirections: undefined,
};

export const defaultComponentModel = {
  id: '',
  type: '',
  name: '',
  label: [],
  genericName: '',
  depth: 0,
  questionType: '',
  children: [],
  responses: [],
  responseStructure: {
    dimensions: {},
  },
  declarations: [],
  controls: [],
  redirections: [],
};

function stateToModelChildren(children, components, codesLists, depth = 0) {
  return children
    .sort((keyA, keyB) => {
      if (components[keyA].weight < components[keyB].weight) return -1;
      if (components[keyA].weight > components[keyB].weight) return 1;
      return 0;
    })
    .map(key => {
      const newDepth = depth + 1;
      return stateToModel({ ...components[key], depth: newDepth }, components, codesLists);
    });
}

function formToState(form) {
  const {
    id,
    type,
    parent,
    weight,
    name,
    label,
    children,
    responseFormat,
    declarations,
    controls,
    redirections,
  } = form;

  const state = {
    id,
    type,
    label,
    name: name || nameFromLabel(label),
    parent: parent || '',
    weight: weight || 0,
    children: children || [],
  };

  if (type === QUESTION) {
    state.rawLabel = state.label;
    state.htmlLabel = markdownToHtml(state.label);

    state.responseFormat = ResponseFormat.formToState(responseFormat);
  }

  state.declarations = Declaration.formToState(declarations || defaultDeclarationForm);
  state.controls = Control.formToState(controls || defaultControlForm);
  state.redirections = Redirection.formToState(redirections || defaultRedirectionForm);

  return {
    ..._.cloneDeep(defaultComponentState),
    ...state,
  };
}

function stateToForm(component, activeCodeLists, activeCodes) {
  const { label, name, type, responseFormat, declarations, controls, redirections } = component;

  const form = {
    label,
    name,
  };

  form.declarations = Declaration.stateToForm(declarations);
  form.controls = Control.stateToForm(controls);
  form.redirections = Redirection.stateToForm(redirections);

  if (type === QUESTION) {
    form.responseFormat = ResponseFormat.stateToForm(responseFormat, activeCodeLists, activeCodes);
  }

  return {
    ...defaultComponentForm,
    ...form,
  };
}

function stateToModel(state, components, codesLists = {}) {
  const { id, depth, name, label, type, children, responseFormat, declarations, controls, redirections } = state;

  let model = {
    id,
    depth,
    name,
    label: [label],
    ...Declaration.stateToModel(declarations || []),
    ...Control.stateToModel(controls || []),
    ...Redirection.stateToModel(redirections || []),
  };

  if (type === QUESTION) {
    model.type = QUESTION_TYPE_NAME;
    model.questionType = responseFormat.type;
    model = {
      ...model,
      ...ResponseFormat.stateToModel(responseFormat, codesLists),
    };
  } else {
    model.type = SEQUENCE_TYPE_NAME;
    if (type === QUESTIONNAIRE) {
      model.genericName = 'QUESTIONNAIRE';
    } else {
      model.genericName = 'MODULE';
    }
    model.children = stateToModelChildren(children, components, codesLists, depth);
  }

  return {
    ..._.cloneDeep(defaultComponentModel),
    ...model,
  };
}

function modelToState(model, activeCodeLists = {}) {
  const {
    id,
    type,
    depth,
    name,
    label: [label],
    parent,
    weight,
    children,
    questionType,
    responses,
    responseStructure,
    declarations,
    controls,
    redirections,
    goTos,
  } = model;

  const state = {
    id,
    name,
    parent: parent || '',
    weight: weight || 0,
  };

  state.declarations = Declaration.modelToState({ declarations });
  state.controls = Control.modelToState({ controls });
  state.redirections = Redirection.modelToState({ redirections: redirections || goTos });

  if (type === SEQUENCE_TYPE_NAME) {
    state.children = children.map(child => child.id);
    state.label = label;
    if (depth === 0) {
      state.type = QUESTIONNAIRE;
    } else if (depth === 1) {
      state.type = SEQUENCE;
    } else {
      state.type = SUBSEQUENCE;
    }
  } else if (type === QUESTION_TYPE_NAME) {
    const dimensions = responseStructure ? responseStructure.dimensions : [];
    state.type = QUESTION;
    state.label = getQuestionLabelFromRaw(label);
    state.rawLabel = label;

    state.htmlLabel = markdownToHtml(state.label);

    state.responseFormat = ResponseFormat.modelToState(
      {
        type: questionType,
        responses,
        dimensions,
      },
      activeCodeLists
    );
  }

  return {
    ..._.cloneDeep(defaultComponentState),
    ...state,
  };
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
