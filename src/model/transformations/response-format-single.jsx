import {
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../constants/pogues-constants';
import * as CodeList from './codes-list';
import * as Response from './response';

const { TEXT } = DATATYPE_NAME;

export function remoteToState(remote) {
  const {
    responses: [
      {
        Datatype: { allowArbitraryResponse, visualizationHint: visHint },
        mandatory,
        CodeListReference,
        id,
      },
    ],
  } = remote;

  return {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      CodeList.remoteToState(CodeListReference),
    id,
    mandatory,
    allowArbitraryResponse,
    visHint,
  };
}

export function stateToRemote(state, collectedVariables) {
  const {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListId },
    allowArbitraryResponse,
    visHint,
    mandatory,
    id,
  } = state;
  return {
    Response: [
      Response.stateToRemote({
        id,
        mandatory,
        allowArbitraryResponse,
        visHint,
        codesListId,
        typeName: TEXT,
        maxLength: 1,
        pattern: '',
        collectedVariable: collectedVariables[0],
      }),
    ],
  };
}
