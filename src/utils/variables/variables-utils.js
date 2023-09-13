import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

export function removeOrphansCollectedVariables(
  variablesIdsFromComponents = [],
  variablesStore = {},
) {
  return Object.keys(variablesStore)
    .filter(key => variablesIdsFromComponents.indexOf(key) !== -1)
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: variablesStore[key],
      };
    }, {});
}

export function getCollectedVariablesIdsFromComponents(componentsStore) {
  return Object.keys(componentsStore)
    .filter(key => {
      return componentsStore[key].type === QUESTION;
    })
    .reduce((acc, key) => {
      return [...acc, ...(componentsStore[key].collectedVariables || [])];
    }, []);
}

export function getAllVariables(
  activeExternalVariablesById,
  activeCalculatedVariablesById,
  collectedVariablesById,
  activeQuestionnaire,
  externalQuestionnairesVariables,
) {
  console.log('il a recalculé la liste des variables');
  const externalVariables = Object.values(
    activeExternalVariablesById || {},
  ).map(element => element.name);
  const calculatedVariables = Object.values(
    activeCalculatedVariablesById || {},
  ).map(element => element.name);
  const collectedVariables = Object.values(collectedVariablesById || {}).map(
    variable => variable.name,
  );

  const externalQuestionnaires =
    activeQuestionnaire?.childQuestionnaireRef || [];
  const referencedQuestionnairesVariables =
    externalQuestionnairesVariables &&
    Object.values(externalQuestionnairesVariables)
      .filter(questionnaire =>
        externalQuestionnaires.includes(questionnaire.id),
      )
      .reduce((acc, quest) => {
        return [
          ...acc,
          Object.values(quest.variables).map(variable => variable.Name),
        ].flat();
      }, []);
  return collectedVariables.concat(
    externalVariables,
    calculatedVariables,
    referencedQuestionnairesVariables,
  );
}

export function hasDuplicateVariables(
  activeExternalVariablesById,
  activeCalculatedVariablesById,
  collectedVariablesById,
  activeQuestionnaire,
  externalQuestionnairesVariables,
) {
  const allVariables = getAllVariables(
    activeExternalVariablesById,
    activeCalculatedVariablesById,
    collectedVariablesById,
    activeQuestionnaire,
    externalQuestionnairesVariables,
  );
  return allVariables.length !== new Set(allVariables).size;
}
