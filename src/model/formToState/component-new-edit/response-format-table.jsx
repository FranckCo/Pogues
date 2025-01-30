import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

import {
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_FORMATS,
  DIMENSION_LENGTH,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
} from '../../../constants/pogues-constants';
import { uuid, verifyVariable } from '../../../utils/utils';
import {
  defaultForm as CodesListDefaultForm,
  defaultState as CodesListDefaultState,
  Factory as CodesListFactory,
} from '../codes-lists/codes-list';

const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { DYNAMIC_LENGTH, FIXED_LENGTH } = DIMENSION_LENGTH;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { DATE, NUMERIC, TEXT, BOOLEAN, DURATION } = DATATYPE_NAME;
const { RADIO } = DATATYPE_VIS_HINT;

export const defaultMeasureSimpleState = {
  mandatory: undefined,
  type: TEXT,
  [TEXT]: {
    maxLength: 249,
    pattern: '',
  },
  [NUMERIC]: {
    maximum: '',
    minimum: '',
    decimals: '',
  },
  [DATE]: {
    maximum: '',
    minimum: '',
    format: '',
  },
  [BOOLEAN]: {},
  [DURATION]: {
    minimum: '',
    maximum: '',
    mihours: '',
    miminutes: '',
    miyears: '',
    mimonths: '',
    mahours: '',
    maminutes: '',
    mayears: '',
    mamonths: '',
    format: '',
  },
};

export const defaultMeasureState = {
  label: '',
  type: SIMPLE,
  [SIMPLE]: defaultMeasureSimpleState,
  [SINGLE_CHOICE]: {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: merge(
      cloneDeep(CodesListDefaultState),
      { id: uuid() },
    ),
    visHint: RADIO,
  },
};

export const defaultMeasureForm = {
  label: '',
  type: SIMPLE,
  [SIMPLE]: defaultMeasureSimpleState,
  [SINGLE_CHOICE]: {
    allowArbitraryResponse: false,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListDefaultForm),
    visHint: RADIO,
  },
};

const defaultPrimaryListState = {
  type: DYNAMIC_LENGTH,
  [DYNAMIC_LENGTH]: {
    minLines: 0,
    maxLines: 0,
  },
  [FIXED_LENGTH]: {
    fixedLength: '',
  },
};

export const defaultState = {
  [PRIMARY]: {
    type: LIST,
    [LIST]: defaultPrimaryListState,
    [CODES_LIST]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListDefaultState),
    },
  },
  [SECONDARY]: {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListDefaultState),
    showSecondaryAxis: false,
  },
  [LIST_MEASURE]: {
    ...defaultMeasureState,
    measures: [],
  },
  [MEASURE]: defaultMeasureState,
};

export function formToStatePrimary(form, codesListPrimary) {
  const { type, [type]: primaryForm } = form;

  const state = {
    type,
  };

  if (type === LIST) {
    const {
      type: listType,
      [listType]: { minLines, maxLines, fixedLength },
    } = primaryForm;

    state[LIST] = {
      type: listType,
      [listType]:
        listType === DYNAMIC_LENGTH ? { minLines, maxLines } : { fixedLength },
    };
  } else {
    const { [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm } = primaryForm;
    state[CODES_LIST] = {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]:
        codesListPrimary.formToStateComponent(codesListForm),
    };
  }

  return state;
}

export function formToStateSecondary(form, codesListSecondary) {
  const {
    showSecondaryAxis,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
  } = form;
  return {
    showSecondaryAxis,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      codesListSecondary.formToStateComponent(codesListForm),
  };
}

export function formToStateMeasure(form, codesListMeasure) {
  const { label, type, [type]: measureForm } = form;
  const state = {
    label: verifyVariable(label),
    type,
  };

  if (type === SIMPLE) {
    const { type: simpleType, [simpleType]: simpleForm } = measureForm;

    state[SIMPLE] = {
      type: simpleType,
      [simpleType]: { ...simpleForm },
    };
  } else {
    const { visHint, [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm } =
      measureForm;
    const codesList = codesListMeasure
      ? codesListMeasure.formToStateComponent(codesListForm)
      : CodesListFactory().formToState(codesListForm);

    state[SINGLE_CHOICE] = {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesList,
    };
  }
  return state;
}

export function formToStateMeasureList(form) {
  const { measures } = form;
  return measures.map((measure) => {
    return formToStateMeasure(measure);
  });
}

export function formToState(form, transformers) {
  const {
    [PRIMARY]: primaryForm,
    [SECONDARY]: secondaryForm,
    [MEASURE]: measureForm,
    [LIST_MEASURE]: listMeasureForm,
  } = form;

  const state = {
    [PRIMARY]: formToStatePrimary(primaryForm, transformers.codesListPrimary),
  };

  if (secondaryForm.showSecondaryAxis && primaryForm.type === CODES_LIST) {
    state[SECONDARY] = formToStateSecondary(
      secondaryForm,
      transformers.codesListSecondary,
    );
    state[MEASURE] = formToStateMeasure(
      measureForm,
      transformers.codesListMeasure,
    );
  } else {
    state[LIST_MEASURE] = formToStateMeasureList(listMeasureForm);
  }

  return state;
}

export function stateToFormPrimary(currentState, codesListPrimary) {
  const { type, [LIST]: listState } = currentState;

  return {
    type,
    [LIST]: { ...listState },
    [CODES_LIST]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]:
        codesListPrimary.stateComponentToForm(),
    },
  };
}

export function stateToFormSecondary(currentState, codesListSecondary) {
  const { showSecondaryAxis } = currentState;
  return {
    showSecondaryAxis,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      codesListSecondary.stateComponentToForm(),
  };
}

export function stateToFormMeasure(
  currentState,
  codesListsStore,
  codesListMeasure,
) {
  const {
    label,
    type,
    [SIMPLE]: simpleState,
    [SINGLE_CHOICE]: {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListState,
    },
  } = currentState;
  let codesListForm;

  if (codesListMeasure) {
    codesListForm = codesListMeasure.stateComponentToForm();
  } else {
    codesListForm = CodesListFactory(
      codesListState,
      codesListsStore,
    ).stateComponentToForm();
  }

  return {
    label,
    type,
    [SIMPLE]: simpleState,
    [SINGLE_CHOICE]: {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
    },
  };
}

export function stateToFormMeasureList(currentState, codesListsStore) {
  const {
    [SINGLE_CHOICE]: {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListState,
    },
    measures,
  } = currentState;
  const codesListForm = CodesListFactory(
    codesListState,
    codesListsStore,
  ).stateComponentToForm();

  return {
    ...currentState,
    [SINGLE_CHOICE]: {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
    },
    measures: measures.map((m) => stateToFormMeasure(m, codesListsStore)),
  };
}

export function stateToForm(currentState, transformers, codesListsStore) {
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasureState,
  } = currentState;
  let secondaryForm = {};
  let measureForm = {};
  let listMeasureForm = {};

  if (secondaryState) {
    secondaryForm = stateToFormSecondary(
      secondaryState,
      transformers.codesListSecondary,
    );
  }

  if (measureState) {
    measureForm = stateToFormMeasure(
      measureState,
      codesListsStore,
      transformers.codesListMeasure,
    );
  }

  if (listMeasureState) {
    listMeasureForm = stateToFormMeasureList(listMeasureState, codesListsStore);
  }
  return {
    [PRIMARY]: stateToFormPrimary(primaryState, transformers.codesListPrimary),
    [SECONDARY]: secondaryForm,
    [MEASURE]: measureForm,
    [LIST_MEASURE]: listMeasureForm,
  };
}

export function getNormalizedMeasureValues(measure) {
  const { type, [type]: measureType, label } = measure;
  const normalized = {
    label,
    type,
  };

  if (type === SIMPLE) {
    const { type: typeSimple, [typeSimple]: simple } = measureType;
    normalized[SIMPLE] = {
      type: typeSimple,
      [typeSimple]: simple,
    };
  } else {
    normalized[SINGLE_CHOICE] = measureType;
  }

  return normalized;
}

const Factory = (initialState = {}, codesListsStore) => {
  const { [LIST_MEASURE]: measures, ...otherState } = initialState;
  let currentState = merge(cloneDeep(defaultState), {
    ...otherState,
    [LIST_MEASURE]: { measures },
  });
  currentState[LIST_MEASURE].measures = currentState[LIST_MEASURE].measures.map(
    (m) => {
      const { type, label, [type]: measureState } = m;
      const state = {
        type,
        label,
      };

      if (type === SINGLE_CHOICE) {
        state[SINGLE_CHOICE] = {
          [DEFAULT_CODES_LIST_SELECTOR_PATH]:
            codesListsStore[measureState[DEFAULT_CODES_LIST_SELECTOR_PATH].id],
          visHint: measureState.visHint,
        };
      } else {
        state[SIMPLE] = measureState;
      }

      return merge(cloneDeep(defaultState[MEASURE]), state);
    },
  );

  const transformers = {
    codesListPrimary: CodesListFactory(
      currentState[PRIMARY][CODES_LIST][DEFAULT_CODES_LIST_SELECTOR_PATH],
      codesListsStore,
    ),
    codesListSecondary: CodesListFactory(
      currentState[SECONDARY][DEFAULT_CODES_LIST_SELECTOR_PATH],
      codesListsStore,
    ),
    codesListMeasure: CodesListFactory(
      currentState[MEASURE][SINGLE_CHOICE][DEFAULT_CODES_LIST_SELECTOR_PATH],
      codesListsStore,
    ),
  };

  return {
    formToState: (form) => {
      if (form) currentState = formToState(form, transformers);
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState, transformers, codesListsStore);
    },
    getCodesListStore: () => {
      let codesLists = {};

      if (currentState[PRIMARY]?.type === CODES_LIST) {
        codesLists = transformers.codesListPrimary.getStore();
      }

      if (currentState[SECONDARY]?.showSecondaryAxis) {
        codesLists = {
          ...codesLists,
          ...transformers.codesListSecondary.getStore(),
        };
      }

      if (currentState[MEASURE]?.type === SINGLE_CHOICE) {
        codesLists = {
          ...codesLists,
          ...transformers.codesListMeasure.getStore(),
        };
      }

      if (currentState[LIST_MEASURE]) {
        currentState[LIST_MEASURE].forEach((m) => {
          if (m.type === SINGLE_CHOICE) {
            const codesListState =
              m[SINGLE_CHOICE][DEFAULT_CODES_LIST_SELECTOR_PATH];
            codesLists = {
              ...codesLists,
              [codesListState.id]: codesListState,
            };
          }
        });
      }

      return codesLists;
    },
    getNormalizedValues: (form) => {
      // Values ready to be validated
      const {
        [PRIMARY]: { type: typePrimary, [typePrimary]: primary },
        [SECONDARY]: { showSecondaryAxis, ...others },
        [MEASURE]: measure,
        [LIST_MEASURE]: { measures: listMeasures, ...listMeasuresInput },
      } = form;

      // Normalized primary axis values

      const normalized = {};

      if (typePrimary === CODES_LIST) {
        normalized[PRIMARY] = {
          type: typePrimary,
          [typePrimary]: primary,
        };
      }
      if (typePrimary === LIST) {
        const { type: listType, [listType]: listContent } = primary;
        normalized[PRIMARY] = {
          type: typePrimary,
          [typePrimary]: { type: listType, [listType]: listContent },
        };
      }

      if (typePrimary === CODES_LIST && showSecondaryAxis) {
        // Normalized secondary axis values

        normalized[SECONDARY] = {
          ...others,
          showSecondaryAxis,
        };

        // Normalized measure axis values

        normalized[MEASURE] = getNormalizedMeasureValues(measure);
      }

      // Normalized measures list axis

      if (
        typePrimary === LIST ||
        (typePrimary === CODES_LIST && !showSecondaryAxis)
      ) {
        normalized[LIST_MEASURE] = {
          ...getNormalizedMeasureValues(listMeasuresInput),
          measures: listMeasures,
        };
      }
      return normalized;
    },
  };
};

export default Factory;
