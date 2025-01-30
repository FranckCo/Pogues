import { DATATYPE_NAME } from '../../../constants/pogues-constants';
import { uuid } from '../../../utils/utils';
import { sortByYXAndZ } from '../../../utils/variables/collected-variables-utils';

const { TEXT } = DATATYPE_NAME;

export const defaultState = {
  name: '',
  label: '',
  x: '',
  y: '',
  z: '',
  mesureLevel: '',
  codeListReference: '',
  codeListReferenceLabel: '',
  isCollected: '1',
  alternativeLabel: '',
};

export const defaultForm = {
  name: '',
  label: '',
  x: '',
  y: '',
  z: '',
  mesureLevel: '',
  type: TEXT,
  collectedVariables: [],
  codeListReference: '',
  codeListReferenceLabel: '',
  isCollected: '1',
  alternativeLabel: '',
};

function getTypings(object) {
  return {
    type: object.type,
    // ex: [BOOLEAN]: object[BOOLEAN] or [TEXT]: object[TEXT] ; restricted to the expected type
    [object.type]: object[object.type],
  };
}
export function formToState(form) {
  const {
    name,
    label,
    x,
    y,
    z,
    mesureLevel,
    arbitraryVariableOfVariableId,
    codeListReference,
    codeListReferenceLabel,
    isCollected,
    alternativeLabel,
  } = form;
  const id = form.id || uuid();

  return {
    id,
    name,
    label,
    x,
    y,
    z,
    arbitraryVariableOfVariableId,
    isCollected,
    alternativeLabel,
    mesureLevel,
    ...getTypings(form),
    codeListReference,
    codeListReferenceLabel,
  };
}

export function formToStore(form) {
  const { collectedVariables } = form;

  return collectedVariables.reduce((acc, cv) => {
    const state = formToState(cv);

    return {
      ...acc,
      [state.id]: state,
    };
  }, {});
}

export function storeToForm(currentStore) {
  const collectedVariables = Object.keys(currentStore)
    .sort(sortByYXAndZ(currentStore))
    .map((key) => {
      const {
        id,
        name,
        label,
        x,
        y,
        z,
        arbitraryVariableOfVariableId,
        isCollected = '1',
        alternativeLabel,
        mesureLevel,
        codeListReference,
        codeListReferenceLabel,
      } = currentStore[key];
      return {
        id,
        name,
        label,
        x,
        y,
        z,
        arbitraryVariableOfVariableId,
        isCollected,
        alternativeLabel,
        mesureLevel,
        ...getTypings(currentStore[key]),
        codeListReference,
        codeListReferenceLabel,
      };
    });

  return {
    ...defaultForm,
    collectedVariables,
  };
}

const Factory = (currentState = [], collectedVariablesStore) => {
  let currentStore = currentState.reduce((acc, key) => {
    return {
      ...acc,
      [key]: collectedVariablesStore[key],
    };
  }, {});

  return {
    formToStore: (form) => {
      if (form) currentStore = formToStore(form);
      return currentStore;
    },
    formToComponentState: (form) => {
      if (form) currentStore = formToStore(form);
      currentState = Object.keys(currentStore);
      return currentState;
    },
    storeToForm: () => {
      return storeToForm(currentStore);
    },
    getStore: () => {
      return currentStore;
    },
  };
};

export default Factory;
