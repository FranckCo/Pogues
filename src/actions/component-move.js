import { isSubSequence, isSequence } from 'utils/component/component-utils';
import { getClosestComponentIdByType } from 'utils/model/generic-input-utils';
import { getDragnDropLevel } from 'utils/component/component-dragndrop-utils';
import { resetAllWeight, increaseWeightOfAll } from './component-update';
import { moveQuestionToSubSequence, moveQuestionAndSubSequenceToSequence } from './component-insert';

/**
 * This method will get the new weight and new parent if based on the dragndrop level
 * 
 * @param {object} activesComponents The list of components currently displayed
 * @param {object} droppedComponent the dropped component
 * @param {object} draggedComponent the dragged component
 * @param {number} dragndropLevel The level at which we want to drag the component
 */
export function getWeightAndParentId(activesComponents, droppedComponent, draggedComponent, dragndropLevel) {
  const getPreviousSibling =
    activesComponents[getClosestComponentIdByType(activesComponents, droppedComponent, draggedComponent.type)];

  let result;
  switch (dragndropLevel) {
    case -2:
      result = { newWeight: getPreviousSibling.weight + 1, newParentComponentId: getPreviousSibling.parent };
      break;
    case -1:
      if (getPreviousSibling) {
        result = { newWeight: getPreviousSibling.weight + 1, newParentComponentId: getPreviousSibling.parent };
      } else {
        result = { newWeight: droppedComponent.weight + 1, newParentComponentId: droppedComponent.parent };
      }
      break;
    case 1:
      result = { newWeight: 0, newParentComponentId: droppedComponent.id };
      break;
    default:
      result = { newWeight: droppedComponent.weight + 1, newParentComponentId: droppedComponent.parent };
      break;
  }
  return result;
}

/**
  * Method used for the Drag&Drop behavior. Based on the dragged component, 
  * we will updated the new parent, the parent, the previous and/or new siblings
  * 
  * @param {object} activesComponents The list of components currently displayed
  * @param {string} moveComponentId The id of the dragged component
  * @param {string} newParentComponentId the id of the target component, 
  * @param {number} newWeight the new weight of dragged component in the target component
  */
export function moveComponent(activesComponents, droppedComponent, draggedComponent) {
  const dragndropLevel = getDragnDropLevel(droppedComponent, draggedComponent);
  const moveComponentId = draggedComponent.id;

  const { newWeight, newParentComponentId } = getWeightAndParentId(
    activesComponents,
    droppedComponent,
    draggedComponent,
    dragndropLevel
  );

  let moves = {
    ...activesComponents,
  };

  /**
   * We update the parent and weight of the dragged component
   */
  const componentToMove = {
    ...moves[moveComponentId],
    parent: newParentComponentId,
    weight: newWeight,
  };

  moves[componentToMove.id] = componentToMove;

  const oldParent = activesComponents[activesComponents[moveComponentId].parent];

  /**
   * If the dragndrop level is < 0, we should call first the method used to insert 
   * a SUBSEQUENCE or a SEQUENCE when another component is active
   */
  if (dragndropLevel < 0) {
    if (isSubSequence(componentToMove)) {
      moves = {
        ...moves,
        ...moveQuestionToSubSequence(moves, droppedComponent, componentToMove, true),
      };
    } else if (isSequence(componentToMove)) {
      moves = {
        ...moves,
        ...moveQuestionAndSubSequenceToSequence(moves, droppedComponent, componentToMove),
      };
    }
  }
  /** 
    * If the source and target parent component is the same, only we need 
    * to update the weight of the children
    */
  if (newParentComponentId === oldParent.id && dragndropLevel >= 0) {
    return {
      ...moves,
      ...resetAllWeight({
        ...moves,
        ...increaseWeightOfAll(moves, componentToMove),
      }),
    };
  }

  if (newParentComponentId !== oldParent.id) {
    moves = {
      ...moves,
      [newParentComponentId]: {
        ...moves[newParentComponentId],
        children: [...moves[newParentComponentId].children, moveComponentId],
      },
      [oldParent.id]: {
        ...oldParent,
        children: oldParent.children.filter(id => id !== moveComponentId),
      },
    };
  }

  /**
   * We now update the weight of all the siblings components
   */
  moves = {
    ...moves,
    ...increaseWeightOfAll(moves, componentToMove),
  };

  /**
   * We finish by reset all weight in order to all children starting with weight=0, and 
   * for all next children, the weigt should equal to weight+1
   */
  return {
    ...moves,
    ...resetAllWeight(moves),
  };
}
