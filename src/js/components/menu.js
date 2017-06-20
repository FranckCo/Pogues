import React, { PropTypes } from 'react';
import { VIEW_TYPE} from '../constants/pogues-constants';
import QuestionnaireTitle from './questionnaire-title'
import Logger from '../logger/logger';
var logger = new Logger('Menu', 'Components');
import { connect } from 'react-redux'
const { QUESTIONNAIRE, PICKER } = VIEW_TYPE
// action creators
import { switchToConfig, switchToPicker } from '../actions/app-state'
import {
  saveQuestionnaire, publishQuestionnaire
} from '../actions/questionnaire.js'
import { setQuestionnaireListFilter } from '../actions/app-state'
import { setQuestionnaireFilter } from '../actions/app-state'
/*
UI component encapsulating the saving questionnaire feature.
*/

function SaveButton({ saveFunction, buttonLabel }) {
  return(
    <div className="nav navbar-nav navbar-left">
      <form className="navbar-form navbar-right">
        <button className="btn btn-primary"
          onClick={e => {e.preventDefault();saveFunction()}}>
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}

SaveButton.propTypes = {
  saveFunction: React.PropTypes.func,
  buttonLabel: React.PropTypes.string
};

/*
UI component encapsulating the publishing of a questionnaire.
*/
function PublishButton({ errors, publishFunction, buttonLabel }) {
  return(
    <div className="nav navbar-nav navbar-left">
      <form className="navbar-form navbar-right">
        <button className="btn btn-primary"
          disabled={errors.length > 0}
          onClick={e => {e.preventDefault();publishFunction()}}
          alt="message">
          {buttonLabel}
        </button>
      </form>
    </div>
  )
}

PublishButton.propTypes = {
  publishFunction: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
};

/*
Link of the published questionnaire
*/
function PublishLink({ publishURL, publishTimestamp }) {
  return(
    <div className="nav navbar-nav navbar-left">
      <form className="navbar-form navbar-right">
          <a href={publishURL} target="_blank">Visualisez !  </a>
          <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
        <small>[ {publishTimestamp} ]</small>
      </form>
    </div>
  )
}

PublishLink.propTypes = {
  publishURL : React.PropTypes.string,
  publishTimestamp : React.PropTypes.string
};

/*
SearchField
*/
function SearchField ({ filter, handleChange, locale }) {
  return (
    <div className="navbar-form navbar-left" role="search">
      <div className="form-group">
        <input
          type="text" className="form-control" placeholder={locale.search}
          value={filter}
          onChange={e => handleChange(e.target.value)}/>
      </div>
    </div>
  )
}
SearchField.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

/*
ConfigButton
 */
function ConfigButton({ clickToEditConfig }) {
  return (
    <li className="navbar-form">
      <button className="btn btn-default" onClick={clickToEditConfig}>
        <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
      </button>
    </li>
  )
}
ConfigButton.propTypes = {
  clickToEditConfig: PropTypes.func.isRequired
}
/*
Menu Component, shared between all views.
*/
//TODO saveButton and publishButton should be connected to the store to retrieve
// the questionnaire id (for now there's an `id` property in props that is not
// set if we are not in questionnaire view)

//TODO find a cleaner way to manage the rendering of the menu based on the type
//of view (migh be in the `connect` phase)

//TODO refactor
function Menu({
  id, view, url, timestamp, filter,
  goHome, handleQuestionnaireFilter, handleQuestionnaireListFilter, errors,
  clickToSave, clickToPublish, clickToEditConfig, locale }) {
  logger.info('Rendering the menu for the view : ' + view);
  // TODO: handle connected user properly
  let handleFilter, searchField
  // child components, depending of the view (undefined when not relevant)
  let saveButton, publishButton, publishLink, questionnaireTitle
  const configButton = <ConfigButton clickToEditConfig={clickToEditConfig} />
  if (view === QUESTIONNAIRE) {
    handleFilter = filter => handleQuestionnaireFilter(id, filter)
    saveButton = <SaveButton saveFunction={() => clickToSave(id)}
                    buttonLabel={locale.save}/>
    publishButton = <PublishButton publishFunction={() => clickToPublish(id)}
                      buttonLabel={locale.publish} errors={errors}/>
    questionnaireTitle = <QuestionnaireTitle />
  } else {
    handleFilter = handleQuestionnaireListFilter
    questionnaireTitle = <span className="navbar-text">{locale.tagline}</span>
  }
  if (view === QUESTIONNAIRE || view === PICKER) {
    searchField = <SearchField filter={filter}
      handleChange={handleFilter} locale={locale} />
  }
  publishLink = url ?
    <PublishLink publishURL={url} publishTimestamp={timestamp}/> : ''

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">
              Toggle navigation
            </span>
          </button>
          <a href="#" className="navbar-brand" onClick={goHome}>
            <span className="pogues-logo font-effect-shadow-multiple">
              pogues
            </span>
          </a>
        </div>
        <div className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1">
          { questionnaireTitle }
          { searchField }
          { saveButton }
          { publishButton }
          { publishLink }
          <ul className="nav navbar-nav navbar-right">
            { configButton }
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown"
                role="button" aria-expanded="false">
                User
              <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">Disconnect</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

Menu.propTypes = {
  id: PropTypes.string,
  goHome: PropTypes.func.isRequired,
  filter: PropTypes.string,
  errors: PropTypes.array,
  handleQuestionnaireFilter: PropTypes.func.isRequired,
  handleQuestionnaireListFilter: PropTypes.func.isRequired,
  clickToSave: PropTypes.func.isRequired,
  clickToPublish: PropTypes.func.isRequired,
  clickToEditConfig: PropTypes.func.isRequired,
  url: PropTypes.string,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { locale, appState: { view } } = state
  if (view === QUESTIONNAIRE) {
    const qrId = state.appState.questionnaire
    const errors = state.integrity.errors
    const qrState = state.appState.questionnaireById[qrId]
    const { filter, url, timestamp } = qrState
    return {
      id: qrId,//TODO id is set in app state only on questionnaire view
      filter,
      view,
      errors,
      url,
      timestamp,
      locale
    }
  }
  else if (view === PICKER) {
    const filter = state.appState.questionnaireListFilter
    return {
      filter,
      locale
    }
  }
  else return {
    locale
  }
}

const mapDispatchToProps = {
  goHome: switchToPicker,
  handleQuestionnaireFilter: setQuestionnaireFilter,
  handleQuestionnaireListFilter: setQuestionnaireListFilter,
  clickToSave: saveQuestionnaire,
  clickToPublish: publishQuestionnaire,
  clickToEditConfig: switchToConfig
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
