import { describe, expect, test } from 'vitest';

import {
  getResponseCoordinate,
  remoteToStore,
  storeToRemote,
} from './component';

describe('component tranformations', () => {
  describe('remoteToStore', () => {
    test('should return the store representation of a component', () => {
      const input = {
        Child: [
          {
            Child: [
              {
                Control: [],
                Declaration: [],
                FlowControl: [],
                Label: ['question'],
                Name: 'QUESTION',
                Response: [
                  {
                    CollectedVariableReference: 'khj4uvok',
                    Datatype: {
                      typeName: 'TEXT',
                      type: 'TextDatatypeType',
                      MaxLength: 249,
                      Pattern: '',
                    },
                    id: 'khj4qhmd',
                    mandatory: false,
                  },
                ],
                TargetMode: ['CAWI'],
                depth: 2,
                id: 'khj4le7i',
                questionType: 'SIMPLE',
                type: 'QuestionType',
              },
              {
                Control: [],
                Declaration: [],
                FlowControl: [],
                Label: ['question'],
                Name: 'QUESTION',
                Response: [
                  {
                    CollectedVariableReference: 'm6awmxim',
                    CodeListReference: 'listId',
                    Datatype: {
                      typeName: 'TEXT',
                      type: 'TextDatatypeType',
                      MaxLength: 1,
                      allowArbitraryResponse: true,
                      visualizationHint: 'SUGGESTER',
                    },
                    id: 'm5qyf09t',
                    mandatory: false,
                  },
                ],
                ArbitraryResponse: {
                  id: 'm6awrflv',
                  Datatype: {
                    type: 'TextDatatypeType',
                    typeName: 'TEXT',
                    MaxLength: 249,
                  },
                  mandatory: false,
                  CollectedVariableReference: 'm6awei7a',
                },
                TargetMode: ['CAWI'],
                depth: 2,
                id: 'm5qy1yf9',
                questionType: 'SINGLE_CHOICE',
                type: 'QuestionType',
              },
            ],
            Control: [],
            Declaration: [],
            FlowControl: [],
            Label: ['sequence'],
            Name: 'SEQUENCE',
            TargetMode: ['CAWI'],
            depth: 1,
            genericName: 'MODULE',
            id: 'khj54mjm',
            type: 'SequenceType',
          },
          {
            Child: [],
            Control: [],
            Declaration: [],
            FlowControl: [],
            Label: ['QUESTIONNAIRE_END'],
            Name: 'QUESTIONNAIRE_END',
            TargetMode: ['CAWI'],
            depth: 1,
            genericName: 'MODULE',
            id: 'idendquest',
            type: 'SequenceType',
          },
        ],
        CodeLists: { CodeList: [{ id: 'listId', Label: 'listLabel' }] },
        ComponentGroup: [
          {
            Label: ['Components for page 1'],
            MemberReference: (3)[('khj54mjm', 'khj4le7i', 'idendquest')],
            Name: 'PAGE_1',
            id: 'khj4luq3',
          },
        ],
        DataCollection: [
          {
            Name: 'Campaign 01',
            id: 'campaign01',
            uri: 'http://ddi:fr.insee:DataCollection.campaign01',
          },
        ],
        Label: ['questionnaire'],
        Name: 'QUESTIONNA',
        TargetMode: ['CAWI'],
        Variables: {
          Variable: [
            {
              CodeListReference: undefined,
              Datatype: {
                typeName: 'TEXT',
                type: 'TextDatatypeType',
                MaxLength: 249,
                Pattern: '',
              },
              Label: 'QUESTION label',
              Name: 'QUESTION',
              id: 'khj4uvok',
              type: 'CollectedVariableType',
            },
            {
              id: 'm6awmxim',
              Name: 'SUGGESTER',
              type: 'CollectedVariableType',
              Label: 'SUGGESTER label',
              Datatype: {
                type: 'TextDatatypeType',
                Pattern: '',
                typeName: 'TEXT',
                MaxLength: 1,
              },
              CodeListReference: 'L_PRODEAP_EAU_2024',
            },
            {
              id: 'm6awei7a',
              Name: 'SUGGESTER_ARBITRARY',
              type: 'CollectedVariableType',
              Label: 'SUGGESTER_ARBITRARY label',
              Datatype: {
                type: 'TextDatatypeType',
                typeName: 'TEXT',
                MaxLength: 249,
              },
            },
          ],
        },
        agency: 'fr.insee',
        final: false,
        genericName: 'QUESTIONNAIRE',
        id: 'khj4mf0r',
        lastUpdatedDate:
          'Sun Nov 15 2020 14:00:52 GMT+0100 (heure normale d’Europe centrale)',
        owner: 'FAKEPERMISSION',
      };
      const questionnaireId = 'khj4mf0r';
      const codesListsStore = { id: { label: 'label' } };
      const iterations = [];
      const filters = [];

      const output = {
        idendquest: {
          TargetMode: ['CAWI'],
          children: [],
          controls: {},
          declarations: {},
          flowControl: [],
          dynamiqueSpecified: 'Redirections',
          id: 'idendquest',
          label: 'QUESTIONNAIRE_END',
          name: 'QUESTIONNAIRE_END',
          parent: 'khj4mf0r',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 1,
        },
        khj4le7i: {
          TargetMode: ['CAWI'],
          children: [],
          collectedVariables: ['khj4uvok'],
          controls: {},
          declarations: {},
          flowControl: [],
          dynamiqueSpecified: 'Redirections',
          id: 'khj4le7i',
          label: 'question',
          name: 'QUESTION',
          parent: 'khj54mjm',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              TEXT: { maxLength: 249, pattern: '' },
              id: 'khj4qhmd',
              mandatory: false,
              type: 'TEXT',
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        m5qy1yf9: {
          TargetMode: ['CAWI'],
          children: [],
          collectedVariables: ['m6awmxim', 'm6awei7a'],
          controls: {},
          declarations: {},
          flowControl: [],
          dynamiqueSpecified: 'Redirections',
          id: 'm5qy1yf9',
          label: 'question',
          name: 'QUESTION',
          parent: 'khj54mjm',
          redirections: {},
          responseFormat: {
            type: 'SINGLE_CHOICE',
            SINGLE_CHOICE: {
              visHint: 'SUGGESTER',
              allowArbitraryResponse: true,
              id: 'm5qyf09t',
              mandatory: false,
              CodesList: {
                id: 'listId',
              },
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 1,
        },
        khj4mf0r: {
          TargetMode: ['CAWI'],
          children: ['khj54mjm'],
          controls: {},
          declarations: {},
          flowControl: undefined,
          dynamiqueSpecified: 'Redirections',
          id: 'khj4mf0r',
          label: 'questionnaire',
          name: 'QUESTIONNA',
          parent: '',
          redirections: {},
          responsesClarification: undefined,
          type: 'QUESTIONNAIRE',
          weight: 0,
        },
        khj54mjm: {
          TargetMode: ['CAWI'],
          children: ['khj4le7i', 'm5qy1yf9'],
          controls: {},
          declarations: {},
          flowControl: [],
          dynamiqueSpecified: 'Redirections',
          id: 'khj54mjm',
          label: 'sequence',
          name: 'SEQUENCE',
          parent: 'khj4mf0r',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };
      expect(
        remoteToStore(
          input,
          questionnaireId,
          codesListsStore,
          iterations,
          filters,
        ),
      ).toEqual(output);
    });
  });

  describe('storeToRemote', () => {
    test('should return the remote representation of a collected variable', () => {
      const input = {
        idendquest: {
          TargetMode: ['CAWI'],
          children: [],
          controls: {},
          declarations: {},
          id: 'idendquest',
          label: 'QUESTIONNAIRE_END',
          name: 'QUESTIONNAIRE_END',
          parent: 'khj4mf0r',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 1,
        },
        khj4le7i: {
          BasedOn: '',
          TargetMode: ['CAWI'],
          addButtonLibel: '',
          basedOn: '',
          children: [],
          collectedVariables: ['khj4uvok'],
          controls: {},
          declarations: {},
          description: '',
          filter: '',
          filterImbriquer: [],
          finalMember: '',
          id: 'khj4le7i',
          initialMember: '',
          label: 'question',
          maximum: '',
          name: 'QUESTION',
          parent: 'khj54mjm',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              id: 'khj4qhmd',
              type: 'TEXT',
              mandatory: false,
              TEXT: {
                maxLength: 249,
                pattern: '',
              },
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        khj4mf0r: {
          TargetMode: ['CAWI'],
          children: ['khj54mjm'],
          controls: {},
          declarations: {},
          id: 'khj4mf0r',
          label: 'questionnaire',
          name: 'QUESTIONNA',
          parent: '',
          redirections: {},
          responsesClarification: undefined,
          type: 'QUESTIONNAIRE',
          weight: 0,
        },
        khj54mjm: {
          TargetMode: ['CAWI'],
          children: ['khj4le7i'],
          controls: {},
          declarations: {},
          id: 'khj54mjm',
          label: 'sequence',
          name: 'SEQUENCE',
          parent: 'khj4mf0r',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };
      const questionnaireId = 'khj4mf0r';
      const collectedVariablesStore = {
        khj4uvok: {
          BOOLEAN: undefined,
          DATE: undefined,
          DURATION: undefined,
          NUMERIC: undefined,
          TEXT: { maxLength: 249, pattern: '' },
          codeListReference: undefined,
          codeListReferenceLabel: '',
          id: 'khj4uvok',
          isCollected: undefined,
          label: 'QUESTION label',
          mesureLevel: undefined,
          name: 'QUESTION',
          type: 'TEXT',
          x: undefined,
          y: undefined,
          z: undefined,
        },
      };
      const codesListsStore = {};
      const dynamiqueSpecified = 'Redirections';
      const output = [
        {
          Child: [
            {
              Control: [],
              Declaration: [],
              FlowControl: [],
              Label: ['question'],
              Name: 'QUESTION',
              Response: [
                {
                  CollectedVariableReference: 'khj4uvok',
                  Datatype: {
                    typeName: 'TEXT',
                    type: 'TextDatatypeType',
                    MaxLength: 249,
                    Pattern: '',
                  },
                  id: 'khj4qhmd',
                  mandatory: false,
                },
              ],
              TargetMode: ['CAWI'],
              depth: 2,
              id: 'khj4le7i',
              questionType: 'SIMPLE',
              type: 'QuestionType',
            },
          ],
          Control: [],
          Declaration: [],
          FlowControl: [],
          Label: ['sequence'],
          Name: 'SEQUENCE',
          TargetMode: ['CAWI'],
          depth: 1,
          genericName: 'MODULE',
          id: 'khj54mjm',
          type: 'SequenceType',
        },
      ];
      expect(
        storeToRemote(
          input,
          questionnaireId,
          collectedVariablesStore,
          codesListsStore,
          dynamiqueSpecified,
        ),
      ).toEqual(output);
    });
  });

  describe('getResponseCoordinate', () => {
    test('should return response coordinate', () => {
      const variableResponseMapping = [
        {
          MappingSource: 'khokqjtw',
          MappingTarget: '1',
        },
        {
          MappingSource: 'khokur7a',
          MappingTarget: '2',
        },
        {
          MappingSource: 'khol82ux',
          MappingTarget: '3',
        },
        {
          MappingSource: 'khokqee5',
          MappingTarget: '4',
        },
      ];
      const variableResponseAttribute = [];

      const output = {
        khokqjtw: {
          x: 1,
          y: NaN,
          isCollected: '1',
        },
        khokur7a: {
          x: 2,
          y: NaN,
          isCollected: '1',
        },
        khol82ux: {
          x: 3,
          y: NaN,
          isCollected: '1',
        },
        khokqee5: {
          x: 4,
          y: NaN,
          isCollected: '1',
        },
      };
      expect(
        getResponseCoordinate(
          variableResponseMapping,
          variableResponseAttribute,
        ),
      ).toEqual(output);
    });
  });
});
