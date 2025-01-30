import {
  COMPONENT_TYPE,
  DATATYPE_NAME,
  DATATYPE_TYPE_FROM_NAME,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  VARIABLES_TYPES,
} from '../../constants/pogues-constants';
import { uuid } from '../../utils/utils';
import { remoteToState as remoteToStateFormatSimple } from './response-format-simple';

const { COLLECTED } = VARIABLES_TYPES;
const { QUESTION, SEQUENCE, SUBSEQUENCE, LOOP, ROUNDABOUT, EXTERNAL_ELEMENT } =
  COMPONENT_TYPE;
const { TABLE, MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;
const { LIST } = DIMENSION_FORMATS;

export function remoteToStore(
  remote = [],
  responsesByVariable,
  codesListsStore,
  variableclarification,
  arbitraryVariables,
) {
  remote.forEach((variable) => {
    if (variableclarification) {
      const find = variableclarification.find(
        (element) =>
          element.responseclar.Response[0].CollectedVariableReference ===
          variable.id,
      );
      if (find) {
        if (find.type === MULTIPLE_CHOICE) {
          variable.z = parseInt(find.position, 10) + 1;
        } else if (find.type === TABLE) {
          const code = Object.values(
            codesListsStore[find.codelistid].codes,
          ).find((cod) => cod.value === find.position);
          variable.z = code.weight;
          variable.mesureLevel = find.level;
        } else {
          const code = Object.values(
            codesListsStore[find.codelistid].codes,
          ).find((cod) => cod.value === find.position);
          variable.z = code.weight;
        }
      }
    }
    if (arbitraryVariables) {
      const extendedArbitraryVariable = arbitraryVariables.find(
        (arbitraryVariable) =>
          arbitraryVariable.CollectedVariableReference === variable.id,
      );
      if (extendedArbitraryVariable) {
        variable.arbitraryVariableOfVariableId =
          extendedArbitraryVariable.arbitraryVariableOfVariableId;
      }
    }
  });
  return remote.reduce((acc, ev) => {
    const {
      Name: name,
      Label: label,
      CodeListReference,
      z,
      mesureLevel,
      arbitraryVariableOfVariableId,
    } = ev;
    const id = ev.id || uuid();

    const formatSingleRemote = remoteToStateFormatSimple({
      responses: [{ Datatype: ev.Datatype || {}, mandatory: false, id: id }],
    });

    return {
      ...acc,
      [id]: {
        id,
        name,
        label,
        type: formatSingleRemote.type,
        codeListReference: CodeListReference,
        codeListReferenceLabel: CodeListReference
          ? codesListsStore[CodeListReference].label
          : '',
        [formatSingleRemote.type]: formatSingleRemote[formatSingleRemote.type],
        ...responsesByVariable[id],
        z,
        mesureLevel,
        arbitraryVariableOfVariableId,
      },
    };
  }, {});
}
export function remoteToComponentState(remote = []) {
  return remote
    .filter((r) => r.CollectedVariableReference)
    .map((r) => r.CollectedVariableReference);
}

function getQuestionFromSequence(componentsStore, id) {
  const sequenceQuestions = [];
  componentsStore[id].children.forEach((child) => {
    if (componentsStore[child]) {
      if (componentsStore[child].type === QUESTION) {
        sequenceQuestions.push(componentsStore[child]);
      } else {
        componentsStore[child].children.forEach((chil) => {
          sequenceQuestions.push(componentsStore[chil]);
        });
      }
    }
  });
  return sequenceQuestions;
}

function getQuestionFromSubSequence(componentsStore, id) {
  const SubSequenceQuestions = [];
  if (componentsStore[id].children) {
    componentsStore[id].children.forEach((child) => {
      if (componentsStore[child] && componentsStore[child].type === QUESTION) {
        SubSequenceQuestions.push(componentsStore[child]);
      }
    });
  }

  return SubSequenceQuestions;
}

function findQuestionInLoop(componentsStore) {
  const LoopsQuestions = {};
  Object.values(componentsStore)
    .filter((element) => element.type === LOOP || element.type === ROUNDABOUT)
    .forEach((component) => {
      let LoopQuestions = [];
      if (componentsStore[component.initialMember]) {
        if (
          componentsStore[component.initialMember].type === SEQUENCE ||
          componentsStore[component.initialMember].type === EXTERNAL_ELEMENT
        ) {
          for (
            let i = componentsStore[component.initialMember].weight;
            i <= componentsStore[component.finalMember].weight;
            i++
          ) {
            const sequence = Object.values(componentsStore).find(
              (element) => element.type === SEQUENCE && element.weight === i,
            );
            if (sequence) {
              LoopQuestions = LoopQuestions.concat(
                getQuestionFromSequence(componentsStore, sequence.id),
              );
            }
          }
        } else {
          for (
            let i = componentsStore[component.initialMember].weight;
            i <= componentsStore[component.finalMember].weight;
            i++
          ) {
            const subsequence = Object.values(componentsStore).find(
              (element) =>
                element.type === SUBSEQUENCE &&
                element.weight === i &&
                element.parent ===
                  componentsStore[component.initialMember].parent,
            );
            if (subsequence) {
              LoopQuestions = LoopQuestions.concat(
                getQuestionFromSubSequence(componentsStore, subsequence.id),
              );
            }
          }
        }
      }

      LoopsQuestions[component.id] = LoopQuestions;
    });
  return LoopsQuestions;
}

function getCollectedScope(questionsLoop, id, componentsStore) {
  let isfound = {};
  Object.keys(questionsLoop).forEach((key) => {
    questionsLoop[key].forEach((element) => {
      if (element.collectedVariables?.find((collected) => collected === id)) {
        isfound = {
          loop: componentsStore[key],
          component: element,
        };
      }
    });
  });
  return isfound;
}

function getTableDynamique(componentsStore, id) {
  let tableId = '';
  Object.values(componentsStore)
    .filter(
      (components) =>
        components.type === QUESTION &&
        components.responseFormat.type === TABLE &&
        components.responseFormat.TABLE.PRIMARY.type === LIST,
    )
    .map((component) => {
      if (component?.collectedVariables?.includes(id)) {
        tableId = component.id;
      }
      return null;
    });
  return tableId;
}

export function storeToRemote(store, componentsStore) {
  return Object.keys(store).map((key) => {
    const {
      id,
      name: Name,
      label: Label,
      type: typeName,
      codeListReference,
      [typeName]: {
        maxLength: MaxLength,
        pattern: Pattern,
        minimum: Minimum,
        maximum: Maximum,
        decimals: Decimals,
        format: Format,
        isDynamicUnit: IsDynamicUnit,
        unit: Unit,
        miyears: Miyears,
        mimonths: Mimonths,
        mayears: Mayears,
        mamonths: Mamonths,
        mihours: Mihours,
        miminutes: Miminutes,
        mahours: Mahours,
        maminutes: Maminutes,
      },
    } = store[key];

    const model = {
      id,
      Name,
      Label,
      type: COLLECTED,
      Datatype: {
        typeName,
        type: DATATYPE_TYPE_FROM_NAME[typeName],
      },
    };

    const questionsInLoop = findQuestionInLoop(componentsStore);
    const collectedScop = getCollectedScope(
      questionsInLoop,
      id,
      componentsStore,
    );
    if (collectedScop.component) {
      if (
        collectedScop.component.type === QUESTION &&
        collectedScop.loop &&
        collectedScop.loop.basedOn
      ) {
        model.Scope = collectedScop.loop.basedOn;
      } else if (
        collectedScop.component.type === QUESTION &&
        collectedScop.component.responseFormat.type === TABLE &&
        collectedScop.component.responseFormat.TABLE.PRIMARY.type === LIST
      ) {
        model.Scope = collectedScop.component.id;
      } else {
        model.Scope = collectedScop.loop.id;
      }
    }
    const dynamique = getTableDynamique(componentsStore, id);
    if (dynamique) {
      model.Scope = dynamique;
    }

    if (codeListReference !== '') {
      model.CodeListReference = codeListReference;
    }

    if (MaxLength !== undefined) model.Datatype.MaxLength = MaxLength;

    if (Pattern !== undefined) model.Datatype.Pattern = Pattern;

    if (typeName === DATATYPE_NAME.DURATION && Format !== undefined) {
      if (Format === 'PnYnM') {
        if (Miyears || Mimonths) {
          model.Datatype.Minimum = `P${Miyears || 0}Y${Mimonths || 0}M`;
        }
        if (Mayears || Mamonths) {
          model.Datatype.Maximum = `P${Mayears || 0}Y${Mamonths || 0}M`;
        }
      }
      if (Format === 'PTnHnM') {
        if (Mihours || Miminutes) {
          model.Datatype.Minimum = `PT${Mihours || 0}H${Miminutes || 0}M`;
        }
        if (Mahours || Maminutes) {
          model.Datatype.Maximum = `PT${Mahours || 0}H${Maminutes || 0}M`;
        }
      }
    } else if (typeName === DATATYPE_NAME.DATE) {
      if (Minimum !== '') {
        model.Datatype.Minimum = Minimum;
      }
      if (Maximum !== '') {
        model.Datatype.Maximum = Maximum;
      }
    } else {
      if (Minimum !== undefined) model.Datatype.Minimum = Minimum;
      if (Maximum !== undefined) model.Datatype.Maximum = Maximum;
    }
    if (Decimals !== undefined) model.Datatype.Decimals = Decimals;
    if (IsDynamicUnit !== undefined)
      model.Datatype.IsDynamicUnit = IsDynamicUnit;
    if (Unit !== undefined) model.Datatype.Unit = Unit;
    if (Format !== undefined) {
      if (typeName === DATATYPE_NAME.DATE) {
        model.Datatype.Format = Format.toUpperCase();
      } else {
        model.Datatype.Format = Format;
      }
    }
    return model;
  });
}
