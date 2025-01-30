import {
  DATATYPE_TYPE_FROM_NAME,
  DATATYPE_VIS_HINT,
} from '../../constants/pogues-constants';
import { uuid } from '../../utils/utils';

export function stateToRemote(state, response) {
  const {
    id,
    mandatory,
    typeName,
    maxLength: MaxLength,
    pattern: Pattern,
    minimum: Minimum,
    maximum: Maximum,
    decimals: Decimals,
    isDynamicUnit: IsDynamicUnit,
    unit: Unit,
    format: Format,
    mihours: Mihours,
    miminutes: Miminutes,
    miyears: Miyears,
    mimonths: Mimonths,
    mahours: Mahours,
    maminutes: Maminutes,
    mayears: Mayears,
    mamonths: Mamonths,
    codesListId: CodeListReference,
    allowArbitraryResponse,
    visHint: visualizationHint,
    collectedVariable: CollectedVariableReference,
  } = state;
  const find = response
    ? response.find(
        (element) =>
          element.CollectedVariableReference === CollectedVariableReference,
      )
    : undefined;

  const model = {
    id: find ? find.id : id || uuid(),
    Datatype: {
      typeName,
      type: DATATYPE_TYPE_FROM_NAME[typeName],
    },
  };

  if (CollectedVariableReference !== undefined)
    model.CollectedVariableReference = CollectedVariableReference;
  if (CodeListReference !== undefined)
    model.CodeListReference = CodeListReference;
  if (mandatory !== undefined)
    model.mandatory = mandatory === '' ? false : mandatory;
  if (allowArbitraryResponse !== undefined)
    // we keep allowArbitraryResponse value only for suggester
    model.Datatype.allowArbitraryResponse =
      visualizationHint === DATATYPE_VIS_HINT.SUGGESTER
        ? allowArbitraryResponse
        : undefined;
  if (visualizationHint !== undefined)
    model.Datatype.visualizationHint = visualizationHint;
  if (MaxLength !== undefined) model.Datatype.MaxLength = MaxLength;
  if (Pattern !== undefined) model.Datatype.Pattern = Pattern;
  if (Minimum !== undefined) model.Datatype.Minimum = Minimum;
  if (Maximum !== undefined) model.Datatype.Maximum = Maximum;
  if (Decimals !== undefined) model.Datatype.Decimals = Decimals;
  if (IsDynamicUnit !== undefined) model.Datatype.IsDynamicUnit = IsDynamicUnit;
  if (Unit !== undefined) model.Datatype.Unit = Unit;
  if (Format !== undefined) model.Datatype.Format = Format;
  if (Mihours !== undefined) model.Datatype.Mihours = Mihours;
  if (Miminutes !== undefined) model.Datatype.Miminutes = Miminutes;
  if (Miyears !== undefined) model.Datatype.Miyears = Miyears;
  if (Mimonths !== undefined) model.Datatype.Mimonths = Mimonths;
  if (Mahours !== undefined) model.Datatype.Mahours = Mahours;
  if (Maminutes !== undefined) model.Datatype.Maminutes = Maminutes;
  if (Mayears !== undefined) model.Datatype.Mayears = Mayears;
  if (Mamonths !== undefined) model.Datatype.Mamonths = Mamonths;

  return model;
}
