import { connect } from 'react-redux';

import QuestionnaireMerge from '../components/questionnaire-merge';

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  },
) => ({
  id,
  questionnaire: state.questionnaireById[id],
});

const QuestionnaireMergeContainer =
  connect(mapStateToProps)(QuestionnaireMerge);

export default QuestionnaireMergeContainer;
