/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  COMPONENT_TYPE,
  TABS_PATHS,
  TargetMode,
} from '../../../constants/pogues-constants';
import GenericOption from '../../../forms/controls/generic-option';
import ListCheckboxes from '../../../forms/controls/list-checkboxes';
import Dictionary from '../../../utils/dictionary/dictionary';
import { updateNameField } from '../../../utils/utils';
import { AssociatedFields } from '../../associated-fields';
import { Tab, Tabs } from '../../tabs';
import Declaration from './declarations';
import LoopNewEdit from './loop-new-edit';

export const RoundaboutNewEdit = ({
  form,
  componentId,
  errorsIntegrityByTab,
  addSubformValidationErrors,
  buttonRef,
  handleDisableValidation,
  componentsStore,
  InitialMember,
  scopes,
}) => {
  const { ROUNDABOUT } = COMPONENT_TYPE;

  return (
    <>
      <AssociatedFields
        formName={form}
        fieldOrigin={{ name: 'label', label: Dictionary.label }}
        fieldTarget={{ name: 'name', label: Dictionary.name }}
        action={updateNameField}
        focusOnInit
        onEnter={() => {
          buttonRef.click();
        }}
        handleDisableValidation={handleDisableValidation}
        targetIsRichTextarea={false}
        targetIsQuestion={false}
      />
      <Field
        name="TargetMode"
        component={ListCheckboxes}
        label={Dictionary.collectionMode}
        inline
      >
        {TargetMode.map(s => (
          <GenericOption key={s.value} value={s.value}>
            {s.label}
          </GenericOption>
        ))}
      </Field>
      <Tabs componentId={componentId}>
        <Tab
          label={Dictionary.loop}
          path={TABS_PATHS.LOOP}
          key={TABS_PATHS.LOOP}
        >
          <LoopNewEdit
            form={form}
            componentsStore={componentsStore}
            componentType={ROUNDABOUT}
            InitialMember={InitialMember}
            scopes={scopes}
          />
        </Tab>
        <Tab
          label={Dictionary.declaration_tabTitle}
          path={TABS_PATHS.DECLARATIONS}
          key={TABS_PATHS.DECLARATIONS}
        >
          <Declaration
            showPosition={false}
            errors={errorsIntegrityByTab[TABS_PATHS.DECLARATIONS]}
            addErrors={addSubformValidationErrors}
          />
        </Tab>
      </Tabs>
    </>
  );
};

RoundaboutNewEdit.propTypes = {
  componentId: PropTypes.string.isRequired,
  errorsIntegrityByTab: PropTypes.object,
  addSubformValidationErrors: PropTypes.func.isRequired,
  buttonRef: PropTypes.object.isRequired,
  handleDisableValidation: PropTypes.func.isRequired,
  componentsStore: PropTypes.object,
  InitialMember: PropTypes.string,
  scopes: PropTypes.array.isRequired,
  form: PropTypes.string,
};

RoundaboutNewEdit.defaultProps = {
  InitialMember: undefined,
  form: undefined,
};
