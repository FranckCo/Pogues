import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logger from 'utils/logger/logger';
import QuestionnaireContainer from 'questionnaire/containers/questionnaire';
import QuestionnaireNavContainer from 'questionnaire/containers/questionnaire-nav';
import GenericInputContainer from 'questionnaire/containers/generic-input';
import { loadQuestionnaireIfNeeded } from 'actions/questionnaire';
import { setActiveQuestionnaire, setActiveComponents, setActiveCodeLists } from 'actions/app-state';

const logger = new Logger('PageQuestionnaire', 'Components');

const mapStateToProps = (state, { params: { id } }) => ({
  questionnaire: state.questionnaireById[id],
  components: state.componentByQuestionnaire[id],
  codeLists: state.codeListByQuestionnaire[id],
  codes: state.codeByQuestionnaire[id],
});

const mapDispatchToProps = {
  loadQuestionnaireIfNeeded,
  setActiveQuestionnaire,
  setActiveComponents,
  setActiveCodeLists,
};

export class PageQuestionnaire extends Component {
  static propTypes = {
    loadQuestionnaireIfNeeded: PropTypes.func.isRequired,
    setActiveQuestionnaire: PropTypes.func.isRequired,
    setActiveComponents: PropTypes.func.isRequired,
    setActiveCodeLists: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    questionnaire: PropTypes.object,
    components: PropTypes.object,
    codeLists: PropTypes.object,
    codes: PropTypes.object,
  };

  static defaultProps = {
    questionnaire: {},
    components: {},
    codeLists: {},
    codes: {},
  };

  componentWillMount() {
    logger.debug('Rendering PageQuestionnaire component');
    this.props.loadQuestionnaireIfNeeded(this.props.params.id);
    this.setActive(this.props.questionnaire, this.props.components, this.props.codeLists, this.props.codes);
  }
  componentWillUpdate(nextProps) {
    const nextQuestionnaireId = nextProps.questionnaire.id;
    if (nextQuestionnaireId && nextQuestionnaireId !== this.props.questionnaire.id) {
      this.setActive(nextProps.questionnaire, nextProps.components, nextProps.codeLists, nextProps.codes);
    }
  }

  setActive(questionnaire, components, codeLists, codes) {
    this.props.setActiveQuestionnaire(questionnaire);
    this.props.setActiveComponents(components);
    this.props.setActiveCodeLists(codeLists, codes);
  }

  render() {
    return (
      <div id="page-questionnaire">
        <QuestionnaireNavContainer />
        <QuestionnaireContainer />
        <GenericInputContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageQuestionnaire);
