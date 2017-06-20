import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { switchToPicker } from '../actions/app-state'


// function getStateFromStore() {
//   var config = assign({}, ConfigStore.getConfig())
//   config.logLevel = config.log.level
//   config.logActiveNamespaces = config.log.activeNamespaces
//   delete config.log
//   return config
// }

//TODO WIP updates not implemented
function ConfigEditor({ dev, baseURL, poguesPath, stromaePath,
    switchDev, editPoguesPath, editStromaePath, editBaseURL,
    close, locale }) {
  return (
    <div className="container bs-docs-container">
      <div className="col-md-12">
        <h1 className="page-header">{locale.edit_config}</h1>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-4 control-label">{locale.dev}</label>
            <div className="col-sm-8">
              <label className="radio-inline">
                <input type="radio" name="dev" checked={dev}
                  onChange={switchDev}/>{locale.trueWord}
              </label>
              <label className="radio-inline">
                <input type="radio" name="dev" checked={!dev}
                  onChange={switchDev}/>{locale.falseWord}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">{locale.baseURL}</label>
            <div className="col-sm-8">
              <input type="text" placeholder={locale.baseURL}
                value={baseURL}
                onChange={e => editBaseURL(e.target.value)}
                className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">
              {locale.poguesPath}
            </label>
            <div className="col-sm-8">
              <input type="text" placeholder={locale.poguesPath}
                value={poguesPath}
                onChange={e => editPoguesPath(e.target.value)}
                className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">
              {locale.stromaePath}
            </label>
            <div className="col-sm-8">
              <input type="text" placeholder={locale.stromaePath}
                value={stromaePath}
                onChange={e => editStromaePath(e.target.value)}
                className="form-control"/>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={close}>
          {locale.save}
        </button>
      </div>
    </div>
  )
}

ConfigEditor.propTypes = {
  dev: PropTypes.bool.isRequired,
  baseURL: PropTypes.string.isRequired,
  poguesPath: PropTypes.string.isRequired,
  stromaePath: PropTypes.string.isRequired,
  switchDev: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  editPoguesPath: PropTypes.func.isRequired,
  editStromaePath: PropTypes.func.isRequired,
  editBaseURL: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = ({ config }) => {
  return {
    dev: config.dev,
    baseURL: config.baseURL,
    poguesPath: config.poguesPath,
    stromaePath: config.stromaePath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(switchToPicker()),
    switchDev: () => {},
    switchRemote: () => {},
    editPoguesPath: () => {},
    editStromaePath: () => {},
    editBaseURL: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigEditor)
