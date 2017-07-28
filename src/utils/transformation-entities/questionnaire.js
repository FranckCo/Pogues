import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME } from 'constants/pogues-constants';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

export const defaultQuestionnaireState = {
  id: undefined,
  name: undefined,
  label: undefined,
  agency: undefined,
  survey: undefined,
  components: [],
  codeLists: [],
  conditions: [],
  owner: undefined,
};

export const defaultQuestionnaireModel = {
  id: '',
  name: '',
  label: [],
  declarations: [],
  goTos: [],
  controls: [],
  genericName: QUESTIONNAIRE,
  children: [],
  depth: 0,
  owner: '',
  type: SEQUENCE_TYPE_NAME,
  agency: 'fr.insee', // @TODO: This should not be constant,
  survey: {
    agency: 'fr.insee', // @TODO: Idem
    name: 'POPO', // @TODO: Idem,
    id: '',
  },
  componentGroups: [
    // @TODO: Idem
    {
      name: 'PAGE_1', // @TODO: Idem
      label: 'Components for page 1', // @TODO: Idem
      Member: [],
      id: '',
    },
  ],
  codeLists: {
    codeList: [],
    codeListSpecification: [],
  },
};

function modelToState(model) {
  const { id, name, label: [label], agency, survey, components, codesLists, conditions, owner } = model;
  const questionnaireData = {
    id,
    name,
    label,
    agency,
    survey,
    owner,
    components: Object.keys(components),
    codeLists: Object.keys(codesLists),
    conditions: Object.keys(conditions),
  };

  return {
    ...defaultQuestionnaireState,
    ...questionnaireData,
  };
}

function stateToModel(questionnaire, children, codeList) {
  const { id, name, label, owner } = questionnaire;
  const questionnaireModel = {
    id,
    name,
    label: [label],
    owner,
    children,
    codeLists: {
      codeList,
      codeListSpecification: [],
    },
  };

  return {
    ...defaultQuestionnaireModel,
    ...questionnaireModel,
  };
}

function formToState(form) {
  const { id, name, label, owner } = form;

  return {
    ...defaultQuestionnaireState,
    id,
    name,
    label,
    owner,
  };
}

export default {
  modelToState,
  stateToModel,
  formToState,
};
