import { VARIABLES_TYPES } from '../constants/pogues-constants';
import { removeOrphansCodesLists } from '../utils/codes-lists/codes-lists-utils';
import * as CalculatedVariable from './transformations/calculated-variable';
import * as CodesList from './transformations/codes-list';
import * as CollectedVariable from './transformations/collected-variable';
import * as Component from './transformations/component';
import * as ExternalVariable from './transformations/external-variable';
import * as Questionnaire from './transformations/questionnaire';

const { CALCULATED, EXTERNAL, COLLECTED } = VARIABLES_TYPES;

export function questionnaireRemoteToStores(remote, currentStores = {}) {
  const {
    id,
    CodeLists: { CodeList: codesLists },
    Variables: { Variable: variables },
  } = remote;
  let iterations = [];
  if (remote.Iterations && remote.Iterations.Iteration) {
    iterations = remote.Iterations.Iteration;
  }
  let filters = [];
  if (remote.FlowControl) {
    filters = remote.FlowControl;
  }
  const calculatedVariables = variables.filter((v) => v.type === CALCULATED);
  const externalVariables = variables.filter((v) => v.type === EXTERNAL);
  const collectedVariables = variables.filter((v) => v.type === COLLECTED);

  // Questionnaire store
  const questionnaireById = Questionnaire.remoteToStore(remote, currentStores);

  // Calculate variables store
  const calculatedVariableByQuestionnaire = {
    [id]: CalculatedVariable.remoteToStore(calculatedVariables),
  };

  // External variables store
  const externalVariableByQuestionnaire = {
    [id]: ExternalVariable.remoteToStore(externalVariables),
  };
  // Codes lists store
  const variableclarification = Component.getClarificarionfromremote(
    remote.Child,
    collectedVariables,
  );

  const arbitraryVariables = Component.getArbitraryVariablesFromRemote(
    remote.Child,
    collectedVariables,
  );

  const codesListsStore = CodesList.remoteToStore(
    codesLists,
    variableclarification,
  );
  // Collected variables store
  const responsesByVariable = Component.remoteToVariableResponse(remote);
  const collectedVariableByQuestionnaire = {
    [id]: CollectedVariable.remoteToStore(
      collectedVariables,
      responsesByVariable,
      codesListsStore,
      variableclarification,
      arbitraryVariables,
    ),
  };
  // Components store
  const componentByQuestionnaire = {
    [id]: Component.remoteToStore(
      remote,
      id,
      codesListsStore,
      iterations,
      filters,
    ),
  };
  const condListLinked = removeOrphansCodesLists(
    codesListsStore,
    componentByQuestionnaire[id],
  );
  if (
    Object.values(condListLinked).length !==
    Object.values(codesListsStore).length
  ) {
    Object.values(codesListsStore).forEach((code) => {
      if (!condListLinked[code.id]) {
        code.isDuplicated = true;
      }
    });
  }
  const codeListByQuestionnaire = {
    [id]: codesListsStore,
  };
  return {
    questionnaireById,
    calculatedVariableByQuestionnaire,
    externalVariableByQuestionnaire,
    collectedVariableByQuestionnaire,
    codeListByQuestionnaire,
    componentByQuestionnaire,
  };
}

export function questionnaireListRemoteToStores(questionnairesList) {
  const questionnaireById = [];

  for (let i = 0; i < questionnairesList.length; i += 1) {
    let questionnaireState;
    try {
      questionnaireState = Questionnaire.remoteToStore1(questionnairesList[i]);
    } catch (e) {
      console.error(e);
    }
    if (questionnaireState) questionnaireById.push(questionnaireState);
  }
  return questionnaireById;
}
