import _ from 'lodash';

import Questionnaire from 'utils/transformation-entities/questionnaire';
import Component from 'utils/transformation-entities/component';
import CodesList from 'utils/transformation-entities/codes-list';
import Code from 'utils/transformation-entities/code';
import { COMPONENT_TYPE, QUESTION_TYPE_ENUM, DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;
const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;
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
  const { measures, type: typeMeasure, [typeMeasure]: measureState } = responseFormatTable[MEASURE];

  if (responseFormatTable[PRIMARY].type === CODES_LIST) {
    codesListsIds.push(responseFormatTable[PRIMARY][CODES_LIST].codesListId);
  }
  if (responseFormatTable[SECONDARY].showSecondaryAxis) {
    codesListsIds.push(responseFormatTable[SECONDARY].codesListId);
    if (typeMeasure === SINGLE_CHOICE) codesListsIds.push(measureState.codesListId);
  } else {
    measures.forEach(m => {
      const { type: typeMeasureItem, [typeMeasureItem]: measureStateItem } = m;
      if (typeMeasureItem === SINGLE_CHOICE) codesListsIds.push(measureStateItem.codesListId);
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

export function getNestedComponentsFromPlainList(questionnaireId, listComponents, codesLists) {
  function serializePlainToNested(component, codesLists, depth = 0) {
    const componentType = component.type;
    const newDepth = depth + 1;

    if (componentType !== QUESTION) {
      component.children = component.children
        .sort((keyA, keyB) => {
          if (listComponents[keyA].weight < listComponents[keyB].weight) return -1;
          if (listComponents[keyA].weight > listComponents[keyB].weight) return 1;
          return 0;
        })
        .map(key => {
          return serializePlainToNested(listComponents[key], codesLists, newDepth);
        });
    }

    return Component.stateToModel({ ...component, depth: newDepth }, codesLists);
  }

  return listComponents[questionnaireId].children
    .sort((keyA, keyB) => {
      if (listComponents[keyA].weight < listComponents[keyB].weight) return -1;
      if (listComponents[keyA].weight > listComponents[keyB].weight) return 1;
      return 0;
    })
    .map(key => serializePlainToNested(listComponents[key], codesLists));
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
  let childrenModel = [];
  componentsState = _.cloneDeep(componentsState);
  codesListsState = _.cloneDeep(codesListsState);
  codesState = _.cloneDeep(codesState);
  const codesListsIds = getCodesListsIdsToSave(componentsState, codesListsState);
  if (Object.keys(componentsState).length > 0)
    childrenModel = getNestedComponentsFromPlainList(questionnaireState.id, componentsState, codesListsState);
  const codesListsModel = getNestedCodesListFromPlainList(codesListsIds, codesListsState, codesState);
  return Questionnaire.stateToModel(questionnaireState, childrenModel, codesListsModel);
}
