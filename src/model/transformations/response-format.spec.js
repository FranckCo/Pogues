import { remoteToState, stateToRemote } from './response-format';
import * as ResponseFormatSimple from './response-format-simple';
import * as ResponseFormatSingle from './response-format-single';
import * as ResponseFormatMultiple from './response-format-multiple';
import * as ResponseFormatTable from './response-format-table';

import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

describe('response transformation', () => {
  describe('remoteToState', () => {
    ResponseFormatSimple.remoteToState = jest.fn();
    ResponseFormatSingle.remoteToState = jest.fn();
    ResponseFormatMultiple.remoteToState = jest.fn();
    ResponseFormatTable.remoteToState = jest.fn();

    const mockResponses = {
      [SIMPLE]: {
        type: SIMPLE,
        [SIMPLE]: { datatypeState: 'true' },
      },
      [SINGLE_CHOICE]: {
        type: SINGLE_CHOICE,
        [SINGLE_CHOICE]: { datatypeState: 'true' },
      },
      [MULTIPLE_CHOICE]: {
        type: MULTIPLE_CHOICE,
        [MULTIPLE_CHOICE]: { datatypeState: 'true' },
      },
      [TABLE]: {
        type: TABLE,
        [TABLE]: { datatypeState: 'true' },
      },
    };
    const responses = [];
    const mockCalls = {
      [SIMPLE]: {
        responses,
      },
      [SINGLE_CHOICE]: {
        responses,
      },
      [MULTIPLE_CHOICE]: {
        responses,
        dimensions: 'dimensions',
      },
      [TABLE]: [
        {
          responses,
          dimensions: 'dimensions',
        },
        'store',
      ],
    };
    [SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE].forEach(type => {
      it(`should call the ${type} remoteToState`, () => {
        let mockFn;
        switch (type) {
          case SINGLE_CHOICE:
            mockFn = ResponseFormatSingle.remoteToState;
            break;
          case MULTIPLE_CHOICE:
            mockFn = ResponseFormatMultiple.remoteToState;
            break;
          case TABLE:
            mockFn = ResponseFormatTable.remoteToState;
            break;
          default:
            mockFn = ResponseFormatSimple.remoteToState;
        }
        mockFn.mockReturnValueOnce({
          datatypeState: 'true',
        });
        const result = remoteToState(type, [], 'dimensions', 'store');
        expect(result).toEqual(mockResponses[type]);
        if (type === TABLE) {
          expect(mockFn).toHaveBeenCalledWith(...mockCalls[type]);
        } else {
          expect(mockFn).toHaveBeenCalledWith(mockCalls[type]);
        }
      });
    });
  });

  describe('remoteToState', () => {
    ResponseFormatSimple.stateToRemote = jest.fn();
    ResponseFormatSingle.stateToRemote = jest.fn();
    ResponseFormatMultiple.stateToRemote = jest.fn();
    ResponseFormatTable.stateToRemote = jest.fn();

    const mockResponses = {
      [SIMPLE]: {
        Response: 'true',
      },
      [SINGLE_CHOICE]: {
        Response: 'true',
      },
      [MULTIPLE_CHOICE]: {
        ResponseStructure: {
          Dimension: 'Dimension',
          Mapping: 'Mapping',
          Attribute: 'Attribute',
        },
        Response: 'true',
      },
      [TABLE]: {
        ResponseStructure: {
          Dimension: 'Dimension',
          Mapping: 'Mapping',
          Attribute: 'Attribute',
        },
        Response: 'true',
      },
    };
    const mockCalls = {
      [SIMPLE]: ['responseFormatState', 'collectedVariables'],
      [SINGLE_CHOICE]: ['responseFormatState', 'collectedVariables'],
      [MULTIPLE_CHOICE]: [
        'responseFormatState',
        'collectedVariables',
        'collectedVariablesStore',
        'response',
      ],
      [TABLE]: [
        'responseFormatState',
        'collectedVariables',
        'collectedVariablesStore',
        'response',
      ],
    };

    [SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE].forEach(type => {
      it(`should call the ${type} stateToRemote`, () => {
        let mockFn;
        switch (type) {
          case SINGLE_CHOICE:
            mockFn = ResponseFormatSingle.stateToRemote;
            break;
          case MULTIPLE_CHOICE:
            mockFn = ResponseFormatMultiple.stateToRemote;
            break;
          case TABLE:
            mockFn = ResponseFormatTable.stateToRemote;
            break;
          default:
            mockFn = ResponseFormatSimple.stateToRemote;
        }
        mockFn.mockReturnValueOnce({
          Response: 'true',
          Dimension: 'Dimension',
          Mapping: 'Mapping',
          Attribute: 'Attribute',
        });
        const result = stateToRemote(
          {
            type,
            [type]: 'responseFormatState',
          },
          'collectedVariables',
          'collectedVariablesStore',
          'response',
        );
        expect(result).toEqual(mockResponses[type]);

        expect(mockFn).toHaveBeenCalledWith(...mockCalls[type]);
      });
    });
  });
});
