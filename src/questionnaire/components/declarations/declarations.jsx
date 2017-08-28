import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import { connect } from 'react-redux';

import Dictionary from 'utils/dictionary/dictionary';
import Select from 'layout/forms/controls/select';
import Textarea from 'layout/forms/controls/rich-textarea';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { declarationsFormDefault } from 'utils/transformation-entities/declaration';
import { formValueSelector } from 'redux-form';

function validationDeclaration(values) {
  const { label } = values;
  const errors = [];

  if (label === '') errors.push(Dictionary.validation_declaration_label);

  return errors;
}

function InputDeclaration({identifier}) {
  const types = [
    {
      value: 'INSTRUCTION',
      label: Dictionary.INSTRUCTION,
    },
    {
      value: 'COMMENT',
      label: Dictionary.COMMENT,
    },
    {
      value: 'HELP',
      label: Dictionary.HELP,
    },
    {
      value: 'WARNING',
      label: Dictionary.WARNING,
    },
  ];

  const positions = [
    {
      value: 'AFTER_QUESTION_TEXT',
      label: Dictionary.dclPosAfterQuestion,
    },
    {
      value: 'AFTER_RESPONSE',
      label: Dictionary.dclPosAfterAnswer,
    },
    {
      value: 'BEFORE_QUESTION_TEXT',
      label: Dictionary.dclPosBeforeText,
    },
    {
      value: 'DETACHABLE',
      label: Dictionary.dclPosDetachable,
    },
  ];

  return (
    <div>
      <Field
        name="label"
        id="declaration_text"
        component={Textarea}
        label={Dictionary.declaration_label}
        buttons
        required
        identifier={identifier}
      />

      <Field name="type" id="declaration_type" component={Select} label={Dictionary.type} options={types} required />

      <Field
        name="position"
        id="declaration_position"
        component={Select}
        label={Dictionary.declaration_position}
        options={positions}
        required
      />
    </div>
  );
}

const mapStateToProps = (state, { formName }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName); 
  return {
    identifier: selector(state, `declarations.ref`),
  };
};

class Declarations extends Component {
  static selectorPath = 'declarations';

  render() {
    const { declarations, ...initialInputValues } = declarationsFormDefault;
    const InputDeclarationView = connect(mapStateToProps)(InputDeclaration);
    const inputDeclarationViewInstance = <InputDeclarationView />;
    return (
      <FormSection name={Declarations.selectorPath} className="declaratations">
        <ListEntryFormContainer
          inputView={inputDeclarationViewInstance}
          initialInputValues={initialInputValues}
          selectorPath={Declarations.selectorPath}
          validationInput={validationDeclaration}
          listName="declarations"
          submitLabel="addDeclaration"
          noValueLabel="noDeclarationYet"
          rerenderOnEveryChange
        />
      </FormSection>
    );
  }
}
export default Declarations;
