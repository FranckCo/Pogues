/* eslint-disable no-console */
import React, { useState } from 'react';
import { AntlrEditor } from '@making-sense/antlr-editor';

import * as tools from '@making-sense/vtl-2-0-antlr-tools-ts';
import { getSuggestions } from './vtl-suggestions';

import { CONTROL_VTL_EDITOR } from '../../../../constants/dom-constants';

const { COMPONENT_CLASS } = CONTROL_VTL_EDITOR;

const VTLEditor = ({
  availableSuggestions,
  label,
  input,
  required,
  setDisableValidation,
}) => {
  const [errors, setErrors] = useState([]);
  const variables = availableSuggestions.reduce(
    (acc, s) => ({
      ...acc,
      [s]: { type: 'Variable' },
    }),
    {},
  );

  const customTools = {
    ...tools,
    getSuggestionsFromRange: getSuggestions,
    initialRule: 'expr',
  };

  const { value, onChange, name: id } = input;

  const handleErrors = e => {
    setErrors(e);
    if (setDisableValidation) {
      if (e.length > 0) setDisableValidation(true);
      else setDisableValidation(false);
    }
  };

  const localOnChange = e => {
    onChange(e);
    if (!e) {
      if (setDisableValidation) {
        setDisableValidation(false);
      }
      setErrors([]);
    }
  };

  return (
    <div className={COMPONENT_CLASS}>
      <label htmlFor={id}>
        {label}
        {required && <span className="ctrl-required">*</span>}
      </label>
      <div>
        <div className="editor-container">
          <AntlrEditor
            script={value}
            setScript={localOnChange}
            onListErrors={handleErrors}
            variables={variables}
            variablesInputURLs={[]}
            tools={customTools}
            height="100px"
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              lineNumbers: 'off',
              glyphMargin: false,
              folding: false,
              lineDecorationsWidth: 0,
              lineNumbersMinChars: 0,
              renderLineHighlight: 'none',
            }}
          />
        </div>
      </div>
      <div style={{ color: 'red', display: 'inline-block' }}>
        {value &&
          errors.map(({ line, column, message }) => (
            <div key={`${line}_${column}`} style={{ marginBottom: '20px' }}>
              <div>{`Ligne : ${line} - Colonne : ${column}`}</div>
              <div>{message}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VTLEditor;
