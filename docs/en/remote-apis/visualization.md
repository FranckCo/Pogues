# Visualize questionnaires

This service takes a questionnaire description and returns an URL to visualize the questionnaire.

## Configuration

URL and path for this service are configured in [src/js/config/config.js](https://github.com/InseeFr/Pogues/blob/master/src/js/config/config.js), with `baseURL` and `stromaePath` entries. 

## JSON representation

The questionnaires are serialized in `Hson` and comply to the [schema](/remote-apis/schema.md). Read more about [JSON representation of questionnaires](/remote-apis/questionnaire-json.md).