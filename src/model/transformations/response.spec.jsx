import { format } from 'url';
import { describe, expect, test } from 'vitest';

import {
  DATATYPE_TYPE_FROM_NAME,
  DATATYPE_VIS_HINT,
} from '../../constants/pogues-constants';
import { stateToRemote } from './response';

describe('response tranformations', () => {
  test('should return the default object with a generated id', () => {
    const typeName = 'DATE';
    const result = stateToRemote({
      typeName,
    });

    expect(result.Datatype).toEqual({
      typeName,
      type: DATATYPE_TYPE_FROM_NAME.DATE,
    });
    expect(result.id).toBeDefined();
  });

  test('should return the default object with the id passed as a parameter', () => {
    const typeName = 'DATE';
    const result = stateToRemote({
      typeName,
      id: '1',
    });

    expect(result.Datatype).toEqual({
      typeName,
      type: DATATYPE_TYPE_FROM_NAME.DATE,
    });
    expect(result.id).toEqual('1');
  });

  test('when CollectedVariableReference is defined', () => {
    const typeName = 'DATE';
    const collectedVariable = 'CollectedVariableReference';
    const result = stateToRemote({
      typeName,
      id: '1',
      collectedVariable,
    });

    expect(result.CollectedVariableReference).toEqual(collectedVariable);
  });
  test('when CodeListReference is defined', () => {
    const typeName = 'DATE';
    const codesListId = 'codesListId';
    const result = stateToRemote({
      typeName,
      id: '1',
      codesListId,
    });

    expect(result.CodeListReference).toEqual(codesListId);
  });
  test('when mandatory is defined and is a boolean', () => {
    const typeName = 'DATE';
    const mandatory = true;
    const result = stateToRemote({
      typeName,
      id: '1',
      mandatory,
    });

    expect(result.mandatory).toEqual(mandatory);
  });
  test('when mandatory is defined and is an empty string', () => {
    const typeName = 'DATE';
    const mandatory = '';
    const result = stateToRemote({
      typeName,
      id: '1',
      mandatory,
    });

    expect(result.mandatory).toEqual(false);
  });
  test('when visualizationHint is defined', () => {
    const typeName = 'DATE';
    const visHint = 'visualizationHint';
    const result = stateToRemote({
      typeName,
      id: '1',
      visHint,
    });

    expect(result.Datatype.visualizationHint).toEqual(visHint);
  });

  test('when MaxLength is defined', () => {
    const typeName = 'DATE';
    const maxLength = 1;
    const result = stateToRemote({
      typeName,
      id: '1',
      maxLength,
    });

    expect(result.Datatype.MaxLength).toEqual(maxLength);
  });
  test('when Pattern is defined', () => {
    const typeName = 'DATE';
    const pattern = 1;
    const result = stateToRemote({
      typeName,
      id: '1',
      pattern,
    });

    expect(result.Datatype.Pattern).toEqual(pattern);
  });
  test('when Minimum is defined', () => {
    const typeName = 'DATE';
    const minimum = 1;
    const result = stateToRemote({
      typeName,
      id: '1',
      minimum,
    });

    expect(result.Datatype.Minimum).toEqual(minimum);
  });
  test('when Maximum is defined', () => {
    const typeName = 'DATE';
    const maximum = 1;
    const result = stateToRemote({
      typeName,
      id: '1',
      maximum,
    });

    expect(result.Datatype.Maximum).toEqual(maximum);
  });
  test('when Decimals is defined', () => {
    const typeName = 'NUMERIC';
    const decimals = 1;
    const result = stateToRemote({
      typeName,
      id: '1',
      decimals,
    });

    expect(result.Datatype.Decimals).toEqual(decimals);
  });
  test('when IsDynamicUnit is defined', () => {
    const typeName = 'NUMERIC';
    const isDynamicUnit = true;
    const result = stateToRemote({
      typeName,
      id: '1',
      isDynamicUnit,
    });

    expect(result.Datatype.IsDynamicUnit).toEqual(isDynamicUnit);
  });
  test('when Unit is defined', () => {
    const typeName = 'NUMERIC';
    const unit = 1;
    const result = stateToRemote({
      typeName,
      id: '1',
      unit,
    });

    expect(result.Datatype.Unit).toEqual(unit);
  });

  test('when allowArbitraryResponse is defined', () => {
    const typeName = 'TEXT';
    const allowArbitraryResponse = true;

    // Get all values of DATATYPE_VIS_HINT except 'SUGGESTER'
    const nonSuggesterVisHints = Object.values(DATATYPE_VIS_HINT).filter(
      (visHint) => visHint !== DATATYPE_VIS_HINT.SUGGESTER,
    );

    const resultSuggester = stateToRemote({
      typeName,
      id: '1',
      visHint: DATATYPE_VIS_HINT.SUGGESTER,
      allowArbitraryResponse,
    });

    expect(resultSuggester.Datatype.allowArbitraryResponse).toEqual(
      allowArbitraryResponse,
    );

    // Test for all non-SUGGESTER visHint values
    nonSuggesterVisHints.forEach((visHint) => {
      const result = stateToRemote({
        typeName,
        id: '1',
        visHint,
        allowArbitraryResponse,
      });

      expect(result.Datatype.allowArbitraryResponse).toEqual(undefined);
    });
  });

  test('when Format is defined', () => {
    const typeName = 'DATE';
    const result = stateToRemote({
      typeName,
      id: '1',
      format,
    });
    expect(result.Datatype.Format).toEqual(format);
  });

  test('test when response is undefined ', () => {
    const response = undefined;
    const state = { collectedVariable: 'kgs406le', typeName: 'BOOLEAN' };
    const result = stateToRemote(state, response);
    expect(result.Datatype).toEqual({
      typeName: 'BOOLEAN',
      type: 'BooleanDatatypeType',
    });
    expect(result.id).toBeDefined();
  });
  test('test when response is not undefined ', () => {
    const response = [
      {
        CollectedVariableReference: 'kgs406le',
        Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
        id: 'kgs3mlsd',
      },
    ];
    const state = { collectedVariable: 'kgs406le', typeName: 'BOOLEAN' };
    const result = stateToRemote(state, response);

    expect(result).toEqual({
      CollectedVariableReference: 'kgs406le',
      Datatype: { typeName: 'BOOLEAN', type: 'BooleanDatatypeType' },
      id: 'kgs3mlsd',
    });
  });
});
