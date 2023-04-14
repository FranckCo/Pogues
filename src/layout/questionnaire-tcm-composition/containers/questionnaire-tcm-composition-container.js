import { connect } from 'react-redux';

import QuestionnaireTcmComposition from '../components/questionnaire-tcm-composition';

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

const QuestionnaireTcmCompositionContainer = connect(mapStateToProps)(
  QuestionnaireTcmComposition,
);

export default QuestionnaireTcmCompositionContainer;
