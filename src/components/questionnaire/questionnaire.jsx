import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import QuestionnaireElement from 'components/questionnaire/questionnaire-element';
import QuestionnaireEditContainer from 'containers/questionnaire/questionnaire-edit';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;

class Questionnaire extends Component {
  static propTypes = {
    locale: PropTypes.object.isRequired,
    questionnaire: PropTypes.object.isRequired,
    components: PropTypes.object,
    activeComponent: PropTypes.string,
    setActiveComponent: PropTypes.func.isRequired,
  };
  static defaultProps = {
    questionnaireComponentsIds: [],
    components: {},
    activeComponent: '',
  };
  constructor() {
    super();

    this.state = {
      showQuestionnaireModal: false,
      showElementModal: false,
      idElementInModal: undefined,
    };

    this.handleElementSelect = this.handleElementSelect.bind(this);
    this.handleOpenElementDetail = this.handleOpenElementDetail.bind(this);
    this.handleCloseElementDetail = this.handleCloseElementDetail.bind(this);
    this.handleOpenQuestionnaireDetail = this.handleOpenQuestionnaireDetail.bind(this);
    this.handleCloseQuestionnaireDetail = this.handleCloseQuestionnaireDetail.bind(this);
    this.renderComponentsByParent = this.renderComponentsByParent.bind(this);
    this.handleQuestionnnarieUpdated = this.handleQuestionnnarieUpdated.bind(this);
  }

  handleElementSelect(event, idElement) {
    event.stopPropagation();
    if (!idElement) return;
    const newSelected = idElement !== this.props.activeComponent ? idElement : '';
    this.props.setActiveComponent(newSelected);
  }

  handleOpenElementDetail(event, idElement) {
    event.stopPropagation();
    if (!idElement) return;
    const newState = {
      ...this.state,
      showElementModal: true,
      idElementInModal: idElement,
    };
    this.setState(newState);
  }

  handleCloseElementDetail() {
    const newState = {
      ...this.state,
      showElementModal: false,
      idElementInModal: undefined,
    };
    this.setState(newState);
  }

  handleOpenQuestionnaireDetail() {
    const newState = {
      ...this.state,
      showQuestionnaireModal: true,
    };
    this.setState(newState);
  }

  handleCloseQuestionnaireDetail() {
    const newState = {
      ...this.state,
      showQuestionnaireModal: false,
    };
    this.setState(newState);
  }

  handleQuestionnnarieUpdated() {
    this.handleCloseQuestionnaireDetail();
  }

  renderComponentsByParent(components, parent) {
    const renderComponentsByParent = this.renderComponentsByParent;
    const selected = this.props.activeComponent;

    return Object.keys(components).filter(key => components[key].parent === parent).map(key => {
      const subTree = renderComponentsByParent(components, key);
      const isSelected = key === selected;
      return (
        <QuestionnaireElement
          key={key}
          id={key}
          name={components[key].name}
          type={components[key].type}
          label={components[key].label}
          selected={isSelected}
          onClickElement={event => this.handleElementSelect(event, key)}
          onClickDetail={event => this.handleOpenElementDetail(event, key)}
        >
          {subTree}
        </QuestionnaireElement>
      );
    }, {});
  }

  render() {
    const { locale, components, questionnaire } = this.props;
    const tree = this.renderComponentsByParent(components, questionnaire.id);
    let typeLocaleCurrentElement;
    let labelElementModal = '';
    if (components && this.state.idElementInModal) {
      switch (components[this.state.idElementInModal].type) {
        case SEQUENCE:
          typeLocaleCurrentElement = locale.sequence;
          break;
        case QUESTION:
          typeLocaleCurrentElement = locale.question;
          break;
        default:
          typeLocaleCurrentElement = '';
          break;
      }

      labelElementModal = `${typeLocaleCurrentElement} ${components[this.state.idElementInModal].name}`;
    }

    return (
      <div id="questionnaire">
        <div id="questionnaire-head">
          <h4>{questionnaire.label}</h4>
          <div>
            <button className="btn-yellow" onClick={this.handleOpenQuestionnaireDetail}>{locale.showDetail}</button>
          </div>
        </div>
        <div id="questionnaire-items">
          {tree}
        </div>
        <ReactModal
          isOpen={this.state.showQuestionnaireModal}
          onRequestClose={this.handleCloseQuestionnaireDetail}
          contentLabel={locale.questionnaireDetail}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{locale.questionnaireDetail}</h3>
              <button onClick={this.handleCloseQuestionnaireDetail}><span>X</span></button>
            </div>
            <div className="popup-body">
              <QuestionnaireEditContainer
                id={questionnaire.id}
                onCancel={this.handleCloseQuestionnaireDetail}
                onSuccess={this.handleQuestionnnarieUpdated}
              />
            </div>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={this.state.showElementModal}
          onRequestClose={this.handleCloseElementDetail}
          contentLabel={labelElementModal}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{labelElementModal}</h3>
              <button onClick={this.handleCloseElementDetail}><span>X</span></button>
            </div>
            <div className="popup-body">
              {labelElementModal}
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Questionnaire;
