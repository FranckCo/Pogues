import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import { RichEditorWithVariable } from '../../../../../forms/controls/control-with-suggestions';
import { toolbarConfigTooltip } from '../../../../../forms/controls/rich-textarea';
import { SelectorView, View } from '../../../../selector-view';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { QUESTION_TYPE_ENUM } from '../../../../../constants/pogues-constants';
import ResponseFormatSimple from '../simple/response-format-simple';
import ResponseFormatSingle from '../single/response-format-single';

const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;

function InputMeasure({ selectorPath }) {
  return (
    <div>
      <Field
        name="label"
        component={RichEditorWithVariable}
        label={Dictionary.measureLabel}
        toolbar={toolbarConfigTooltip}
        required
      />

      <SelectorView label={Dictionary.typeMeasure} selectorPath={selectorPath}>
        <View
          key={SIMPLE}
          value={SIMPLE}
          label={Dictionary.responseFormatSimple}
        >
          <ResponseFormatSimple
            selectorPathParent={selectorPath}
            showMandatory={false}
            required
          />
        </View>
        <View
          key={SINGLE_CHOICE}
          value={SINGLE_CHOICE}
          label={Dictionary.responseFormatSingle}
        >
          <ResponseFormatSingle
            selectorPathParent={selectorPath}
            showMandatory={false}
          />
        </View>
      </SelectorView>
    </div>
  );
}

InputMeasure.propTypes = {
  selectorPath: PropTypes.string.isRequired,
};

export default InputMeasure;
