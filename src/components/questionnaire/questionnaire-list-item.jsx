import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

function QuestionnaireListItem({ id, label }) {
  // @TODO: Remove the mocked data
  return (
    <div className="questionnaire-list_item">
      <div>
        <span className="glyphicon glyphicon-chevron-right" />
        <Link to={`/questionnaire/${id}`}>{label}</Link>
      </div>
      <div>Téléphone</div>
      <div>10/10/2016</div>
    </div>
  );
}

QuestionnaireListItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default QuestionnaireListItem;
