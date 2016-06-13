import { uuid } from '../utils/data-utils'

import { COMPONENT_TYPE } from '../constants/pogues-constants'

const { QUESTION, SEQUENCE } = COMPONENT_TYPE
import { removeLeading_ } from '../utils/data-utils'


/**
 * Creates an update to apply to the reducer when receiving a questionnaire
 *
 * model is a representation of a questionnaire
 * 
 * @param  {object} qr questionnaire description (from remote API)
 * @return {object}    update to merge into the reducer to import
 *                              this questionnaire
 */
export default function toState(_model) {
  // We use a closure around ...ById to avoid repetition
  const model = removeLeading_(_model)
  const componentById = {}
  const controlById = {}
  const goToById = {}
  const declarationById = {}
  const codeListById = {}
  const codeById = {}
  const responseById = {}

  const { agency, survey, componentGroups, codeLists } =  model
  

  const id = toComponent(model) // id === model.id

  const questionnaire = {
    id, agency, survey, componentGroups,
    codeLists: {
      //TODO implement codeListSpecification
      codeListSpecification: codeLists.codeListSpecification,
      codeList: codeLists.codeList.map(toCodeList)
    }
  }

  return {
    questionnaire,
    componentById,
    goToById,
    declarationById,
    controlById,
    codeListById,
    codeById,
    responseById
  }

  function toComponent(cmpnt) {
    const { id, name, label, declarations, goTos, controls, type } = cmpnt

    // mutations are ok here
    componentById[id] = {
      id, name,
      label: label[0],
      declarations: declarations.map(toDeclaration),
      goTos: goTos.map(toGoTo),
      controls: controls.map(toControl),
    }
    //enhance componentById[_id] to make it a question or a sequence}
    if (type === 'SequenceType') toSequence(cmpnt) 
    else toQuestion(cmpnt)
    return id
  }

  function toSequence(sequence) {
    const { id, genericName, depth, children } = sequence
    componentById[id] = {
      ...componentById[id],// already a component
      genericName,
      depth, //TODO do we keep track of depth ?
      type: SEQUENCE,
      childCmpnts: children.map(toComponent)
    }
    return id
  }

  function toQuestion(question) {
    //TODO solve unconsistencies between QuestionType/SequenceType in the model
    //and QUESTION and SEQUENCE constants elsewhere in Pogues
    const { id, simple, responses } = question
    componentById[id] = {
      ...componentById[id],// already a component
      simple,
      responses: responses.map(toResponse), //TODO implement responses
      type: QUESTION
    }
    return id
  }

  function toResponse(response) {
    const { simple, mandatory, codeListReference, datatype } = response
    const id = uuid()
    responseById[id] = {
      id, simple, mandatory, codeListReference, datatype
    }
    return id
  }

  function toGoTo(goTo) {
    const { id, description, expression, ifTrue } = goTo
    goToById[id] = {
      id, description, expression, ifTrue,
    }
    return id
  }

  function toControl(ctrl) {
    const { id, description, expression, failMessage, criticity } = 
      ctrl
    controlById[id] = {
      id, description, expression, failMessage, criticity
    }
    return id
  }

  function toDeclaration(dcl) {
    const { type, text } = dcl
    const id = uuid()
    declarationById[id] = {
      id, type, text,
      disjoignable: true, //TODO not implemented yet in the backend
    }
    return id
  }

  //TODO check if code list ids are unique (not the same id in different
  //questionnaire)
  function toCodeList(cl) {
    const { id, name, label, codes } = cl
    const clState = {
      id, name, label,
      codes: codes.map(toCode)
    }
    //HACK for now, it's not possible to distinguish between code list created
    //by the user from code list that come from code list specification when
    //we load the questionnaire.
    if (name.startsWith('cl_')) {
      clState.spec = true
      clState.loaded = true
    }
    codeListById[id] = clState
    return id
  }

  function toCode(code) {
    const { label, value } = code
    const id = uuid()
    codeById[id] = {
      id, label, value
    }
    return id
  }
}
