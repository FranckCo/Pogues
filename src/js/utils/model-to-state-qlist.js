// According to the swagger documentation, qrList is an object with
// questionnaire ids as key, and an object with `id`, `name`, `'label`,
// `agency` and `survey` as values. A survey is made of an `id`, a
// `name` and an `agency`

export function qListToState(model) {
  return model.reduce((update, qr) => {
    const {
       id, name, label, agency,
      survey: {
        id: surveyId,
        name: surveyName, //TODO investigate, survey name seems to be the only
                           //property not prefixed by ``
        agency: surveyAgency
      }
    } = qr
    update[id] = {
      id: id,
      name: name,
      label: label[0], // in the questionnaire list, label is a string not
      label: label, // in the questionnaire list, label is a string not
                    // an array
      agency: agency,
      survey: {
        id: surveyId,
        name: surveyName,
        agency: surveyAgency
      }
    }
    return update
  }, {})
}
