import React from 'react';

import PropTypes from 'prop-types';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import { CODELISTS_ACTIONS } from '../../../constants/pogues-constants';
import Dictionary from '../../../utils/dictionary/dictionary';

const { ACTIONS_CLASS } = WIDGET_CODES_LISTS;

// PropTypes and defaultProps

const propTypes = {
  disabledActions: PropTypes.arrayOf(PropTypes.string),
  actions: PropTypes.shape({
    remove: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    duplicate: PropTypes.func.isRequired,
    moveUp: PropTypes.func.isRequired,
    moveDown: PropTypes.func.isRequired,
    moveLeft: PropTypes.func.isRequired,
    moveRight: PropTypes.func.isRequired,
    precision: PropTypes.func.isRequired,
    setPrecision: PropTypes.func.isRequired,
  }).isRequired,
  allowPrecision: PropTypes.bool,
};

const defaultProps = {
  disabledActions: [],
  allowPrecision: true,
};

// Component

function CodesListsActions({ disabledActions, actions, allowPrecision }) {
  return (
    <div className={ACTIONS_CLASS}>
      {Object.keys(CODELISTS_ACTIONS)
        .filter(
          (actionKey) => allowPrecision || !actionKey.includes('PRECISION'),
        )
        .map((key) => {
          return (
            <button
              key={key}
              type="button"
              onClick={actions[CODELISTS_ACTIONS[key].name]}
              disabled={
                disabledActions.indexOf(CODELISTS_ACTIONS[key].name) !== -1
              }
              title={
                Dictionary[`componentCodeList${CODELISTS_ACTIONS[key].name}`]
              }
            >
              <span className="sr-only">
                {' '}
                {Dictionary[CODELISTS_ACTIONS[key].dictionary]}
              </span>
              <span className={`glyphicon ${CODELISTS_ACTIONS[key].icon}`} />
            </button>
          );
        })}
    </div>
  );
}

CodesListsActions.propTypes = propTypes;
CodesListsActions.defaultProps = defaultProps;

export default CodesListsActions;
