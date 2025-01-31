export type Questionnaire = {
  id: string;
  title: string;
  targetModes: Set<TargetModes>;
  lastUpdatedDate?: Date;
};

export enum TargetModes {
  CAWI,
  CAPI,
  PAPI,
  CATI,
}
