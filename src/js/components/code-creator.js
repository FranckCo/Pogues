import React, { Component, PropTypes } from 'react';
import { GENERAL } from '../constants/pogues-constants'


/**
 * Simple input field for code creation
 * 
 * Handle enter key events.
 */
export default class CodeCreator extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { locale, hndlEnterKey } = this.props
    return (
      <div className="form-group code">
        <label htmlFor="label" className="col-sm-3 control-label">
          {locale.newCode}
        </label>
        <div className="col-sm-6">
          <input
            id="label"
            className="form-control"
            placeholder={locale.typeNewCode}
            onKeyDown={e => {
              if (e.keyCode !== GENERAL.ENTER_KEY_CODE) return;
              hndlEnterKey(e.target.value)
              e.target.value = ''
            }} />
        </div>
      </div>
    )
  }
}

CodeCreator.propTypes = {
  /**
   * Enter key event handler
   */
  hndlEnterKey: PropTypes.func.isRequired,
  /**
   * Dictionary
   */
  locale: PropTypes.object.isRequired
}