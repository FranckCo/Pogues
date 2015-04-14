var PoguesDispatcher = require('../dispatchers/pogues-dispatcher');
var PoguesConstants = require('../constants/pogues-constants');

var PoguesActions = {
  setLanguage: function (language) {
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.LANGUAGE_CHANGED,
      language: language
    });
  },
  // Questionnaire list loaded or not from the server
  receiveQuestionnaireList: function(data) {
    PoguesDispatcher.handleServerAction({
      actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LIST_LOADED,
      questionnaires: data.questionnaires
    });
  },
  getQuestionnaireList: function () {
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.LOAD_QUESTIONNAIRE_LISTE
    })

  },
  getQuestionnaireListFailed: function(error) {
    PoguesDispatcher.handleServerAction({
      actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LIST_LOADING_FAILED,
      error: error
    });
  },
  // Questionnaire loaded or not from the server
  receiveQuestionnaire: function(data) {
    PoguesDispatcher.handleServerAction({
      actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LOADED,
      questionnaire: data.questionnaire
    });
  },
  getQuestionnaireFailed: function(error) {
    PoguesDispatcher.handleServerAction({
      actionType: PoguesConstants.ActionTypes.QUESTIONNAIRE_LOADING_FAILED,
      error: error
    });
  },
  // Questionnaire created in the questionnaire editor
  createQuestionnaire: function(props) {
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.CREATE_NEW_QUESTIONNAIRE,
      name: props.name,
      label: props.label
    });
  },
  // Questionnaire selected in questionnaire picker
  selectQuestionnaire: function(index) {
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.SELECT_EXISTING_QUESTIONNAIRE,
      index: index
    });
    PoguesActions.switchToQuestionnaire();
  },
  // A Component is added with the GenericInput (spec is {sequence, depth, text})
  addComponent: function(spec) {
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.ADD_COMPONENT,
      spec: spec
    });
  },
  // A Component is made editable
  editComponent: function(id) {
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.EDIT_COMPONENT,
      id : id
    });
  },
  filterComponents: function(filter) {
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.FILTER_COMPONENTS,
      filter: filter
    })
  },
  filterQuestionnaires: function(filter) {
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.FILTER_QUESTIONNAIRES,
      filter: filter
    })
  },
  saveQuestionnaire: function(questionnaire) {
    PoguesDispatcher.handleServerAction({
      actionType: PoguesConstants.ActionTypes.SAVE_QUESTIONNAIRE,
      questionnaire: questionnaire
    });
  },
  switchToQuestionnaire: function() {
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.SWITCH_VIEW_QUESTIONNAIRE
    })
  },
  switchToPicker: function() {
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.SWITCH_VIEW_PICKER
    })
  },
  // Edit the current questionnaire prop giving the prop key and the new value
  editQuestionnaire: function(key, value) {
    console.warn('Edit action. ' + key + ' : ' + value);
    PoguesDispatcher.handleViewAction({
      actionType: PoguesConstants.ActionTypes.EDIT_QUESTIONNAIRE,
      k : key,
      v : value
    });
  }
};

module.exports = PoguesActions;
