import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import Textarea from 'layout/forms/controls/rich-textarea';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultRedirectionForm } from 'utils/transformation-entities/redirection';

function InputRedirection() {
  return (
    <div>
      <Field type="text" name="label" id="redirection_text" component={Input} label={Dictionary.goTo_label} />
      <Field
        type="text"
        name="condition"
        id="redirection_condition"
        component={Textarea}
        label={Dictionary.expression}
        help
      />
      <Field help type="text" name="cible" id="redirection_cible" component={Input} label={Dictionary.target} />
    </div>
  );
}
class Redirections extends Component {
  static selectorPath = 'redirections';

  render() {
    const { redirections, ...initialInputValues } = defaultRedirectionForm;

    const inputControlView = <InputRedirection />;

    return (
      <FormSection name={Redirections.selectorPath} className="redirections">
        <ListEntryFormContainer
          inputView={inputControlView}
          initialInputValues={initialInputValues}
          selectorPath={Redirections.selectorPath}
          listName="redirections"
          submitLabel="defineGoTo"
          noValueLabel="noGoToYet"
        />
      </FormSection>
    );
  }
}

export default Redirections;
