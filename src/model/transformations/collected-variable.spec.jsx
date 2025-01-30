import { describe, expect, test } from 'vitest';

import { DATATYPE_NAME } from '../../constants/pogues-constants';
import {
  remoteToComponentState,
  remoteToStore,
  storeToRemote,
} from './collected-variable';

const { TEXT, DURATION, DATE, NUMERIC } = DATATYPE_NAME;

describe('collected variable tranformations', () => {
  describe('remoteToStore', () => {
    test('should return the store representation of a text collected variable', () => {
      const input = [
        {
          id: 'jdww2n76',
          Name: 'A',
          Label: 'A label',
          type: 'CollectedVariableType',
          CodeListReference: 'id',
          Datatype: {
            typeName: TEXT,
            MaxLength: 100,
            Pattern: 'pattern',
          },
        },
      ];
      const responsesByVariable = { jdww2n76: {} };
      const codesListStore = { id: { label: 'label' } };
      const output = {
        jdww2n76: {
          id: 'jdww2n76',
          label: 'A label',
          name: 'A',
          type: TEXT,
          codeListReference: 'id',
          codeListReferenceLabel: 'label',
          [TEXT]: {
            decimals: undefined,
            maxLength: 100,
            pattern: 'pattern',
            maximum: undefined,
            minimum: undefined,
            unit: undefined,
            format: undefined,
          },
        },
      };
      expect(remoteToStore(input, responsesByVariable, codesListStore)).toEqual(
        output,
      );
    });

    test('should return the store representation of a numeric collected variable', () => {
      const input1 = [
        {
          id: 'jdww2n76',
          Name: 'A',
          Label: 'A label',
          type: 'CollectedVariableType',
          CodeListReference: 'id',
          Datatype: {
            typeName: NUMERIC,
            Minimum: '1',
            Maximum: '10',
            Decimals: '',
            IsDynamicUnit: false,
            Unit: 'euro',
          },
        },
      ];
      const input2 = [
        {
          id: 'jdww2n76',
          Name: 'A',
          Label: 'A label',
          type: 'CollectedVariableType',
          CodeListReference: 'id',
          Datatype: {
            typeName: NUMERIC,
            Minimum: '1',
            Maximum: '10',
            Decimals: '2',
            IsDynamicUnit: true,
            Unit: 'my formula',
          },
        },
      ];

      const responsesByVariable = { jdww2n76: {} };
      const codesListStore = { id: { label: 'label' } };

      const output1 = {
        jdww2n76: {
          id: 'jdww2n76',
          label: 'A label',
          name: 'A',
          type: NUMERIC,
          codeListReference: 'id',
          codeListReferenceLabel: 'label',
          [NUMERIC]: {
            minimum: '1',
            maximum: '10',
            decimals: '',
            isDynamicUnit: false,
            unit: 'euro',
          },
        },
      };
      const output2 = {
        jdww2n76: {
          id: 'jdww2n76',
          label: 'A label',
          name: 'A',
          type: NUMERIC,
          codeListReference: 'id',
          codeListReferenceLabel: 'label',
          [NUMERIC]: {
            minimum: '1',
            maximum: '10',
            decimals: '2',
            isDynamicUnit: true,
            unit: 'my formula',
          },
        },
      };

      expect(
        remoteToStore(input1, responsesByVariable, codesListStore),
      ).toEqual(output1);
      expect(
        remoteToStore(input2, responsesByVariable, codesListStore),
      ).toEqual(output2);
    });

    test('should return miyears, mimonths, mayears, and mamonths from minimum and maximum to the store representation of a collected variable', () => {
      const input = [
        {
          id: 'k23boas9',
          Name: 'QWSS',
          Label: 'QWSS label',
          type: 'CollectedVariableType',
          CodeListReference: 'id',
          Datatype: {
            typeName: DURATION,
            Format: 'PnYnM',
            Maximum: 'P1Y1M',
            Minimum: 'P1Y1M',
          },
        },
      ];
      const responsesByVariable = { k23boas9: {} };
      const codesListStore = { id: { label: 'label' } };
      const output = {
        k23boas9: {
          id: 'k23boas9',
          label: 'QWSS label',
          name: 'QWSS',
          type: DURATION,
          codeListReference: 'id',
          codeListReferenceLabel: 'label',
          [DURATION]: {
            format: 'PnYnM',
            mamonths: '1',
            maximum: 'P1Y1M',
            mayears: '1',
            mimonths: '1',
            minimum: 'P1Y1M',
            miyears: '1',
          },
        },
      };
      expect(remoteToStore(input, responsesByVariable, codesListStore)).toEqual(
        output,
      );
    });

    test('should return maminutes = "" if type name Duration and format PTnHnM and miminutes = 0 to the store representation of a collected variable', () => {
      const input = [
        {
          id: 'k23bk67e',
          Name: 'AQS',
          Label: 'AQS label',
          type: 'CollectedVariableType',
          CodeListReference: 'id',
          Datatype: {
            Format: 'PTnHnM',
            Maximum: 'PT2H2M',
            Minimum: 'PT2H0M',
            type: 'DurationDatatypeType',
            typeName: DURATION,
          },
        },
      ];
      const responsesByVariable = { k23bk67e: {} };
      const codesListStore = { id: { label: 'label' } };
      const output = {
        k23bk67e: {
          id: 'k23bk67e',
          label: 'AQS label',
          name: 'AQS',
          type: DURATION,
          codeListReference: 'id',
          codeListReferenceLabel: 'label',
          [DURATION]: {
            format: 'PTnHnM',
            mahours: '2',
            maminutes: '2',
            maximum: 'PT2H2M',
            mihours: '2',
            miminutes: '0',
            minimum: 'PT2H0M',
          },
        },
      };
      expect(remoteToStore(input, responsesByVariable, codesListStore)).toEqual(
        output,
      );
    });

    test('should add the arbitrary variables to the collected', () => {
      const input = [
        {
          id: 'm6aty8by',
          Name: 'SUGGESTER',
          type: 'CollectedVariableType',
          Label: 'SUGGESTER label',
          Datatype: {
            type: 'TextDatatypeType',
            Pattern: '',
            typeName: 'TEXT',
            MaxLength: 1,
          },
          CodeListReference: 'id',
        },
        {
          id: 'm6atzjnb',
          Name: 'SUGGESTER_ARBITRARY',
          type: 'CollectedVariableType',
          Label: 'SUGGESTER_ARBITRARY label',
          Datatype: {
            type: 'TextDatatypeType',
            typeName: 'TEXT',
            MaxLength: 249,
          },
          arbitraryVariableOfVariableId: 'm6aty8by',
        },
      ];
      const arbitraryVariables = [
        {
          Datatype: {
            type: 'TextDatatypeType',
            typeName: 'TEXT',
            MaxLength: 249,
          },
          mandatory: false,
          CollectedVariableReference: 'm6atzjnb',
          arbitraryVariableOfVariableId: 'm6aty8by',
        },
      ];
      const responsesByVariable = { m6aty8by: {} };
      const codesListStore = { id: { label: 'label' } };
      const variableclarification = [];
      const output = {
        m6aty8by: {
          id: 'm6aty8by',
          name: 'SUGGESTER',
          label: 'SUGGESTER label',
          type: TEXT,
          codeListReference: 'id',
          codeListReferenceLabel: 'label',
          TEXT: {
            maxLength: 1,
            pattern: '',
          },
        },
        m6atzjnb: {
          id: 'm6atzjnb',
          name: 'SUGGESTER_ARBITRARY',
          label: 'SUGGESTER_ARBITRARY label',
          type: TEXT,
          codeListReferenceLabel: '',
          TEXT: {
            maxLength: 249,
          },
          arbitraryVariableOfVariableId: 'm6aty8by',
        },
      };

      expect(
        remoteToStore(
          input,
          responsesByVariable,
          codesListStore,
          variableclarification,
          arbitraryVariables,
        ),
      ).toEqual(output);
    });
  });
  describe('remoteToComponentState', () => {
    test('should return the state representation of a collected variable', () => {
      const input = [
        {
          CollectedVariableReference: 'jbcggt4x',
          Datatype: {
            MaxLength: 249,
            Pattern: '',
            type: 'TextDatatypeType',
            typeName: 'TEXT',
          },

          id: 'jbgd6m6e',
          mandatory: false,
        },
      ];
      const output = ['jbcggt4x'];
      expect(remoteToComponentState(input)).toEqual(output);
    });
  });
  describe('storeToRemote', () => {
    test('should return the remote representation of a collected variable', () => {
      const input = {
        jdww2n76: {
          id: 'jdww2n76',
          label: 'A label',
          name: 'A',
          x: undefined,
          y: undefined,
          type: TEXT,
          [TEXT]: {
            decimals: undefined,
            maxLength: 100,
            pattern: 'pattern',
            maximum: undefined,
            minimum: undefined,
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: undefined,
            miminutes: undefined,
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ['CAWI', 'PAPI'],
          children: [],
          collectedVariables: ['kaphc2ly'],
          controls: {},
          declarations: {},
          id: 'kapgzmji',
          label: 'question1',
          name: 'QUESTION1',
          parent: 'kaph7dbh',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              TEXT: { maxLength: 249, pattern: '' },
              id: 'kaph6l3y',
              mandatory: false,
              type: 'TEXT',
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ['CAWI', 'PAPI'],
          children: ['kapgzmji', 'kaphg7pd'],
          controls: {},
          declarations: {},
          id: 'kaph7dbh',
          label: 'sequence1',
          name: 'SEQUENCE1',
          parent: 'kaphhxpd',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: 'A label',
          Name: 'A',
          id: 'jdww2n76',
          type: 'CollectedVariableType',
          Datatype: {
            type: 'TextDatatypeType',
            typeName: TEXT,
            MaxLength: 100,
            Pattern: 'pattern',
          },
        },
      ];
      expect(storeToRemote(input, input1)).toEqual(output);
    });

    test('should return collected variable model if type is NUMERIC', () => {
      const input = {
        k23cdv5w: {
          id: 'k23cdv5w',
          label: 'A label',
          name: 'A',
          type: NUMERIC,
          [NUMERIC]: {
            minimum: '1',
            maximum: '10',
            decimals: '2',
            isDynamicUnit: true,
            unit: 'my formula',
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ['CAWI', 'PAPI'],
          children: [],
          collectedVariables: ['kaphc2ly'],
          controls: {},
          declarations: {},
          id: 'kapgzmji',
          label: 'question1',
          name: 'QUESTION1',
          parent: 'kaph7dbh',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              NUMERIC: { maxLength: 249, pattern: '' },
              id: 'kaph6l3y',
              mandatory: false,
              type: 'NUMERIC',
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ['CAWI', 'PAPI'],
          children: ['kapgzmji', 'kaphg7pd'],
          controls: {},
          declarations: {},
          id: 'kaph7dbh',
          label: 'sequence1',
          name: 'SEQUENCE1',
          parent: 'kaphhxpd',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: 'A label',
          Name: 'A',
          id: 'k23cdv5w',
          type: 'CollectedVariableType',
          Datatype: {
            Minimum: '1',
            Maximum: '10',
            Decimals: '2',
            IsDynamicUnit: true,
            Unit: 'my formula',
            type: 'NumericDatatypeType',
            typeName: NUMERIC,
          },
        },
      ];
      expect(storeToRemote(input, input1)).toEqual(output);
    });

    test('should remove the minimum and maximum in collected variable model if type is DATE', () => {
      const input = {
        k23cdv5w: {
          id: 'k23cdv5w',
          label: 'A label',
          name: 'A',
          x: undefined,
          y: undefined,
          type: DATE,
          [DATE]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: 'yyyy',
            minimum: '2090',
            maximum: '',
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: undefined,
            miminutes: undefined,
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ['CAWI', 'PAPI'],
          children: [],
          collectedVariables: ['kaphc2ly'],
          controls: {},
          declarations: {},
          id: 'kapgzmji',
          label: 'question1',
          name: 'QUESTION1',
          parent: 'kaph7dbh',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              TEXT: { maxLength: 249, pattern: '' },
              id: 'kaph6l3y',
              mandatory: false,
              type: 'TEXT',
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ['CAWI', 'PAPI'],
          children: ['kapgzmji', 'kaphg7pd'],
          controls: {},
          declarations: {},
          id: 'kaph7dbh',
          label: 'sequence1',
          name: 'SEQUENCE1',
          parent: 'kaphhxpd',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: 'A label',
          Name: 'A',
          id: 'k23cdv5w',
          type: 'CollectedVariableType',
          Datatype: {
            Format: 'YYYY',
            Minimum: '2090',
            type: 'DateDatatypeType',
            typeName: DATE,
          },
        },
      ];
      expect(storeToRemote(input, input1)).toEqual(output);
    });

    test('should return collected variable model if type is DURATION and the PTnHnM format', () => {
      const input = {
        k23bk67e: {
          id: 'k23bk67e',
          label: 'AQS label',
          name: 'AQS',
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: 'PTnHnM',
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: 2,
            miminutes: '',
            mahours: 2,
            maminutes: 2,
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ['CAWI', 'PAPI'],
          children: [],
          collectedVariables: ['kaphc2ly'],
          controls: {},
          declarations: {},
          id: 'kapgzmji',
          label: 'question1',
          name: 'QUESTION1',
          parent: 'kaph7dbh',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              TEXT: { maxLength: 249, pattern: '' },
              id: 'kaph6l3y',
              mandatory: false,
              type: 'TEXT',
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ['CAWI', 'PAPI'],
          children: ['kapgzmji', 'kaphg7pd'],
          controls: {},
          declarations: {},
          id: 'kaph7dbh',
          label: 'sequence1',
          name: 'SEQUENCE1',
          parent: 'kaphhxpd',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: 'AQS label',
          Name: 'AQS',
          id: 'k23bk67e',
          type: 'CollectedVariableType',
          Datatype: {
            Format: 'PTnHnM',
            Maximum: 'PT2H2M',
            Minimum: 'PT2H0M',
            type: 'DurationDatatypeType',
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input, input1)).toEqual(output);
    });

    test('should return collected variable model if type is DURATION and the PnYnM format', () => {
      const input = {
        k23boas9: {
          id: 'k23boas9',
          label: 'QWSS label',
          name: 'QWSS',
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: 'PnYnM',
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: 1,
            mimonths: 1,
            mayears: 1,
            mamonths: 1,
            mihours: undefined,
            miminutes: undefined,
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ['CAWI', 'PAPI'],
          children: [],
          collectedVariables: ['kaphc2ly'],
          controls: {},
          declarations: {},
          id: 'kapgzmji',
          label: 'question1',
          name: 'QUESTION1',
          parent: 'kaph7dbh',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              TEXT: { maxLength: 249, pattern: '' },
              id: 'kaph6l3y',
              mandatory: false,
              type: 'TEXT',
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ['CAWI', 'PAPI'],
          children: ['kapgzmji', 'kaphg7pd'],
          controls: {},
          declarations: {},
          id: 'kaph7dbh',
          label: 'sequence1',
          name: 'SEQUENCE1',
          parent: 'kaphhxpd',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };

      const output = [
        {
          CodeListReference: undefined,
          Label: 'QWSS label',
          Name: 'QWSS',
          id: 'k23boas9',
          type: 'CollectedVariableType',
          Datatype: {
            Format: 'PnYnM',
            Maximum: 'P1Y1M',
            Minimum: 'P1Y1M',
            type: 'DurationDatatypeType',
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input, input1)).toEqual(output);
    });

    test('should not return minimum in collected variable model if type is DURATION and the PnYnM format and miyears and mimonths undefined', () => {
      const input = {
        k23boas9: {
          id: 'k23boas9',
          label: 'QWSS label',
          name: 'QWSS',
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: 'PnYnM',
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: 1,
            mamonths: 1,
            mihours: undefined,
            miminutes: undefined,
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ['CAWI', 'PAPI'],
          children: [],
          collectedVariables: ['kaphc2ly'],
          controls: {},
          declarations: {},
          id: 'kapgzmji',
          label: 'question1',
          name: 'QUESTION1',
          parent: 'kaph7dbh',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              TEXT: { maxLength: 249, pattern: '' },
              id: 'kaph6l3y',
              mandatory: false,
              type: 'TEXT',
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ['CAWI', 'PAPI'],
          children: ['kapgzmji', 'kaphg7pd'],
          controls: {},
          declarations: {},
          id: 'kaph7dbh',
          label: 'sequence1',
          name: 'SEQUENCE1',
          parent: 'kaphhxpd',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: 'QWSS label',
          Name: 'QWSS',
          id: 'k23boas9',
          type: 'CollectedVariableType',
          Datatype: {
            Format: 'PnYnM',
            Maximum: 'P1Y1M',
            type: 'DurationDatatypeType',
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input, input1)).toEqual(output);
    });

    test('should not return Maximum collected variable model if type is DURATION and the PTnHnM format and mahours and maminutes undefined', () => {
      const input = {
        k23bk67e: {
          id: 'k23bk67e',
          label: 'AQS label',
          name: 'AQS',
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: 'PTnHnM',
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: 2,
            miminutes: 1,
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };

      const input1 = {
        kapgzmji: {
          TargetMode: ['CAWI', 'PAPI'],
          children: [],
          collectedVariables: ['kaphc2ly'],
          controls: {},
          declarations: {},
          id: 'kapgzmji',
          label: 'question1',
          name: 'QUESTION1',
          parent: 'kaph7dbh',
          redirections: {},
          responseFormat: {
            type: 'SIMPLE',
            SIMPLE: {
              TEXT: { maxLength: 249, pattern: '' },
              id: 'kaph6l3y',
              mandatory: false,
              type: 'TEXT',
            },
          },
          responsesClarification: undefined,
          type: 'QUESTION',
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ['CAWI', 'PAPI'],
          children: ['kapgzmji', 'kaphg7pd'],
          controls: {},
          declarations: {},
          id: 'kaph7dbh',
          label: 'sequence1',
          name: 'SEQUENCE1',
          parent: 'kaphhxpd',
          redirections: {},
          responsesClarification: undefined,
          type: 'SEQUENCE',
          weight: 0,
        },
      };

      const output = [
        {
          CodeListReference: undefined,
          Label: 'AQS label',
          Name: 'AQS',
          id: 'k23bk67e',
          type: 'CollectedVariableType',
          Datatype: {
            Format: 'PTnHnM',
            Minimum: 'PT2H1M',
            type: 'DurationDatatypeType',
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input, input1)).toEqual(output);
    });
  });
  test('should return Scoop from loop ID in collected variable model if there is LOOP and question is not table', () => {
    const input = {
      k23bk67e: {
        id: 'kawknt1k',
        TEXT: { maxLength: 249, pattern: '' },
        codeListReference: undefined,
        codeListReferenceLabel: '',
        label: 'QUESTION1 label',
        mesureLevel: undefined,
        name: 'QUESTION1',
        type: 'TEXT',
        z: undefined,
      },
    };
    const input1 = {
      kawkitxu: {
        TargetMode: ['CAWI'],
        children: [],
        collectedVariables: ['kawknt1k'],
        controls: {},
        declarations: {},
        id: 'kawkitxu',
        label: 'question1',
        name: 'QUESTION1',
        parent: 'kawkbwbv',
        redirections: {},
        responseFormat: {
          type: 'SIMPLE',
          SIMPLE: {
            TEXT: { maxLength: 249, pattern: '' },
            id: 'kawknyfn',
            mandatory: false,
            type: 'TEXT',
          },
        },
        responsesClarification: undefined,
        type: 'QUESTION',
        weight: 0,
      },
      kawkbwbv: {
        TargetMode: ['CAWI'],
        children: ['kawkitxu', 'kawknrqr'],
        controls: {},
        declarations: {},
        id: 'kawkbwbv',
        label: 'sequence1',
        name: 'SEQUENCE1',
        parent: 'kawkne43',
        redirections: {},
        responsesClarification: undefined,
        type: 'SEQUENCE',
        weight: 0,
      },
      kawkne43: {
        TargetMode: ['CAWI'],
        children: ['kawkbwbv'],
        controls: {},
        declarations: {},
        id: 'kawkne43',
        label: 'testloop',
        name: 'TESTLOOP',
        parent: '',
        redirections: {},
        responsesClarification: undefined,
        type: 'QUESTIONNAIRE',
        weight: 0,
      },
      kawlwdra: {
        BasedOn: '',
        TargetMode: ['CAWI'],
        addButtonLibel: '',
        basedOn: '',
        children: [],
        collectedVariables: [],
        controls: {},
        declarations: {},
        filter: '',
        finalMember: 'kawkbwbv',
        id: 'kawlwdra',
        initialMember: 'kawkbwbv',
        label: '',
        maximum: '',
        name: 'LOOP',
        nameLoop: 'LOOP',
        parent: undefined,
        redirections: {},
        responseFormat: {},
        type: 'LOOP',
        weight: undefined,
      },
    };
    const output = [
      {
        CodeListReference: undefined,
        Datatype: {
          typeName: 'TEXT',
          type: 'TextDatatypeType',
          MaxLength: 249,
          Pattern: '',
        },
        Label: 'QUESTION1 label',
        Name: 'QUESTION1',
        Scope: 'kawlwdra',
        id: 'kawknt1k',
        type: 'CollectedVariableType',
      },
    ];
    expect(storeToRemote(input, input1)).toEqual(output);
  });

  test('should return Scoop from Question ID in collected variable model if there is LOOP and question is table', () => {
    const input = {
      kawkrelo: {
        BOOLEAN: undefined,
        DATE: undefined,
        DURATION: undefined,
        NUMERIC: undefined,
        TEXT: { maxLength: 249, pattern: '' },
        codeListReference: '',
        codeListReferenceLabel: '',
        id: 'kawkrelo',
        label: 'tab',
        mesureLevel: undefined,
        name: 'QUESTION21',
        type: 'TEXT',
        x: 1,
        y: 1,
        z: undefined,
      },
    };
    const input1 = {
      kawkbwbv: {
        TargetMode: ['CAWI'],
        children: ['kawkitxu', 'kawknrqr'],
        controls: {},
        declarations: {},
        id: 'kawkbwbv',
        label: 'sequence1',
        name: 'SEQUENCE1',
        parent: 'kawkne43',
        redirections: {},
        responsesClarification: undefined,
        type: 'SEQUENCE',
        weight: 0,
      },
      kawknrqr: {
        TargetMode: ['CAWI'],
        children: [],
        collectedVariables: ['kawkrelo'],
        controls: {},
        declarations: {},
        id: 'kawknrqr',
        label: 'question2',
        name: 'QUESTION2',
        parent: 'kawkbwbv',
        redirections: {},
        responseFormat: {
          type: 'TABLE',
          TABLE: {
            LIST_MEASURE: [
              {
                label: 'tab',
                type: 'SIMPLE',
                SIMPLE: {
                  id: undefined,
                  type: 'TEXT',
                  mandatory: undefined,
                  TEXT: {
                    maxLength: 249,
                    pattern: '',
                  },
                },
              },
            ],
            PRIMARY: {
              LIST: {
                DYNAMIC_LENGTH: { minLines: 2, maxLines: 4 },
                type: 'DYNAMIC_LENGTH',
              },
              type: 'LIST',
            },
          },
        },
        responsesClarification: [],
        type: 'QUESTION',
        weight: 0,
      },
      kawkne43: {
        TargetMode: ['CAWI'],
        children: ['kawkbwbv'],
        controls: {},
        declarations: {},
        id: 'kawkne43',
        label: 'testloop',
        name: 'TESTLOOP',
        parent: '',
        redirections: {},
        responsesClarification: undefined,
        type: 'QUESTIONNAIRE',
        weight: 0,
      },
      kawlwdra: {
        BasedOn: 'kawknrqr',
        TargetMode: ['CAWI'],
        addButtonLibel: '',
        basedOn: 'kawknrqr',
        children: [],
        collectedVariables: [],
        controls: {},
        declarations: {},
        filter: '',
        finalMember: 'kawkbwbv',
        id: 'kawlwdra',
        initialMember: 'kawkbwbv',
        label: '',
        maximum: '',
        name: 'LOOP',
        nameLoop: 'LOOP',
        parent: undefined,
        redirections: {},
        responseFormat: {},
        type: 'LOOP',
        weight: undefined,
      },
    };
    const output = [
      {
        Datatype: {
          typeName: 'TEXT',
          type: 'TextDatatypeType',
          MaxLength: 249,
          Pattern: '',
        },
        Label: 'tab',
        Name: 'QUESTION21',
        Scope: 'kawknrqr',
        id: 'kawkrelo',
        type: 'CollectedVariableType',
      },
    ];
    expect(storeToRemote(input, input1)).toEqual(output);
  });

  test('should return Scoop from Question ID in collected variable model if there is question type table dynamique', () => {
    const input = {
      kawkrelo: {
        BOOLEAN: undefined,
        DATE: undefined,
        DURATION: undefined,
        NUMERIC: undefined,
        TEXT: { maxLength: 249, pattern: '' },
        codeListReference: '',
        codeListReferenceLabel: '',
        id: 'kawkrelo',
        label: 'tab',
        mesureLevel: undefined,
        name: 'QUESTION21',
        type: 'TEXT',
        x: 1,
        y: 1,
        z: undefined,
      },
    };
    const input1 = {
      kawkbwbv: {
        TargetMode: ['CAWI'],
        children: ['kawkitxu', 'kawknrqr'],
        controls: {},
        declarations: {},
        id: 'kawkbwbv',
        label: 'sequence1',
        name: 'SEQUENCE1',
        parent: 'kawkne43',
        redirections: {},
        responsesClarification: undefined,
        type: 'SEQUENCE',
        weight: 0,
      },
      kawknrqr: {
        TargetMode: ['CAWI'],
        children: [],
        collectedVariables: ['kawkrelo'],
        controls: {},
        declarations: {},
        id: 'kawknrqr',
        label: 'question2',
        name: 'QUESTION2',
        parent: 'kawkbwbv',
        redirections: {},
        responseFormat: {
          type: 'TABLE',
          TABLE: {
            LIST_MEASURE: [
              {
                label: 'tab',
                type: 'SIMPLE',
                SIMPLE: {
                  id: undefined,
                  type: 'TEXT',
                  mandatory: undefined,
                  TEXT: {
                    maxLength: 249,
                    pattern: '',
                  },
                },
              },
            ],
            PRIMARY: {
              LIST: {
                DYNAMIC_LENGTH: { minLines: 0, maxLines: 0 },
                FIXED_LENGTH: { fixedLength: '' },
                type: 'DYNAMIC_LENGTH',
              },
              type: 'LIST',
            },
          },
        },
        responsesClarification: [],
        type: 'QUESTION',
        weight: 0,
      },
      kawkne43: {
        TargetMode: ['CAWI'],
        children: ['kawkbwbv'],
        controls: {},
        declarations: {},
        id: 'kawkne43',
        label: 'testloop',
        name: 'TESTLOOP',
        parent: '',
        redirections: {},
        responsesClarification: undefined,
        type: 'QUESTIONNAIRE',
        weight: 0,
      },
    };
    const output = [
      {
        Datatype: {
          typeName: 'TEXT',
          type: 'TextDatatypeType',
          MaxLength: 249,
          Pattern: '',
        },
        Label: 'tab',
        Name: 'QUESTION21',
        Scope: 'kawknrqr',
        id: 'kawkrelo',
        type: 'CollectedVariableType',
      },
    ];
    expect(storeToRemote(input, input1)).toEqual(output);
  });
});
