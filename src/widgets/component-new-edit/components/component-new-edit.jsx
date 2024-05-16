/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { formPropTypes } from 'redux-form';

import { getQuestionnaireScope } from 'widgets/component-new-edit/components/variables/utils-loops';

import { WIDGET_COMPONENT_NEW_EDIT } from 'constants/dom-constants';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import GenericOption from 'forms/controls/generic-option';
import Dictionary from 'utils/dictionary/dictionary';
import { checkVariableNumberStart } from '../utils/component-new-edit-utils';
import { FilterNewEdit } from './filter-new-edit';
import { LoopNewEdit } from './loop-new-edit';
import { QuestionNewEdit } from './question-new-edit';
import { SequenceNewEdit } from './sequence-new-edit';

const { COMPONENT_CLASS, FOOTER, CANCEL, VALIDATE, FOOTERLOOP, DELETE } =
  WIDGET_COMPONENT_NEW_EDIT;
const { QUESTION, LOOP, SEQUENCE, SUBSEQUENCE, FILTER } = COMPONENT_TYPE;

const ComponentNewEdit = ({
  componentType,
  componentId,
  addSubformValidationErrors,
  componentsStore,
  errorsIntegrityByTab,
  handleSubmit,
  submitting,
  form,
  onCancel,
  deleteComponent,
  onSubmit,
  activeQuestionnaire,
  clearSubformValidationErrors,
  externalLoopsStore,
  InitialMember,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [integerVariable, setIntegerVariable] = useState(false);
  const [formData, setFormData] = useState({});
  const [disableValidation, setDisableValidation] = useState(false);
  const buttonRef = useRef(null);

  const handleClosePopup = () => {
    setShowPopup(false);
    setIntegerVariable(false);
  };

  const handleValidate = () => {
    setShowPopup(false);
    onSubmit(formData);
  };

  const handleDisableValidation = isDisable => {
    setDisableValidation(isDisable);
  };

  const checkUnsavedChange = data => {
    setFormData(data);
    if (
      componentType === QUESTION &&
      (data.collectedVariables.name ||
        data.calculatedVariables.name ||
        data.externalVariables.name ||
        data.redirections.label ||
        data.controls.label ||
        data.declarations.label ||
        data.responseFormat.SINGLE_CHOICE.CodesList['input-code']?.value ||
        data.responseFormat.MULTIPLE_CHOICE.PRIMARY.CodesList['input-code']
          ?.value ||
        data.responseFormat.MULTIPLE_CHOICE.MEASURE.CODES_LIST.CodesList[
          'input-code'
        ]?.value ||
        data.responseFormat.TABLE.PRIMARY.CODES_LIST.CodesList['input-code']
          ?.value ||
        data.responseFormat.TABLE.SECONDARY.CodesList['input-code']?.value ||
        data.responseFormat.TABLE.LIST_MEASURE.label)
    ) {
      setShowPopup(true);
    } else if (
      componentType === QUESTION &&
      data.collectedVariables.collectedVariables.length > 0 &&
      checkVariableNumberStart(data.collectedVariables.collectedVariables)
    ) {
      setShowPopup(true);
      setIntegerVariable(true);
    } else {
      onSubmit(data);
    }
  };

  useEffect(() => {
    clearSubformValidationErrors();
  }, [clearSubformValidationErrors]);

  const scopes = [
    getQuestionnaireScope(componentsStore, externalLoopsStore).map(
      iteration => (
        <GenericOption key={`scope-${iteration.id}`} value={iteration.id}>
          {iteration.name}
        </GenericOption>
      ),
    ),
  ];

  return (
    <div className={COMPONENT_CLASS}>
      <form onSubmit={handleSubmit(data => checkUnsavedChange(data))}>
        {componentType === LOOP && (
          <LoopNewEdit
            componentsStore={componentsStore}
            componentType={componentType}
            InitialMember={InitialMember}
            scopes={scopes}
          />
        )}
        {componentType === FILTER && (
          <FilterNewEdit
            componentsStore={componentsStore}
            InitialMember={InitialMember}
          />
        )}
        {(componentType === SEQUENCE || componentType === SUBSEQUENCE) && (
          <SequenceNewEdit
            form={form}
            componentId={componentId}
            errorsIntegrityByTab={errorsIntegrityByTab}
            addSubformValidationErrors={addSubformValidationErrors}
            buttonRef={buttonRef}
            handleDisableValidation={handleDisableValidation}
            activeQuestionnaire={activeQuestionnaire}
          />
        )}
        {componentType === QUESTION && (
          <QuestionNewEdit
            form={form}
            componentId={componentId}
            errorsIntegrityByTab={errorsIntegrityByTab}
            addSubformValidationErrors={addSubformValidationErrors}
            buttonRef={buttonRef}
            handleDisableValidation={handleDisableValidation}
            scopes={scopes}
            dynamiqueSpecified={activeQuestionnaire.dynamiqueSpecified}
            componentsStore={componentsStore}
            activeQuestionnaire={activeQuestionnaire}
          />
        )}
        <div
          className={
            componentType !== LOOP && componentType !== FILTER
              ? FOOTER
              : FOOTERLOOP
          }
        >
          <button
            className={VALIDATE}
            type="submit"
            disabled={submitting || disableValidation}
            ref={buttonRef}
          >
            {Dictionary.validate}
          </button>
          <button className={CANCEL} disabled={submitting} onClick={onCancel}>
            {Dictionary.cancel}
          </button>
          {componentType === LOOP && componentId && (
            <button
              className={DELETE}
              disabled={submitting}
              onClick={deleteComponent}
            >
              {Dictionary.remove}
            </button>
          )}
          {componentType === FILTER && componentId && (
            <button
              className={DELETE}
              disabled={submitting}
              onClick={() => deleteComponent(componentId)}
            >
              {Dictionary.remove}
            </button>
          )}
        </div>
      </form>
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        isOpen={showPopup}
        onRequestClose={handleClosePopup}
        contentLabel="Alert Save"
      >
        <div className="popup-notSaved">
          <div className="popup-header">
            <h3>{Dictionary.saveLowerTitle}</h3>
            <button type="button" onClick={handleClosePopup}>
              <span>X</span>
            </button>
          </div>
          <div className="popup-body">
            {' '}
            {integerVariable ? Dictionary.IsNotLetter : Dictionary.saveLower}
            <div className="popup-notSaved-footer">
              <button
                className="popup-notSaved-footer-cancel"
                type="button"
                onClick={handleClosePopup}
              >
                {Dictionary.back}
              </button>
              <button
                className="popup-notSaved-footer-validate"
                onClick={handleValidate}
                type="button"
              >
                {Dictionary.validateEtat}
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

ComponentNewEdit.propTypes = {
  ...formPropTypes,
  componentType: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
  errorsIntegrityByTab: PropTypes.object,
  componentsStore: PropTypes.object,
  addSubformValidationErrors: PropTypes.func.isRequired,
  clearSubformValidationErrors: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  deleteComponent: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  activeQuestionnaire: PropTypes.object.isRequired,
  externalLoopsStore: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.func.isRequired,
  InitialMember: PropTypes.string,
};

ComponentNewEdit.defaultProps = {
  errorsIntegrityByTab: {},
  componentsStore: {},
  deleteComponent: undefined,
  InitialMember: undefined,
};

export default ComponentNewEdit;
