import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';

import Dictionary from 'utils/dictionary/dictionary';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultExternalVariableForm } from 'utils/transformation-entities/external-variable';
import Input from 'layout/forms/controls/input';
import { name as validateName, nameSize } from 'layout/forms/validation-rules';

function validationExternalVariable(values, addedItems) {
  const { name, label } = values;
  const addedItemsNames = addedItems.map(cv => cv.name);
  const errors = [];
  const invalidName = validateName(name);
  const tooLongName = nameSize(name);

  if (invalidName) errors.push(invalidName);
  if (tooLongName) errors.push(tooLongName);
  if (name === '') errors.push(Dictionary.validation_externalvariable_name);
  if (label === '') errors.push(Dictionary.validation_externalvariable_label);
  if (addedItemsNames.indexOf(name) !== -1) errors.push(Dictionary.validation_externalvariable_existing);

  return errors;
}

function InputExternalVariable() {
  return (
    <div>
      <Field name="label" type="text" component={Input} label={Dictionary.label} required />
      <Field name="name" type="text" component={Input} label={Dictionary.name} required />
    </div>
  );
}
class ExternalVariables extends Component {
  static selectorPath = 'externalVariables';

  render() {
    const { externalVariables, ...initialInputValues } = defaultExternalVariableForm;
    const inputExternalVariableView = <InputExternalVariable />;

    return (
      <FormSection name={ExternalVariables.selectorPath} className="external-variables">
        <ListEntryFormContainer
          inputView={inputExternalVariableView}
          initialInputValues={initialInputValues}
          selectorPath={ExternalVariables.selectorPath}
          validationInput={validationExternalVariable}
          listName="externalVariables"
          submitLabel="addExternalVariable"
          noValueLabel="noExternalVariablesYet"
          showDuplicateButton={false}
        />
      </FormSection>
    );
  }
}
export default ExternalVariables;
