import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { toComponents, isQuestion, isSubSequence, isSequence, toId } from 'utils/component/component-utils';
import { getClosestComponentIdByType } from 'utils/model/generic-input-utils';
import { resetWeight, increaseWeightOfAll, resetChildren } from './component-update';
import { uuid } from 'utils/data-utils';
import { updateNewComponentParent } from 'utils/model/form-to-state-utils';
import * as _ from 'lodash';

const { SEQUENCE } = COMPONENT_TYPE;

/**
 * This method is used for updating elements when some of them become a children of the new one
 * We will update the parent property of this children, and the children property of the prent
 * 
 * @param {object[]} componentsToMove The list of component that should be moved to the new Parent
 * @param {object} newParent The component will be used as Parent element
 */
export function moveComponents(componentsToMove, newParent, keepChildren) {
  let move = {};
  if (componentsToMove) {
    move = {
      ...componentsToMove.reduce((acc, c) => {
        return {
          ...acc,
          [c.id]: {
            ...c,
            parent: newParent.id,
          },
        };
      }, {}),
      [newParent.id]: {
        ...newParent,
        children: !keepChildren ? toId(componentsToMove) : [...newParent.children, ...toId(componentsToMove)],
      },
    };
  }
  return move;
}

/**
 * This is method is only executed when we want to add a new SUBSEQUENCE when the current
 * selected component is a QUESTION. We have to move the next question to the newly created
 * SUBSEQUENCE
 * 
 * @param {object} activesComponents The list of components currently displayed
 * @param {string} selectedComponentId The Id of the currently selected component
 * @param {object} newComponent The new component (normally a SUBSEQUENCE)
 */
export function moveQuestionToSubSequence(activesComponents, selectedComponent, newComponent, keepChildren) {
  const oldParent = activesComponents[selectedComponent.parent];

  if (!oldParent) {
    return;
  }
  let questionsToMove = toComponents(oldParent.children, activesComponents).filter(
    child =>
      ((!keepChildren && child.weight === selectedComponent.weight + 1) ||
        (keepChildren && child.weight > selectedComponent.weight)) &&
      isQuestion(child)
  );

  const questionsToMoveId = toId(questionsToMove);
  let moves = activesComponents;
  if (questionsToMove.length > 0) {
    const newChildren = oldParent.children.filter(child => questionsToMoveId.indexOf(child) < 0);
    questionsToMove = questionsToMove.map((question, i) => {
      question.weight = !keepChildren ? 0 : newComponent.children.length + i;
      return question;
    });

    moves = {
      ...moves,
      ...moveComponents(questionsToMove, newComponent, keepChildren),
      [oldParent.id]: {
        ...oldParent,
        children: newChildren,
      },
    };
    if (isSubSequence(oldParent)) {
      moves = {
        ...moves,
        ...resetWeight(newChildren.map(id => activesComponents[id])),
      };
      moves = {
        ...moves,
        ...increaseWeightOfAll(moves, newComponent),
      };
    }
  }
  return moves;
}

/**
 * This method is executed when we want to add a Sequence from a Question or a SubSequence
 * Normally this method is only executed when
 *  - the new component is a SEQUENCE
 *  - the currently selected component is a QUESTION
 * 
 * @param {object} activesComponents The list of components currently displayed
 * @param {string} selectedComponentId  The ID of the selected component
 * @param {object} newComponent The latests created component
 */
export function moveQuestionAndSubSequenceToSequence(activesComponents, selectedComponent, newComponent) {
  const oldParent = selectedComponent ? activesComponents[selectedComponent.parent] : false;

  if (!oldParent) {
    return;
  }

  /**
   * We get the list of components of the parent of the selected element
   */
  const listOfComponent = oldParent.children.map(id => activesComponents[id]);

  /**
   * Based on this list, we fetch only the component to move, 
   * and we construct an array with the new parent (the sequence)
   */
  let listOfComponentsToMove = listOfComponent
    .filter(child => child.weight > selectedComponent.weight)
    .reduce((acc, component, i) => {
      return acc.concat([
        {
          ...component,
          weight: i + newComponent.children.length,
          parent: newComponent.id,
        },
      ]);
    }, []);

  /**
   * List of components that should stay in the previous parent
   */
  const listOfComponentsToKeep = listOfComponent.filter(child => child.weight <= selectedComponent.weight);

  /**
   * We move up to the root Sequence
   */
  const parentSequence = activesComponents[getClosestComponentIdByType(activesComponents, selectedComponent, SEQUENCE)];

  /**
   * We move up to the first non-sequence element, starting from the SEQUENCE
   */
  let component = selectedComponent;
  while (component.parent && !isSequence(activesComponents[component.parent])) {
    component = activesComponents[component.parent];
  }

  /**
   * We merge the previous list of component with the children of the SEQUENCE
   */
  if (isSubSequence(oldParent)) {
    listOfComponentsToMove = [
      ...listOfComponentsToMove,
      ...parentSequence.children.map(c => activesComponents[c]).filter(c => c.weight > component.weight).map((c, i) => {
        return {
          ...c,
          weight: i + newComponent.children.length + listOfComponentsToMove.length,
        };
      }),
    ];
  }

  /**
   * And we reset the weight of all component
   */
  listOfComponentsToMove = resetWeight([
    ...toComponents(newComponent.children, activesComponents),
    ...listOfComponentsToMove,
  ]);

  const moves = {
    ...activesComponents,
    ...moveComponents(Object.keys(listOfComponentsToMove).map(key => listOfComponentsToMove[key]), newComponent),
    ...resetChildren(oldParent, listOfComponentsToKeep),
    ...resetChildren(
      parentSequence,
      toComponents(parentSequence.children, activesComponents).filter(c => c.weight <= component.weight)
    ),
  };

  return {
    ...moves,
    ...increaseWeightOfAll(moves, newComponent),
  };
}

/**
 * Method used for creating a duplicate of an existing QUESTION
 * 
 * @param {object} activesComponents The list of components currently displayed
 * @param {string} idComponent id of the component we want to duplicate
 */
export function duplicate(activesComponents, idComponent) {
  if (!isQuestion(activesComponents[idComponent])) {
    return {};
  }

  const id = uuid();
  const component = {
    [id]: {
      ..._.cloneDeep(activesComponents[idComponent]),
      id,
      weight: activesComponents[idComponent].weight + 1,
    },
  };
  return {
    ...component,
    ...updateNewComponentParent(activesComponents, activesComponents[idComponent].parent, id),
    ...increaseWeightOfAll(activesComponents, component[id]),
  };
}
