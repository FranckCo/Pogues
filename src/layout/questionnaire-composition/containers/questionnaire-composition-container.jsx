import { connect } from 'react-redux';

import QuestionnaireComposition from '../components/questionnaire-composition';

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  },
) => ({
  questionnaire: state.questionnaireById[id],
});

const QuestionnaireCompositionContainer = connect(mapStateToProps)(
  QuestionnaireComposition,
);

export default QuestionnaireCompositionContainer;
