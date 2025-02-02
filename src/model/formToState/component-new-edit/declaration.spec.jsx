import { describe, expect, test } from 'vitest';

import {
  declarationsFormNew,
  declarationsFormUpdate,
  declarationsModel,
  declarationsState,
} from './__mocks__/declaration';
import DeclarationTransformerFactory from './declaration';

describe.skip('Transformation entities - Declaration', () => {
  test('Should produce expected STATE in declarations creation from FORM', () => {
    const declarationTransformer = DeclarationTransformerFactory();

    // The id is random in creation, so it's not take it into account for testing.
    const state =
      declarationTransformer.formToComponentState(declarationsFormNew);
    const currentState = Object.keys(state).map((key) => {
      // eslint-disable-next-line no-unused-vars
      const { id, ...stateItem } = state[key];
      return stateItem;
    });

    const expectedState = Object.keys(declarationsState).map((key) => {
      // eslint-disable-next-line no-unused-vars
      const { id, ...expectedStateItem } = declarationsState[key];
      return expectedStateItem;
    });
    expect(currentState).toEqual(expectedState);
  });

  test('Should produce expected STATE from questionnaire MODEL', () => {
    expect(
      DeclarationTransformerFactory().modelToState(declarationsModel),
    ).toEqual(declarationsState);
  });

  test('Should produce expected FORM from questionnaire STATE', () => {
    const declarationTransformer = DeclarationTransformerFactory({
      initialState: declarationsState,
    });
    expect(declarationTransformer.stateToForm()).toEqual(
      declarationsFormUpdate,
    );
  });

  test('Should produce expected MODEL from questionnaire STATE', () => {
    const declarationTransformer = DeclarationTransformerFactory({
      initialState: declarationsState,
    });
    expect(declarationTransformer.stateToModel()).toEqual(declarationsModel);
  });
});
