import { type Questionnaire, TargetModes } from '@/models/questionnaires';
import { nameFromLabel } from '@/utils/utils';

import {
  FlowLogicEnum,
  FormulasLanguageEnum,
  GenericNameEnum,
  Questionnaire as PoguesQuestionnaire,
  SurveyModeEnum,
} from '../models/pogues';

/** Compute a questionnaire that can be used in our app from API data. */
export function computeQuestionnaireFromPogues(
  datum: PoguesQuestionnaire,
): Questionnaire {
  return {
    id: datum.id,
    title: datum.Label[0],
    targetModes: computeTargetModes(datum.TargetMode),
    lastUpdatedDate: datum.lastUpdatedDate
      ? new Date(datum.lastUpdatedDate)
      : undefined,
  };
}

/** Compute a questionnaire that can be sent to the API from our app data. */
export function computePoguesQuestionnaire(
  datum: Questionnaire,
  stamp: string,
): PoguesQuestionnaire {
  const targetModes = computePoguesTargetModes(datum.targetModes);
  return {
    Name: nameFromLabel(datum.title),
    Label: [datum.title],
    TargetMode: targetModes,
    id: datum.id,
    owner: stamp,
    ...computeLegacyPoguesParameters(targetModes),
  };
}

/** Add legacy parameters for questionnaire */
function computeLegacyPoguesParameters(targetModes: SurveyModeEnum[]) {
  return {
    agency: 'fr.insee',
    genericName: GenericNameEnum.Questionnaire,
    flowLogic: FlowLogicEnum.Filter,
    formulasLanguage: FormulasLanguageEnum.VTL,
    DataCollection: [],
    lastUpdatedDate: new Date().toString(),
    Child: [
      {
        Name: 'QUESTIONNAIRE_END',
        Label: ['QUESTIONNAIRE_END'],
        id: 'idendquest',
        type: 'SequenceType',
        depth: 1,
        TargetMode: targetModes,
        genericName: GenericNameEnum.Module,
      },
    ],
    childQuestionnaireRef: [],
    CodeLists: { CodeList: [] },
    FlowControl: [],
    ComponentGroup: [],
    Variables: { Variable: [] },
  };
}

function computeTargetModes(targetModes?: SurveyModeEnum[]): Set<TargetModes> {
  const res = new Set<TargetModes>();
  if (!targetModes) return res;

  for (const targetMode of targetModes) {
    switch (targetMode) {
      case SurveyModeEnum.CAWI:
        res.add(TargetModes.CAWI);
        break;
      case SurveyModeEnum.CAPI:
        res.add(TargetModes.CAPI);
        break;
      case SurveyModeEnum.CATI:
        res.add(TargetModes.CATI);
        break;
      case SurveyModeEnum.PAPI:
        res.add(TargetModes.PAPI);
        break;
    }
  }
  return res;
}

function computePoguesTargetModes(
  targetModes: Set<TargetModes>,
): SurveyModeEnum[] {
  const res: SurveyModeEnum[] = [];
  for (const targetMode of targetModes) {
    switch (targetMode) {
      case TargetModes.CAWI:
        res.push(SurveyModeEnum.CAWI);
        break;
      case TargetModes.CAPI:
        res.push(SurveyModeEnum.CAPI);
        break;
      case TargetModes.CATI:
        res.push(SurveyModeEnum.CATI);
        break;
      case TargetModes.PAPI:
        res.push(SurveyModeEnum.PAPI);
        break;
    }
  }
  return res;
}
