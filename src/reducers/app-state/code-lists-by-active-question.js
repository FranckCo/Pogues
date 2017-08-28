import { SET_CURRENT_CODES_LISTS_IN_QUESTION } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setCurrentCodesListsInQuestion(state, { codeListsToUpdate }) {
  return codeListsToUpdate;
}

actionHandlers[SET_CURRENT_CODES_LISTS_IN_QUESTION] = setCurrentCodesListsInQuestion;

export default createActionHandlers(actionHandlers);
