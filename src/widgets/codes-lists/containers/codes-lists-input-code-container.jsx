import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, actions } from 'redux-form';

import CodesListsInputCode from '../components/codes-lists-input-code';
import { validateCode, validationSchema } from '../utils/validation';

import withErrorValidation from 'hoc/withErrorValidation';

// PropTypes and defaultProps

const propTypes = {
  formName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

// Container

export const mapStateToProps = (state, { path, formName }) => {
  const selector = formValueSelector(formName);

  return {
    currentValue: selector(state, `${path}value`),
    currentLabel: selector(state, `${path}label`),
  };
};

const mapDispatchToProps = {
  change: actions.change,
};

const CodesListsInputCodeContainer = connect(mapStateToProps, mapDispatchToProps)(
  withErrorValidation(CodesListsInputCode, validateCode, validationSchema)
);

CodesListsInputCodeContainer.propTypes = propTypes;

export default CodesListsInputCodeContainer;