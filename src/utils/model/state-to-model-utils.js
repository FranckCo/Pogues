import _ from 'lodash';

import Questionnaire from 'utils/transformation-entities/questionnaire';
import CodesList from 'utils/transformation-entities/codes-list';
import Code from 'utils/transformation-entities/code';
import { COMPONENT_TYPE, QUESTION_TYPE_ENUM, DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;
const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

export function getCodesListsIdsFromResponseMultiple(responseFormatMultiple) {
  const codesListsIds = [];
  codesListsIds.push(responseFormatMultiple[PRIMARY].codesListId);
  if (responseFormatMultiple[MEASURE].type === CODES_LIST) {
    codesListsIds.push(responseFormatMultiple[MEASURE][CODES_LIST].codesListId);
  }
  return codesListsIds;
}

export function getCodesListsIdsFromResponseTable(responseFormatTable) {
  const codesListsIds = [];
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = responseFormatTable;
  const { type: typePrimary, [typePrimary]: primaryTypeState } = primaryState;

  if (typePrimary === CODES_LIST) {
    codesListsIds.push(primaryTypeState.codesListId);
  }

  if (secondaryState) {
    codesListsIds.push(secondaryState.codesListId);
  }

  if (measureState) {
    const { type: measureType, [measureType]: measureTypeState } = measureState;
    if (measureType === SINGLE_CHOICE) {
      codesListsIds.push(measureTypeState.codesListId);
    }
  } else {
    listMeasuresState.forEach(m => {
      const { type: measureType, [measureType]: measureTypeState } = m;
      if (measureType === SINGLE_CHOICE) {
        codesListsIds.push(measureTypeState.codesListId);
      }
    });
  }

  return codesListsIds;
}

export function getCodesListsIdsToSave(componentsState) {
  let codesListsIds = [];
  Object.keys(componentsState).forEach(key => {
    const component = componentsState[key];
    if (component.type === QUESTION) {
      if (component.responseFormat.type === SINGLE_CHOICE) {
        codesListsIds.push(component.responseFormat[SINGLE_CHOICE].codesListId);
      } else if (component.responseFormat.type === MULTIPLE_CHOICE) {
        const responseFormatMultiple = component.responseFormat[MULTIPLE_CHOICE];
        codesListsIds = [...codesListsIds, ...getCodesListsIdsFromResponseMultiple(responseFormatMultiple)];
      } else if (component.responseFormat.type === TABLE) {
        const responseFormatTable = component.responseFormat[TABLE];
        codesListsIds = [...codesListsIds, ...getCodesListsIdsFromResponseTable(responseFormatTable)];
      }
    }
  });
  return codesListsIds;
}

export function getNestedCodesListFromPlainList(codesListsIds, codesLists, codes) {
  return codesListsIds.map(codesListId => {
    let codesModel = [];
    let codesListModel = {};
    const codesListState = codesLists[codesListId];
    if (codesListState) {
      codesModel = codesListState.codes.map(codeId => Code.stateToModel(codes[codeId]));
      codesListModel = CodesList.stateToModel(codesListState, codesModel);
    }
    return codesListModel;
  });
}

export function questionnaireStateToModel(
  questionnaireState,
  componentsState = {},
  codesListsState = {},
  codesState = {}
) {
  componentsState = _.cloneDeep(componentsState);
  codesListsState = _.cloneDeep(codesListsState);
  codesState = _.cloneDeep(codesState);

  const codesListsIds = getCodesListsIdsToSave(componentsState, codesListsState);
  const codesListsModel = getNestedCodesListFromPlainList(codesListsIds, codesListsState, codesState);

  // @TODO: Move the codes lists transformation to Questionnaire.stateToModel
  return Questionnaire.stateToModel(questionnaireState, componentsState, codesListsState, codesListsModel);
}
