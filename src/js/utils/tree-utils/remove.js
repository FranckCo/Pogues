import { COMPONENT_TYPE } from '../../constants/pogues-constants'
const { QUESTION, SEQUENCE } = COMPONENT_TYPE

/**
 * Remove a component but keep its children
 *
 * It returns all the components to keep after the removal : all the components
 * except the one which has just been removed. Each component impacted by the
 * removal will have its childCmpnts property updated.
 *
 * The children of the removed component will be moved upper in the
 * questionnaire (special rules implemented by `moveChildren`)
 *
 * `cmpnts` will not be modifed, so we do not need to make a copy of it before
 * calling this function.
 *
 * This function will be call recursively : we mutate cmpntsUpdated to avoid
 * useless copies of it, but the function returns cmpntsUpdated for the sake
 * of clarity and to keep track of the result of the higher call to this
 * function (we could easily not mutate cmpntsUpdated, and make a copy of it
 * everytime this function is called, but it seems to be a sub optimal option
 * since all the mutations happen within `removeCmpntSmart` (and do not affect
 * the outside world).
 *
 * @param  {string} main          main sequence
 * @param  {string} id            id of the component to remove
 * @param  {object} cmpnts        dictionary of all the components
 * @param  {object} cmpntsUpdated dictionary with all the components to keep
 * @return {object}               the copy of all the components kept
 */
export function removeComponent(main, id, cmpnts, cmpntsUpdated={}) {
  // If cmpntsUpdated is unitialized, we are dealing with the root of the
  // questionnaire
  //Safety check, it shouldn't happen...
  if (main === id) throw 'Cannot remove main sequence'
  // since if we reached `main`, we have to keep it :
  cmpntsUpdated[main] = {
    ...cmpnts[main]
  }
  // `main` can be a question since removeComponent is called recursively.
  // If main is a question, we're dealing with a leaf, and there is nothing to
  // do (if we reached a leaf, it means we have to keep it, since the condition
  // is checked when dealing with the parent)
  if (cmpnts[main].type === QUESTION) return cmpntsUpdated
  // `main`is a sequence
  // We will rebuild its children and we will update `cmpntsUpdated` by adding
  // all the children we need to keep (ie all the children except one if the
  // component to remove belongs to this sequence)
  // We need to initialize the childCmpnts array since it can be updated later
  // by `keepChildren`.
  cmpntsUpdated[main].childCmpnts = []

  cmpnts[main].childCmpnts.reduce(
    (after, child) => { // after holds the children
      // We drop the child if it's the component we're looking for, but we
      // keep its children
      if (child === id) {
        // We ignore the child. It won't be added to childCmpnts and to
        // cmpntsUpdated, but its own children need to be kept, and added at the
        // right place before in the hiearchy (parent or previous sibling)
        const childCmpnt = cmpnts[child]
        // If it is a question, not adding it to its parent's children and to
        // cmpntsUpdated is enought to remove it
        if (childCmpnt.type === QUESTION) return after
        // We're dealing with a sequence, we append its children before in the
        // hiearchy (special rules depending on the shape of sequence and its
        // previous siblings). `after` will be mutated
        moveChildren(main, after, childCmpnt.childCmpnts, cmpnts, cmpntsUpdated)
        return after //component not added
      }
      // We need to keep this child. We add it to `main` children. We call
      // `removeComponent` recursively to deal with situations where the
      // component to remove is in its descendants.
      after.push(child)
      cmpntsUpdated = removeComponent(child, id, cmpnts, cmpntsUpdated)
      return after
    }, cmpntsUpdated[main].childCmpnts)
  return cmpntsUpdated
}

/**
 * Remove a component and all its children ** not used for now **
 *
 * It returns all the components kept after the removal. Each component
 * impacted by the removal will have its childCmpnts property update.
 * `cmpnts` will not be modifed, so we do not need to make a copy of it before
 * calling this function.
 *
 * @param  {string} main          main sequence
 * @param  {string} id            id of the component id to remove
 * @param  {object} cmpnts        dictionary of all the components
 * @param  {object} cmpntsUpdated copy of all the components to keep
 * @return {object}               the copy of all the components kept
 */

export function removeComponentAndChildren(main, id, cmpnts, cmpntsUpdated={}) {
  // The idea : we look for the key recursively. when we find it, we remove the
  // component from its parent, and we do not add this component and its
  // children to the components to be kept.
  //If cmpntsUpdated is unitialized, we are dealing with the main sequence and
  //we need to initialize cmpntsUpdated with this component
  cmpntsUpdated[main] = {
    ...cmpnts[main]
  }
  //Safety check
  if (main === id) throw 'Cannot remove main sequence'
  //main can be a question since removeCmpnt is called recursively
  //If main is a question, we are on a leaf, and there is nothing to do (if we
  //reached a leaf, it means we have to keep it, since the condition is checked
  //when dealing with the parent)
  if (cmpnts[main].type === QUESTION) return cmpntsUpdated
  //We're dealing with a sequence
  cmpntsUpdated[main].childCmpnts = cmpnts[main].childCmpnts.reduce(
    (after, child) => {
      //We ignore the child. It won't be added to childCmpnts and to
      //cmpntsUpdated
      if (child === id) return after //component not added
      after.push(child)
      cmpntsUpdated = removeComponent(child, id, cmpnts, cmpntsUpdated)
      return after
    }, [])
  return cmpntsUpdated
}

/**
 * Move the children of a component which has been removed
 *
 * The children are moved upper in the questionnaire, according to some special
 * rules. These rules were given for questionnaires with only two levels of
 * depth for sequences (sequences and subsequences).
 *
 * Hypotheses (come from specifications):
 * - there cannot be isolated questions after a sequence ;
 * - only two levels of depth for sequences ;
 * - a questionnaire should not start with questions (but it can happen after
 * the removal, so we do not rely on this hypothese).
 *
 */
function moveChildren(parent, parentChildren, ownChildren,
                      cmpnts, cmpntsUpdated) {

  // We're looking for the closest acceptable parent
  const prevSibling = cmpntsUpdated[parentChildren.slice(-1).pop()]

  if (!prevSibling || prevSibling.type === QUESTION) {
    // No sequence to hold the children of the removed sequence
    // We append directly all the children to the parent sequence. In this case,
    // we do not differentiate questions and sequences.
    ownChildren.forEach(child => {
      cmpntsUpdated[parent].childCmpnts.push(child)
      copyCmpnts(child, cmpnts, cmpntsUpdated)
    })
  }
  else {
    // We have a proper sequence where to move all the children of the removed
    // component. Depending of the child type (question or sequence), we will
    // append it to the 'closest' sequence (question) or directly to the
    // previousSibling children (sequence).
    ownChildren.forEach(child => {
      const childCmpnt = cmpnts[child]
      if (childCmpnt.type === QUESTION) {
        // We're dealing with a question, we will try to move it to the
        // 'closest' sequence (ie the last sequence opened in the previous
        // sibling).
        const lastInPrevSibling =
          cmpntsUpdated[prevSibling.childCmpnts.slice(-1).pop()]
        if (lastInPrevSibling && lastInPrevSibling.type === SEQUENCE) {
          // PrevSibling ends with a sequence, we append to this sequence.
          lastInPrevSibling.childCmpnts.push(child)
        }
        else {
          // The previousChild does not end with a sequence which could hold
          // this question, so we append it directly to the previous sibling's
          // children.
          prevSibling.childCmpnts.push(child)
        }
      }
      else {
        // We're dealing with a sequence, we move it at the end of the previous
        // sibling.
        prevSibling.childCmpnts.push(child)
      }
      copyCmpnts(child, cmpnts, cmpntsUpdated)
    })
  }
}
/**
 * Make a copy of a component and its children
 *
 * Copy a component and all its children from an initial dictionary of
 * components to an updated dictionary of components. Used as a utility function
 * to make deep copy of the components reducer entries.
 *
 * @param  {[type]} child         [description]
 * @param  {[type]} cmpnts        [description]
 * @param  {[type]} cmpntsUpdated [description]
 * @return {[type]}               [description]
 */
function copyCmpnts(child, cmpnts, cmpntsUpdated) {
  cmpntsUpdated[child] = cmpnts[child]
  if (cmpnts[child].type === SEQUENCE) {
    cmpnts[child].childCmpnts.forEach(childChild =>
      copyCmpnts(childChild, cmpnts, cmpntsUpdated))
  }
}
