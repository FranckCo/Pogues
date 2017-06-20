import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { createQuestionnaire, CREATE_QUESTIONNAIRE_FAILURE } from 'actions/questionnaire';
import QuestionnaireNewEdit from 'components/questionnaire/questionnaire-new-edit';

const mapStateToProps = state => ({
  locale: state.locale,
});

const mapDispatchToProps = {
  createQuestionnaire,
};

// eslint-disable-next-line no-shadow
function QuestionnaireNewContainer({ createQuestionnaire, locale, onSuccess, onCancel }) {
  const submit = values => {
    return createQuestionnaire(values.name, values.label).then(result => {
      const { type, payload: { id, validation } } = result;

      if (type === CREATE_QUESTIONNAIRE_FAILURE) throw new SubmissionError(validation);
      else if (onSuccess) onSuccess(id);
    });
  };

  return <QuestionnaireNewEdit locale={locale} onSubmit={submit} onCancel={onCancel} />;
}

QuestionnaireNewContainer.propTypes = {
  createQuestionnaire: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

QuestionnaireNewContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireNewContainer);
