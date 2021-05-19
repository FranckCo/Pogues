import {
  getUnitsList,
  getSeries,
  getOperations,
  getCampaigns,
} from 'utils/remote-api';

export const LOAD_METADATA_SUCCESS = 'LOAD_METADATA_SUCCESS';
export const LOAD_METADATA_FAILURE = 'LOAD_METADATA_FAILURE';
const LOAD_SERIES = 'LOAD_SERIES';
const LOAD_UNITS = 'LOAD_UNITS';
const LOAD_OPERATIONS = 'LOAD_OPERATIONS';
const LOAD_CAMPAIGNS = 'LOAD_CAMPAIGNS';

export const loadMetadataSuccess = (type, metadata) => {
  const metadataByTypeStore = metadata.reduce((acc, m) => {
    return {
      ...acc,
      [m.id]: m,
    };
  }, {});

  return {
    type: LOAD_METADATA_SUCCESS,
    payload: {
      type,
      metadataByTypeStore,
    },
  };
};

export const loadMetadataFailure = err => ({
  type: LOAD_METADATA_FAILURE,
  payload: err,
});

// Metadata units

/**
 * Load units
 *
 * Asyc action that fetch the units list
 *
 * @return  {function}  Thunk which may dispatch LOAD_METADATA_SUCCESS or LOAD_METADATA_FAILURE
 */
export const loadUnits = token => dispatch => {
  dispatch({
    type: LOAD_UNITS,
    payload: null,
  });
  return getUnitsList(token)
    .then(listUnits => {
      const units = listUnits.map(u => ({
        id: u.uri,
        uri: u.uri,
        label: u.label,
      }));
      return dispatch(loadMetadataSuccess('units', units));
    })
    .catch(err => dispatch(loadMetadataFailure(err)));
};

export const loadUnitsIfNeeded = token => (dispatch, getState) => {
  const state = getState();
  const { units } = state.metadataByType;
  if (!units) dispatch(loadUnits(token));
};

// Metadata series

export const loadSeries = token => dispatch => {
  dispatch({
    type: LOAD_SERIES,
    payload: null,
  });

  return getSeries(token)
    .then(series => {
      const seriesMetadata = series.map(s => ({
        id: s.id,
        value: s.id,
        label: s.label,
      }));
      return dispatch(loadMetadataSuccess('series', seriesMetadata));
    })
    .catch(err => dispatch(loadMetadataFailure(err)));
};

export const loadSeriesIfNeeded = token => (dispatch, getState) => {
  const state = getState();
  const { series } = state.metadataByType;
  if (!series) dispatch(loadSeries(token));
};

// Metadata operations

export const loadOperations = (idSerie, token) => dispatch => {
  dispatch({
    type: LOAD_OPERATIONS,
    payload: null,
  });

  return getOperations(idSerie, token)
    .then(operations => {
      const operationsMetadata = operations.map(o => ({
        id: o.id,
        value: o.id,
        label: o.label,
        serie: o.parent,
      }));
      return dispatch(loadMetadataSuccess('operations', operationsMetadata));
    })
    .catch(err => dispatch(loadMetadataFailure(err)));
};

export const loadOperationsIfNeeded =
  (idSerie = '', token) =>
  (dispatch, getState) => {
    const state = getState();
    const operations = state.metadataByType.operations || {};
    const operationsBySerie = Object.keys(operations).reduce((acc, key) => {
      const operation = operations[key];
      return operation.serie === idSerie ? { ...acc, [key]: operation } : acc;
    }, {});

    if (idSerie !== '' && Object.keys(operationsBySerie).length === 0)
      dispatch(loadOperations(idSerie, token));
  };

// Metadata operations

export const loadCampaigns = (idOperation, token) => dispatch => {
  dispatch({
    type: LOAD_CAMPAIGNS,
    payload: null,
  });

  return getCampaigns(idOperation, token)
    .then(campaigns => {
      const campaignsMetadata = campaigns.map(c => ({
        id: c.id,
        value: c.id,
        label: c.label,
        operation: c.parent,
      }));
      return dispatch(loadMetadataSuccess('campaigns', campaignsMetadata));
    })
    .catch(err => dispatch(loadMetadataFailure(err)));
};

export const loadCampaignsIfNeeded =
  (idOperation, token) => (dispatch, getState) => {
    const state = getState();
    const campaigns = state.metadataByType.campaigns || {};
    const campaignsBySerie = Object.keys(campaigns).reduce((acc, key) => {
      const campaign = campaigns[key];
      return campaign.serie === idOperation ? { ...acc, [key]: campaign } : acc;
    }, {});

    if (idOperation !== '' && Object.keys(campaignsBySerie).length === 0)
      dispatch(loadCampaigns(idOperation, token));
  };
