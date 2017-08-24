jest.dontMock('./calculated-variable.js');

import CalculatedVariableTransformerFactory from './calculated-variable';
import {
  calculatedVariablesFormNew,
  calculatedVariablesFormUpdate,
  calculatedVariablesStore,
  calculatedVariablesModel,
} from './__mocks__/calculated-variable';

describe('Transformation entities - CalculatedVariable', () => {
  test('Should produce expected STORE in calculated variables creation from question FORM', () => {
    const cvTransformer = CalculatedVariableTransformerFactory();

    // The id is random in creation, so it's not take it into account for testing.
    const store = cvTransformer.formToStore(calculatedVariablesFormNew);
    const state = Object.keys(store).map(key => {
      const { id, ...stateItem } = store[key];
      return stateItem;
    });

    const expectedState = Object.keys(calculatedVariablesStore).map(key => {
      const { id, ...expectedStateItem } = calculatedVariablesStore[key];
      return expectedStateItem;
    });
    expect(state).toEqual(expectedState);
  });

  test('Should produce expected STORE from questionnaire MODEL', () => {
    const cvTransformer = CalculatedVariableTransformerFactory();
    expect(cvTransformer.modelToStore(calculatedVariablesModel)).toEqual(calculatedVariablesStore);
  });

  test('Should produce expected FORM from questionnaire STORE', () => {
    const cvTransformer = CalculatedVariableTransformerFactory({
      initialStore: calculatedVariablesStore,
    });
    expect(cvTransformer.storeToForm()).toEqual(calculatedVariablesFormUpdate);
  });

  test('Should produce expected MODEL from questionnaire STORE', () => {
    const cvTransformer = CalculatedVariableTransformerFactory({ initialStore: calculatedVariablesStore });
    expect(cvTransformer.storeToModel()).toEqual(calculatedVariablesModel);
  });
});
