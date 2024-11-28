import React from 'react';

import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import { DEFAULT_FORM_NAME } from '../../../../../constants/pogues-constants';
import { defaultMeasureState } from '../../../../../model/formToState/component-new-edit/response-format-table';
import { validateTableListMeasuresForm } from '../../../../../utils/validation/validate';
import { ListWithInputPanel } from '../../../../list-with-input-panel';
import InputMeasure from './input-measure';

const validateForm = (addErrors, validate) => (values) => {
  return validate(values, addErrors);
};

function TableListMeasures({ formName, selectorPath, addErrors }) {
  return (
    <FormSection name="LIST_MEASURE">
      <ListWithInputPanel
        formName={formName}
        selectorPath={selectorPath}
        name="measures"
        validateForm={validateForm(addErrors, validateTableListMeasuresForm)}
        resetObject={defaultMeasureState}
      >
        <InputMeasure selectorPath={selectorPath} />
      </ListWithInputPanel>
    </FormSection>
  );
}

TableListMeasures.propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string.isRequired,
  addErrors: PropTypes.func.isRequired,
};

TableListMeasures.defaultProps = {
  formName: DEFAULT_FORM_NAME,
};

export default TableListMeasures;
