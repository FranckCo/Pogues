import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createComponent, orderComponents, updateParentChildren } from 'actions/component';
import { setSelectedComponentId, setCurrentCodesListsInQuestion } from 'actions/app-state';
import ComponentNewEdit from 'questionnaire/components/component/component-new-edit';
import { getCurrentCodesListsIdsStore } from 'utils/model/state-to-form-utils';
import { getActiveCodesListsStore } from 'utils/model/form-to-state-utils';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';
import ExternalVariableTransformerFactory from 'utils/transformation-entities/external-variable';
import { defaultResponseFormatState } from 'utils/transformation-entities/response-format';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

const mapStateToProps = state => ({
  calculatedVariablesStore: state.appState.activeCalculatedVariablesById,
  externalVariablesStore: state.appState.activeExternalVariablesById,
  currentCodesListsIdsStore: state.appState.codeListsByActiveQuestion,
  activeCodesListsStore: state.appState.activeCodeListsById,
});

const mapDispatchToProps = {
  createComponent,
  orderComponents,
  updateParentChildren,
  setSelectedComponentId,
  setCurrentCodesListsInQuestion,
};

class ComponentNewContainer extends Component {
  static propTypes = {
    createComponent: PropTypes.func.isRequired,
    orderComponents: PropTypes.func.isRequired,
    updateParentChildren: PropTypes.func.isRequired,
    setSelectedComponentId: PropTypes.func.isRequired,
    setCurrentCodesListsInQuestion: PropTypes.func.isRequired,
    weight: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
    calculatedVariablesStore: PropTypes.object,
    externalVariablesStore: PropTypes.object,
    currentCodesListsIdsStore: PropTypes.object,
    activeCodesListsStore: PropTypes.object,
  };

  static defaultProps = {
    onSuccess: undefined,
    onCancel: undefined,
    calculatedVariablesStore: {},
    externaldVariablesStore: {},
    currentCodesListsIdsStore: {},
    activeCodesListsStore: {},
  };
  componentWillMount() {
    const { type, setCurrentCodesListsInQuestion } = this.props;
    let currentCodesListsStoreFromQuestion = {};

    if (type === QUESTION) {
      currentCodesListsStoreFromQuestion = getCurrentCodesListsIdsStore(defaultResponseFormatState);
    }

    setCurrentCodesListsInQuestion(currentCodesListsStoreFromQuestion);
  }
  render() {
    const {
      createComponent,
      orderComponents,
      updateParentChildren,
      setSelectedComponentId,
      parentId,
      weight,
      type,
      onSuccess,
      onCancel,
      calculatedVariablesStore,
      externalVariablesStore,
      currentCodesListsIdsStore,
      activeCodesListsStore,
    } = this.props;
    const componentTransformer = ComponentTransformerFactory({
      calculatedVariablesStore,
      externalVariablesStore,
      currentCodesListsIdsStore,
      codesListsStore: activeCodesListsStore,
    });
    const initialValues = componentTransformer.stateToForm({ type });
    const submit = values => {
      let updatedCalculatedVariablesStore = {};
      let updatedExternalVariablesStore = {};
      let updatedCodesListsStore = {};
      const componentState = componentTransformer.formToState(values, { parent: parentId, weight, type });

      if (type === QUESTION) {
        updatedCodesListsStore = getActiveCodesListsStore(componentState.responseFormat);
        updatedCalculatedVariablesStore = CalculatedVariableTransformerFactory().formToStore(
          values.calculatedVariables
        );
        updatedExternalVariablesStore = ExternalVariableTransformerFactory().formToStore(values.externalVariables);
      }

      createComponent(
        componentState,
        updatedCalculatedVariablesStore,
        updatedExternalVariablesStore,
        updatedCodesListsStore
      )
        .then(updateParentChildren)
        .then(orderComponents)
        .then(result => {
          const { payload: { id } } = result;
          setSelectedComponentId(id);
          if (onSuccess) onSuccess(id);
        });
    };

    return (
      <ComponentNewEdit
        type={type}
        initialValues={initialValues}
        onSubmit={submit}
        onCancel={onCancel}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentNewContainer);
