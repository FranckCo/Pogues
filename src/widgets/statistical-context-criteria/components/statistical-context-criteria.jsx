import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ClassSet from 'react-classset';
import { Field } from 'redux-form';

import { WIDGET_STATISTICAL_CONTEXT_CRITERIA } from '../../../constants/dom-constants';
import { TCM } from '../../../constants/pogues-constants';
import GenericOption from '../../../forms/controls/generic-option';
import ListCheckboxes from '../../../forms/controls/list-checkboxes';
import Select from '../../../forms/controls/select';
import { requiredSelect } from '../../../forms/validation-rules';
import Dictionary from '../../../utils/dictionary/dictionary';
import { useOidc } from '../../../utils/oidc';

const { COMPONENT_CLASS, HORIZONTAL_CLASS } =
  WIDGET_STATISTICAL_CONTEXT_CRITERIA;

const StatisticalContextCriteria = props => {
  const {
    selectedSerie,
    selectedOperation,
    campaigns,
    operations,
    series,
    multipleCampaign,
    required,
    focusOnInit,
    horizontal,
    loadSeriesIfNeeded,
    loadOperationsIfNeeded,
    loadCampaignsIfNeeded,
  } = props;

  const [selectedSerieState, setSelectedSerieState] = useState();
  const [selectedOperationState, setSelectedOperationState] = useState();

  const oidc = useOidc();
  const token = oidc.oidcTokens.accessToken;

  useEffect(() => {
    loadSeriesIfNeeded(token);
    if (selectedSerie !== selectedSerieState) {
      loadOperationsIfNeeded(token, selectedSerie);
      setSelectedSerieState(selectedSerie);
    }

    if (selectedOperation !== selectedOperationState) {
      loadCampaignsIfNeeded(selectedOperation, token);
      setSelectedOperationState(selectedOperation);
    }
  }, [
    token,
    selectedSerie,
    selectedOperation,
    selectedOperationState,
    selectedSerieState,
    loadSeriesIfNeeded,
    loadOperationsIfNeeded,
    loadCampaignsIfNeeded,
  ]);

  return (
    <div
      className={ClassSet({
        [COMPONENT_CLASS]: true,
        [HORIZONTAL_CLASS]: horizontal,
      })}
    >
      <Field
        name="serie"
        component={Select}
        required={required}
        focusOnInit={focusOnInit}
        validate={required ? [requiredSelect] : []}
        label={Dictionary.serie}
        emptyOption={Dictionary.selectSerie}
      >
        {selectedSerie === TCM.id ? (
          <GenericOption key={TCM.id} value={TCM.value}>
            {TCM.label}
          </GenericOption>
        ) : (
          series.map(s => (
            <GenericOption key={s.value} value={s.value}>
              {s.label}
            </GenericOption>
          ))
        )}
      </Field>
      {operations && (
        <Field
          name="operation"
          component={Select}
          required={required}
          validate={required ? [requiredSelect] : []}
          disabled={!selectedSerie}
          label={Dictionary.operation}
          emptyOption={Dictionary.selectOperation}
        >
          {selectedOperation === TCM.id ? (
            <GenericOption key={TCM.id} value={TCM.value}>
              {TCM.label}
            </GenericOption>
          ) : (
            operations.map(s => (
              <GenericOption key={s.value} value={s.value}>
                {s.label}
              </GenericOption>
            ))
          )}
        </Field>
      )}

      {campaigns && (
        <Field
          name="campaigns"
          component={multipleCampaign ? ListCheckboxes : Select}
          required={required}
          validate={required ? [requiredSelect] : []}
          disabled={!selectedSerie || !selectedOperation}
          label={Dictionary.campaign}
          emptyOption={Dictionary.selectCampaign}
          noValuesMessage={Dictionary.noValuesCampaigns}
        >
          {selectedOperation === TCM.id ? (
            <GenericOption key={TCM.id} value={TCM.value}>
              {TCM.label}
            </GenericOption>
          ) : (
            campaigns.map(s => (
              <GenericOption key={s.value} value={s.value}>
                {s.label}
              </GenericOption>
            ))
          )}
        </Field>
      )}
    </div>
  );
};
// PropTypes and defaultProps

StatisticalContextCriteria.propTypes = {
  series: PropTypes.array.isRequired,
  operations: PropTypes.array,
  campaigns: PropTypes.array,
  multipleCampaign: PropTypes.bool,
  required: PropTypes.bool,
  horizontal: PropTypes.bool.isRequired,
  focusOnInit: PropTypes.bool.isRequired,
  selectedSerie: PropTypes.string,
  selectedOperation: PropTypes.string,
  loadSeriesIfNeeded: PropTypes.func.isRequired,
  loadOperationsIfNeeded: PropTypes.func.isRequired,
  loadCampaignsIfNeeded: PropTypes.func.isRequired,
};
StatisticalContextCriteria.defaultProps = {
  multipleCampaign: false,
  required: false,
  focusOnInit: false,
  operations: undefined,
  campaigns: undefined,
  selectedSerie: undefined,
  selectedOperation: undefined,
};

export default StatisticalContextCriteria;
