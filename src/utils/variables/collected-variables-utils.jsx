import {
  COMPONENT_TYPE,
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
} from '../../constants/pogues-constants';
import { markdownVtlToString } from '../../forms/controls/rich-textarea';
import { hasChild } from '../codes-lists/codes-lists-utils';
import { uuid } from '../utils';

const { QUESTION } = COMPONENT_TYPE;
const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE, PAIRING } =
  QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;
const { TEXT, BOOLEAN } = DATATYPE_NAME;

/**
 * This method will recursively sort an array of code.
 * A code has a depth, a weight and maybe a parent.
 * We will first sort codes with the depth=1, and recursively for each code, sort its direct children.
 */
function sortCodes(codes = [], depth = 1, parent = '') {
  const filtered = codes.filter(
    (code) => code.depth === depth && code.parent === parent,
  );
  if (filtered.length === 0) {
    return [];
  }
  return filtered
    .sort((code1, code2) => code1.weight - code2.weight)
    .map((code) => [code, ...sortCodes(codes, depth + 1, code.value)])
    .reduce((acc, res) => [...acc, ...res], []);
}

function getReponsesValues(measure) {
  let reponseFormatValues = {};

  if (measure.type === SIMPLE) {
    reponseFormatValues = {
      codeListReference: '',
      codeListReferenceLabel: '',
      type: measure[SIMPLE].type,
      // measure[SIMPLE].type is BOOLEAN or TEXT or NUMERIC or DATE or DURATION ; for BOOLEAN, this means : BOOLEAN: measure[SIMPLE].BOOLEAN
      [measure[SIMPLE].type]: measure[SIMPLE][measure[SIMPLE].type],
    };
  }
  if (measure.type === SINGLE_CHOICE) {
    reponseFormatValues = {
      codeListReference: measure[SINGLE_CHOICE].CodesList.id,
      codeListReferenceLabel: measure[SINGLE_CHOICE].CodesList.label,
      type: TEXT,
      [TEXT]: {
        maxLength: 1,
        pattern: '',
      },
    };
  }
  return reponseFormatValues;
}

export function sortByYXAndZ(store) {
  return (id1, id2) => {
    let c1 = id1;
    let c2 = id2;
    if (store) {
      c1 = store[id1];
      c2 = store[id2];
    }
    return (
      (c1.y || 99) * 10000 -
      (c2.y || 99) * 10000 +
      (c1.x || 99) * 100 -
      (c2.x || 99) * 100 +
      (c1.z || 0) -
      (c2.z || 0)
    );
  };
}

export function getCollectedVariable(
  name,
  label,
  coordinates,
  reponseFormatValues = {},
  alternativeLabel = '',
  arbitraryVariableOfVariableId = undefined,
) {
  let collectedVariable = {
    ...reponseFormatValues,
    id: uuid(),
    name,
    label,
  };

  if (coordinates) collectedVariable = { ...collectedVariable, ...coordinates };
  if (alternativeLabel)
    collectedVariable = { ...collectedVariable, ...alternativeLabel };
  if (arbitraryVariableOfVariableId)
    collectedVariable = {
      ...collectedVariable,
      arbitraryVariableOfVariableId: arbitraryVariableOfVariableId,
    };
  return collectedVariable;
}

export function getCollectedVariablesMultiple(
  questionName,
  form,
  codesListStore,
) {
  const {
    [PRIMARY]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { codes, id },
    },
    [MEASURE]: { type: typeMeasure },
  } = form;
  let listCodes = sortCodes(codes);
  if (listCodes.length === 0 && codesListStore[id]) {
    const codesStore = codesListStore[id].codes;
    listCodes = Object.keys(codesStore).map((key) => codesStore[key]);
  }

  let reponseFormatValues = {
    type: BOOLEAN,
    [BOOLEAN]: {},
  };
  if (typeMeasure === CODES_LIST) {
    reponseFormatValues = {
      codeListReference: form[MEASURE][CODES_LIST].CodesList.id,
      codeListReferenceLabel: form[MEASURE][CODES_LIST].CodesList.label,
      type: TEXT,
      [TEXT]: {
        maxLength: 1,
        pattern: '',
      },
    };
  }

  const listFiltered = listCodes.filter((code) => !hasChild(code, listCodes));
  const collectedVariables = listFiltered.map((c, index) =>
    getCollectedVariable(
      `${questionName}${index + 1}`,
      `${c.value} - ${c.label}`,
      { x: index + 1, isCollected: '1', alternativeLabel: '' },
      reponseFormatValues,
    ),
  );
  form.PRIMARY.CodesList.codes.forEach((code) => {
    if (code.precisionid && code.precisionid !== '') {
      collectedVariables.push(
        getCollectedVariable(
          code.precisionid,
          `${code.precisionid} label`,
          {
            z: code.weight,
            isCollected: '1',
          },
          {
            type: TEXT,
            [TEXT]: {
              maxLength: code.precisionsize,
              pattern: '',
            },
          },
        ),
      );
    }
  });
  return collectedVariables;
}

export function getCollectedVariablesSingle(questionName, form) {
  const collectedVariables = [];

  const mainCollectedVariable = getCollectedVariable(
    questionName,
    `${questionName} label`,
    undefined,
    {
      codeListReference: form.CodesList.id,
      codeListReferenceLabel: form.CodesList.label,
      type: TEXT,
      [TEXT]: {
        maxLength: 1,
        pattern: '',
      },
    },
  );

  collectedVariables.push(mainCollectedVariable);

  // get arbitrary variable for suggester
  if (
    form.allowArbitraryResponse &&
    form.visHint === DATATYPE_VIS_HINT.SUGGESTER
  ) {
    const arbitraryResponseName = `${questionName}_ARBITRARY`;
    collectedVariables.push(
      getCollectedVariable(
        arbitraryResponseName,
        `${arbitraryResponseName} label`,
        undefined,
        {
          type: TEXT,
          [TEXT]: {
            maxLength: 249,
          },
        },
        undefined,
        mainCollectedVariable.id,
      ),
    );
  }

  // get clarification variables for codes lists
  form.CodesList.codes?.forEach((code) => {
    if (code.precisionid && code.precisionid !== '') {
      collectedVariables.push(
        getCollectedVariable(
          code.precisionid,
          `${code.precisionid} label`,
          { z: code.weight, isCollected: '1' },
          {
            type: TEXT,
            codeListReference: undefined,
            [TEXT]: {
              maxLength: code.precisionsize,
              pattern: '',
            },
          },
        ),
      );
    }
  });

  return collectedVariables;
}

export function getCollectedVariablesTable(questionName, form) {
  const collectedVariables = [];
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = form;

  if (primaryState.type === CODES_LIST) {
    const {
      [CODES_LIST]: {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: {
          codes: componentCodesStatePrimary,
        },
      },
    } = primaryState;

    const codesStatePrimary = sortCodes(componentCodesStatePrimary);

    // 2 dimensions with a codelist each
    if (secondaryState?.showSecondaryAxis) {
      const {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: {
          codes: componentCodesStateSecondary,
        },
      } = secondaryState;

      const codesStateSecondary = sortCodes(componentCodesStateSecondary);
      codesStatePrimary
        .filter((code) => !hasChild(code, codesStatePrimary))
        .map((codePrimary, i) =>
          codesStateSecondary
            .filter((code) => !hasChild(code, codesStateSecondary))
            .map((codeSecondary, j) =>
              collectedVariables.push(
                getCollectedVariable(
                  `${questionName}${i + 1}${j + 1}`,
                  markdownVtlToString(
                    `${codePrimary.label}-${codeSecondary.label}-${measureState.label}`,
                  ).replace(/"/g, ''),
                  {
                    x: i + 1,
                    y: j + 1,
                    isCollected: '1',
                  },
                  getReponsesValues(measureState),
                ),
              ),
            ),
        );
    }
    // 1 dimension from a codelist ; 1 or several measures ; if several, it becomes a second dimension
    if (!secondaryState?.showSecondaryAxis) {
      codesStatePrimary
        .filter((code) => !hasChild(code, codesStatePrimary))
        .map((codePrimary, i) =>
          listMeasuresState.measures.map((measure, j) =>
            collectedVariables.push(
              getCollectedVariable(
                `${questionName}${i + 1}${j + 1}`,
                markdownVtlToString(
                  `${codePrimary.label}-${measure.label}`,
                ).replace(/"/g, ''),
                {
                  x: i + 1,
                  y: j + 1,
                  isCollected: '1',
                },
                getReponsesValues(measure),
              ),
            ),
          ),
        );
    }
  }
  // dynamic array
  if (primaryState.type !== CODES_LIST) {
    listMeasuresState.measures.map((measure, j) =>
      collectedVariables.push(
        getCollectedVariable(
          `${questionName}${j + 1}`,
          markdownVtlToString(`${measure.label}`).replace(/"/g, ''),
          {
            x: 1,
            y: j + 1,
            isCollected: '1',
          },
          getReponsesValues(measure),
        ),
      ),
    );
  }

  // In all cases : add additional variables due to precision
  form.LIST_MEASURE?.measures.SINGLE_CHOICE?.CodesList?.codes.map(
    ({ id, codes }) =>
      codes
        .filter((code) => code.precisionid && code.precisionid !== '')
        .map((code) =>
          collectedVariables
            .filter(
              (variable) =>
                variable.codeListReference && variable.codeListReference === id,
            )
            .map((variable) =>
              collectedVariables.push(
                getCollectedVariable(
                  `${variable.name}${code.value}CL`,
                  `${variable.name}${code.value}CL label`,
                  {
                    z: code.weight,
                    mesureLevel: variable.x,
                    isCollected: '1',
                  },
                  {
                    type: 'TEXT',
                    TEXT: {
                      maxLength: code.precisionsize,
                      pattern: '',
                    },
                  },
                ),
              ),
            ),
        ),
  );
  return collectedVariables.sort(sortByYXAndZ());
}

export function generateCollectedVariables(
  responseFormat,
  questionName,
  form,
  codesListStore,
) {
  let generatedCollectedVariables = [];

  if (responseFormat === SIMPLE) {
    generatedCollectedVariables = [
      getCollectedVariable(
        questionName,
        `${questionName} label`,
        undefined,
        form,
      ),
    ];
  } else if (responseFormat === SINGLE_CHOICE || responseFormat === PAIRING) {
    generatedCollectedVariables = getCollectedVariablesSingle(
      questionName,
      form,
    );
  } else if (responseFormat === MULTIPLE_CHOICE) {
    generatedCollectedVariables = getCollectedVariablesMultiple(
      questionName,
      form,
      codesListStore,
    );
  } else if (responseFormat === TABLE) {
    generatedCollectedVariables = getCollectedVariablesTable(
      questionName,
      form,
    );
  }

  return generatedCollectedVariables;
}

/**
 * Used to correctly load a questionnaire by pairing collected variables and
 * questions on init.
 */
export function getCollectedVariablesByQuestion(
  components = {},
  collectedVariables = {},
) {
  return Object.keys(components)
    .filter((key) => components[key].type === QUESTION)
    .filter((key) => components[key].collectedVariables.length > 0)
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: components[key].collectedVariables.reduce(
          (accInner, keyInner) => {
            return {
              ...accInner,
              [keyInner]: { ...collectedVariables[keyInner] },
            };
          },
          {},
        ),
      };
    }, {});
}
