import { CODELISTS_ACTIONS, COMPONENT_TYPE } from './pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE, LOOP, ROUNDABOUT, FILTER } =
  COMPONENT_TYPE;
const {
  EDIT,
  DUPLICATE,
  REMOVE,
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  PRECISION,
  PRECISION_EDIT,
} = CODELISTS_ACTIONS;

type Dictionary = { [key: string]: { en: string; fr: string } };

const dictionary: Dictionary = {
  phLabel: {
    en: 'Enter a title for the questionnaire',
    fr: 'Entrez un titre pour le questionnaire',
  },
  phName: {
    en: 'Enter an ID for the questionnaire',
    fr: 'Entrez un identifiant pour le questionnaire',
  },
  title: {
    en: 'Title',
    fr: 'Titre',
  },
  label: {
    en: 'Label',
    fr: 'Libellé',
  },
  name: {
    en: 'Id',
    fr: 'Identifiant',
  },
  formula: {
    en: 'Formula',
    fr: 'Formule',
  },
  idRMeS: {
    en: 'Id',
    fr: 'Identifiant RMéS',
  },
  labelImportRMeS: {
    en: 'Enter the ID for the questionnaire',
    fr: "Entrez l'identifiant RMéS du questionnaire",
  },
  add: {
    en: 'Add',
    fr: 'Ajouter',
  },
  merge: {
    en: 'Merge',
    fr: 'Fusionner',
  },
  noCommonMode: {
    en: 'No common collect mode',
    fr: 'Aucun mode commun',
  },
  incompatibleDynamic: {
    en: 'Different dynamics (goto or filter)',
    fr: 'Dynamisme différent (redirection ou filtre)',
  },
  incompatibleFormulaLanguage: {
    en: 'Different languages (<ref language, XPath or VTL>)',
    fr: 'Langage différents (<langage ref, XPath ou VTL>)',
  },
  no_declarations: {
    en: 'No statement yet',
    fr: 'Aucune déclaration définie',
  },
  no_controls: {
    en: 'No control yet',
    fr: 'Aucun contrôle défini',
  },
  no_redirections: {
    en: 'No goTo yet',
    fr: 'Aucune redirection définie',
  },
  no_calculatedVariables: {
    en: 'No calculated variable yet',
    fr: 'Aucune variable calculée définie',
  },
  no_externalVariables: {
    en: 'No external variable yet',
    fr: 'Aucune variable externe définie',
  },
  no_collectedVariables: {
    en: 'No collected variable yet',
    fr: 'Aucune variable collectée définie',
  },
  tagline: {
    en: 'Questionnaire design and test',
    fr: 'Conception et test de questionnaires',
  },
  introduction: {
    en: 'Please specify your questionnaire',
    fr: 'Veuillez spécifier votre questionnaire',
  },
  errorMessageQuest: {
    en: 'Could not retrieve the questionnaire',
    fr: 'Impossible de récupérer le questionnaire',
  },
  search: {
    en: 'Search',
    fr: 'Chercher',
  },
  inviteExisting: {
    en: 'Select an existing questionnaire',
    fr: 'Sélectionner un questionnaire existant',
  },
  errorMessageQuestList: {
    en: 'Could not retrieve questionnaire list',
    fr: 'Impossible de récupérer la liste des questionnaires',
  },
  enterLabel: {
    en: 'Enter a label',
    fr: 'Entrez un libellé',
  },
  sequence: {
    en: 'Sequence',
    fr: 'Séquence',
  },
  subSequence: {
    en: 'Sub-sequence',
    fr: 'Sous-séquence',
  },
  loop: {
    en: 'Loop',
    fr: 'Boucle',
  },
  roundabout: {
    en: 'Roundabout',
    fr: 'Rond-point',
  },
  filtre: {
    en: 'Filter',
    fr: 'Filtre',
  },
  filtreImbriquer: {
    fr: 'Nouveau filtre imbriqué',
    en: 'New nested filter',
  },
  editFiltreImbriquer: {
    fr: 'Editer filtre imbriqué',
    en: 'Edit nested filter',
  },
  Scope: {
    en: 'Scope',
    fr: 'Niveau de calcul',
  },
  question: {
    en: 'Question',
    fr: 'Question',
  },
  externalElement: {
    en: 'External element',
    fr: 'Élément externe',
  },
  tcmReference: {
    en: 'TCM reference',
    fr: 'Référence au TCM',
  },
  questionnaireReference: {
    en: 'Questionnaire reference',
    fr: 'Référence à un questionnaire',
  },
  questionnaireMerge: {
    en: 'Questionnaire merging',
    fr: 'Fusion avec un questionnaire',
  },
  visualise: {
    en: 'Visualise',
    fr: 'Visualiser',
  },
  publishQuestionnaire: {
    en: 'Publish',
    fr: 'Publier',
  },
  duplicate: {
    en: 'Duplicate',
    fr: 'Dupliquer',
  },
  copy: {
    en: 'Copy',
    fr: 'Copie',
  },
  remove: {
    en: 'Remove',
    fr: 'Supprimer',
  },
  save: {
    en: 'Save',
    fr: 'Sauvegarder',
  },
  publish: {
    en: 'Generate',
    fr: 'Générer',
  },
  create: {
    en: 'Create',
    fr: 'Créer',
  },
  load: {
    en: 'Load',
    fr: 'Charger',
  },
  generateCollectedVariables: {
    en: 'Generate collected variables',
    fr: 'Générer variables collectées',
  },
  import: {
    en: 'Import',
    fr: 'Importer',
  },
  moveup: {
    en: 'Move up',
    fr: 'Remonter',
  },
  movedown: {
    en: 'Move down',
    fr: 'Descendre',
  },
  moveright: {
    en: 'Move right',
    fr: 'Déplacer droite',
  },
  moveleft: {
    en: 'Move left',
    fr: 'Déplacer gauche',
  },
  declaration_tabTitle: {
    en: 'Statements',
    fr: 'Déclarations',
  },
  declaration_label: {
    en: 'Statement label',
    fr: 'Libellé de la déclaration',
  },
  declaration_label_code_card: {
    en: 'Code of the card',
    fr: 'Code de la carte',
  },
  type: {
    en: 'Type',
    fr: 'Type',
  },
  declaration_position: {
    en: 'Position',
    fr: 'Position',
  },

  date_format: {
    en: 'Format',
    fr: 'Format',
  },
  createQuestionnaire: {
    en: 'Create a questionnaire',
    fr: 'Créer un questionnaire',
  },
  import_questionnaire: {
    en: 'Import a questionnaire',
    fr: 'Importer un questionnaire',
  },
  select_questionnaire: {
    en: 'Select a questionnaire',
    fr: 'Sélectionner un questionnaire',
  },
  addDeclaration: {
    en: 'Reset a statement',
    fr: 'Réinitialiser une déclaration',
  },
  addControl: {
    en: 'Reset a control',
    fr: 'Réinitialiser un contrôle',
  },
  addCalculatedVariable: {
    en: 'Reset a calculated variable',
    fr: 'Réinitialiser une variable calculée',
  },
  addExternalVariable: {
    en: 'Reset a external variable',
    fr: 'Réinitialiser une variable externe',
  },
  addCollectedVariable: {
    en: 'Reset a collected variable',
    fr: 'Réinitialiser une variable collectée',
  },
  declarations: {
    en: 'Statements',
    fr: 'Déclarations',
  },
  controls: {
    en: 'Controls',
    fr: 'Contrôles',
  },
  questionEdition: {
    en: 'Edit question properties',
    fr: 'Éditer les caractéristiques de la question',
  },
  numType: {
    en: 'Number',
    fr: 'Nomber',
  },
  stringType: {
    en: 'String',
    fr: 'Chaîne de caractères',
  },
  choiceType: {
    en: 'Choice',
    fr: 'Choix',
  },
  QUESTIONNAIRE: {
    en: 'Questionnaire',
    fr: 'Questionnaire',
  },
  MODULE: {
    en: 'Module',
    fr: 'Module',
  },
  PARAGRAPH: {
    en: 'Paragraph',
    fr: 'Paragraphe',
  },
  SEQUENCE: {
    en: 'Module',
    fr: 'Module',
  },
  DATE: {
    en: 'Date',
    fr: 'Date',
  },
  DURATION: {
    en: 'Duration',
    fr: 'Durée',
  },
  NUMERIC: {
    en: 'Number',
    fr: 'Nombre',
  },
  TEXT: {
    en: 'Text',
    fr: 'Texte',
  },
  BOOLEAN: {
    en: 'Boolean',
    fr: 'Booléen',
  },
  declarationHelp: {
    en: 'Help for the respondent',
    fr: "Aide à l'enquêté",
  },
  declarationInstruction: {
    en: 'Questioner instruction',
    fr: 'Instruction enquêteur',
  },
  declarationCodeCard: {
    en: 'Code-Card',
    fr: 'Carte-Code',
  },
  COMMENT: {
    en: 'Comment',
    fr: 'Commentaire',
  },
  HELP: {
    en: 'Help',
    fr: 'Aide',
  },
  helpUrl: {
    en: 'https://inseefr-github-io.translate.goog/Bowie/1._Pogues/?_x_tr_sl=fr&_x_tr_tl=en&_x_tr_hl=fr&_x_tr_pto=wapp',
    fr: 'https://inseefr.github.io/Bowie/1._Pogues/',
  },
  WARNING: {
    en: 'Warning',
    fr: 'Avertissement',
  },
  maxLength: {
    en: 'Length',
    fr: 'Taille',
  },
  pattern: {
    en: 'Pattern',
    fr: 'Motif',
  },
  collected: {
    en: 'Collected',
    fr: 'Collectée',
  },
  disjoignable: {
    en: 'Detachable statement',
    fr: 'Déclaration détachable',
  },
  goTo: {
    en: 'Goto',
    fr: 'Redirections',
  },
  goTo_description: {
    en: 'GoTo description',
    fr: 'Description de la redirection',
  },
  calculatedVariables: {
    en: 'Calculated variables',
    fr: 'Variables calculées',
  },
  externalVariables: {
    en: 'External variables',
    fr: 'Variables externes',
  },
  collectedVariables: {
    en: 'Collected variables',
    fr: 'Variables collectées',
  },
  addInput_redirections: {
    en: 'Add a goto',
    fr: 'Ajouter une redirection',
  },
  maximum: {
    en: 'Maximum',
    fr: 'Maximum',
  },
  minimum: {
    en: 'Minimum',
    fr: 'Minimum',
  },
  decimals: {
    en: 'Precision',
    fr: 'Précision',
  },
  BasedOn: {
    en: 'Based on',
    fr: 'Basé sur',
  },

  Filter: {
    en: 'Excepted',
    fr: 'Sauf',
  },
  InitialMembre: {
    en: 'Start',
    fr: 'Début',
  },
  FinalMembre: {
    en: 'End',
    fr: 'Fin',
  },
  AddButton: {
    en: 'Add button label',
    fr: "Libellé du bouton d'ajout",
  },
  selectBasedOn: {
    fr: 'Spécifier Basé sur',
    en: 'Specify Based on',
  },
  selectInitialMembre: {
    fr: 'Spécifier Membre initial',
    en: 'Specify Initial member',
  },
  selectFinalMembre: {
    fr: 'Spécifier Membre final',
    en: 'Specify Final member',
  },
  occurrenceLabel: {
    fr: 'Libellé identifiant une occurrence',
    en: 'Occurrence identifier label',
  },
  occurrenceDescription: {
    fr: "Description d'une occurrence",
    en: 'Occurrence description',
  },
  isRoundaboutLocked: {
    fr: 'Interdire de modifier une occurrence terminée',
    en: 'Forbid modifying ended occurrence',
  },
  selectScope: {
    fr: 'Portée Questionnaire',
    en: 'Scope Questionnaire',
  },
  selectNestedFilter: {
    fr: 'Spécifier Filtre imbriqué',
    en: 'Specify Nested filter',
  },
  QGoTo: {
    fr: 'Redirections',
    en: 'GoTo',
  },
  QFilter: {
    fr: 'Filtres',
    en: 'Filter',
  },
  formulaXpath: {
    fr: 'Xpath',
    en: 'Xpath',
  },
  formulaVTL: {
    fr: 'VTL',
    en: 'VTL',
  },
  specify: {
    en: 'Specify',
    fr: 'Préciser',
  },
  hours: {
    en: 'hours',
    fr: 'heures',
  },
  minutes: {
    en: 'minutes',
    fr: 'minutes',
  },
  years: {
    en: 'years',
    fr: 'années',
  },
  months: {
    en: 'months',
    fr: 'mois',
  },
  dateinitial: {
    en: 'Date format',
    fr: 'Format de la date',
  },
  durationinitial: {
    en: 'Duration format',
    fr: 'Format de la durée',
  },
  formatDate: {
    en: 'Please respect the date format',
    fr: 'Merci de respecter le format de la date',
  },
  dynamicUnit: {
    en: 'Custom unit of measure',
    fr: 'Unité de mesure personnalisée',
  },
  unit: {
    en: 'Unit of measure',
    fr: 'Unité de mesure',
  },
  dynamicUnitFormula: {
    en: 'Formula of the unit of measure',
    fr: "Formule de l'unité de mesure",
  },
  unitEmptySelect: {
    en: 'Select an unit of measure',
    fr: 'Sélectionnez une unité de mesure',
  },
  dateEmptySelect: {
    en: 'Select a date format',
    fr: 'Sélectionnez un format de date',
  },
  edit_config: {
    en: 'Edit config',
    fr: 'Éditer les paramètres',
  },
  description: {
    en: 'Description',
    fr: 'Description',
  },
  expression: {
    en: 'Display condition',
    fr: "Condition d'affichage",
  },
  target: {
    en: 'Target',
    fr: 'Cible',
  },
  selectTarget: {
    en: 'Select a target',
    fr: 'Sélectionnez une Cible',
  },
  ifCondition: {
    en: 'Target if condition is true',
    fr: 'Cible si la condition est vérifiée',
  },
  dev: {
    en: 'dev',
    fr: 'dev',
  },
  remote: {
    en: 'remote',
    fr: 'remote',
  },
  baseURL: {
    en: 'baseURL',
    fr: 'baseURL',
  },
  poguesPath: {
    en: 'poguesPath',
    fr: 'poguesPath',
  },
  persistPath: {
    en: 'persistPath',
    fr: 'persistPath',
  },
  stromaePath: {
    en: 'stromaePath',
    fr: 'stromaePath',
  },
  logLevel: {
    en: 'logLevel',
    fr: 'logLevel',
  },
  logActiveNamespaces: {
    en: 'logActiveNamespaces',
    fr: 'logActiveNamespaces',
  },
  trueWord: {
    en: 'True',
    fr: 'Vrai',
  },
  falseWord: {
    en: 'False',
    fr: 'Faux',
  },
  datatypeEdition: {
    en: 'Expected datatype',
    fr: 'Type de données attendu',
  },
  responsesEdition: {
    en: 'Response format',
    fr: 'Format des réponses',
  },
  responseType: {
    en: 'Response type',
    fr: 'Type de réponse',
  },
  addResponse: {
    en: 'Add a response',
    fr: 'Ajouter une réponse',
  },
  visHint: {
    en: 'Visualization hint',
    fr: 'Type de saisie',
  },
  newCode: {
    en: 'New code',
    fr: 'Nouvelle catégorie',
  },
  typeNewCode: {
    en: 'Type a new code',
    fr: 'Entrez une nouvelle catégorie',
  },
  cl: {
    en: 'Code list',
    fr: 'Liste de codes',
  },
  newCl: {
    en: 'New code list',
    fr: 'Nouvelle liste de codes',
  },
  selectCl: {
    en: 'Select a code list',
    fr: 'Sélectionnez une liste de codes',
  },
  placeholderDeclarationText: {
    en: 'Here, your statement',
    fr: 'Ici, votre déclaration',
  },
  deleteGoTo: {
    en: 'Delete GoTo',
    fr: 'Supprimer la redirection',
  },
  description_label: {
    en: 'Control description',
    fr: 'Description du contrôle',
  },
  control_during_collect: {
    en: 'Control during the collect',
    fr: 'Contrôle pendant la collecte',
  },
  control_post_collect: {
    en: 'Control post-collect',
    fr: 'Contrôle post-collecte',
  },
  control_message: {
    en: 'Fail message',
    fr: "Message d'erreur",
  },
  deleteControl: {
    en: 'Delete control',
    fr: 'Supprimer le contrôle',
  },
  deleteDeclaration: {
    en: 'Delete statement',
    fr: 'Supprimer la déclaration',
  },
  errorGoToUndefinedTgt: {
    en: `The target defined in the filter question is not avalaible. Please fill in the
 target for each GoTo item.`,
    fr: `Le filtre comporte une cible invalide (non renseignée). Merci de renseigner le
 champ « Cible » pour chaque redirection.`,
  },
  errorGoToNonExistingTgt: {
    fr: 'Le filtre comporte une cible invalide. Le champ « Cible » doit faire référence à un élément connu du questionnaire.',
    en: 'The target defined in the filter question is not avalaible. Please fill in the target with an existing element of the questionnaire.',
  },
  notExistingTarget: {
    fr: "Les cibles de redirections suivantes n'existent pas au sein du questionnaire :",
    en: "The following targets of redirections don't exist for the questionnaire :",
  },
  errorGoToEarlierTgt: {
    fr: 'Le filtre comporte une cible invalide. Le champ « Cible » doit faire référence à un élément postérieur du questionnaire.',
    en: 'The target defined in the filter question is not avalaible. Please fill in the target with a further element of the questionnaire.',
  },
  errorQuestionnaireTooShort: {
    fr: 'Votre questionnaire doit comporter au moins une séquence et une question.',
    en: 'Your questionnaire must contain at least one sequence and one question.',
  },
  errorNeedRegenerateCollectedVariables: {
    fr: 'Need regenerate.',
    en: 'Need regenerate.',
  },
  errorInvalidCollectedVariables: {
    fr: 'La question contient des variables collectées invalides.',
    en: 'The question contains invalid collected variables.',
  },
  errorUniqueVariableName: {
    fr: 'Les noms de variable doivent être uniques :',
    en: 'Variable names should be unique:',
  },
  errorUniqueComponentName: {
    fr: 'Les noms de composant (séquence, sous-séquence, boucle et question) doivent être uniques :',
    en: 'Component names (sequence, subsequence, loop and question) should be unique:',
  },
  questionnaireValid: {
    en: 'Your questionnaire is valid',
    fr: 'Votre questionnaire ne comporte aucune erreur',
  },
  errorQuestionnaireTargetMode: {
    fr: "Le mode de collecte d'un composant (séquence sous-séquence ou question) doit être inclus dans les modes de collecte du questionnaire :",
    en: 'The component collection mode (sequence, subsequence or question) must be included in the questionnaire collection mode:',
  },
  errorQuestionnaireTargetModeForComponent: {
    fr: "Le mode de collecte d'un composant (séquence sous-séquence ou question) doit être inclus dans les modes de collecte du questionnaire",
    en: 'The component collection mode (sequence, subsequence or question) must be included in the questionnaire collection mode',
  },
  duplicateVariablesComment: {
    fr: 'Certaines variables de votre questionnaire sont présentes plusieurs fois.',
    en: 'Some variables in your questionnaire appear more than once.',
  },
  showErrorDuplicateVariables: {
    fr: 'Voir les variables en doublon',
    en: 'Show duplicate variables',
  },
  duplicateVariables: {
    fr: 'Variables en doublon',
    en: 'Duplicate variables',
  },
  duplicateVariablesHeader: {
    fr: 'Variables',
    en: 'Variables',
  },
  duplicateVariablesSource: {
    fr: 'Origine',
    en: 'Origin',
  },
  currentQuestionnaire: {
    fr: 'Questionnaire courant',
    en: 'Current questionnaire',
  },
  CollectedVariableType: {
    fr: 'Collectée',
    en: 'Collected',
  },
  CalculatedVariableType: {
    fr: 'Calculée',
    en: 'Calculated',
  },
  ExternalVariableType: {
    fr: 'Externe',
    en: 'External',
  },
  failMessage: {
    en: 'Error message',
    fr: "Message d'erreur",
  },
  criticity: {
    en: 'Criticity',
    fr: 'Criticité',
  },
  INFO: {
    en: 'Information',
    fr: 'Information',
  },
  WARN: {
    en: 'Warning',
    fr: 'Avertissement',
  },
  ERROR: {
    en: 'Error',
    fr: 'Erreur',
  },
  control_scope: {
    en: 'Level',
    fr: 'Niveau',
  },
  LINE: {
    en: 'Line',
    fr: 'Ligne',
  },
  DYNAMIC_ARRAY: {
    en: 'Array',
    fr: 'Tableau',
  },
  ROUNDABOUT: {
    en: 'Roundabout',
    fr: 'Rond-point',
  },
  OCCURRENCE: {
    en: 'Occurrence',
    fr: 'Occurrence',
  },
  responseFormatSimple: {
    fr: 'Réponse simple',
    en: 'Simple response',
  },
  responseFormatSingle: {
    fr: 'Réponse à choix unique',
    en: 'Single choice response',
  },
  responseFormatMultiple: {
    fr: 'Réponse à choix multiples',
    en: 'Multiple choice response',
  },
  responseFormatTable: {
    fr: 'Tableau',
    en: 'Table',
  },
  responseFormatPairing: {
    fr: 'Liens deux à deux',
    en: 'Household members pairing',
  },
  pairingSourceVariable: {
    fr: 'Variable source',
    en: 'Source variable',
  },
  primaryFormat: {
    fr: "Format de l'axe principal",
    en: 'Primary axis format',
  },
  primaryAxis: {
    fr: "Axe d'information",
    en: 'Information axis',
  },
  primaryAxisTable: {
    fr: "Axe d'information principal",
    en: 'Primary information axis',
  },
  secondaryAxis: {
    fr: 'Axe secondaire',
    en: 'Secondary axis',
  },
  secondaryAxisTable: {
    fr: "Axe d'information secondaire",
    en: 'Secondary information axis',
  },
  measuresAxisTable: {
    fr: 'Information mesurée',
    en: 'Measure information',
  },
  codeList: {
    fr: 'Liste de codes',
    en: 'Code list',
  },
  selectCodesListType: {
    fr: 'Spécifier la liste de codes',
    en: 'Specify the code list',
  },
  duplicateCodeList: {
    fr: 'Dupliquer la liste de codes',
    en: 'Duplicate the code list',
  },
  selectSuggesterList: {
    fr: 'Sélectionner une liste',
    en: 'Select a list',
  },
  newCodesList: {
    fr: 'Créer une liste',
    en: 'Create a list',
  },
  refCodesList: {
    fr: 'Retrouver dans le référentiel',
    en: 'Retrieve in the repository',
  },
  questionnaireCodesList: {
    fr: 'Retrouver dans le questionnaire',
    en: 'Retrieve in the questionnaire',
  },
  allowArbitraryResponse: {
    fr: 'Autoriser une réponse libre',
    en: 'Allow an arbitrary response',
  },
  list: {
    fr: 'Liste',
    en: 'List',
  },
  minMax: {
    fr: 'Min/Max',
    en: 'Min/max',
  },
  linesNbCalculation: {
    fr: 'Calcul du nombre de lignes',
    en: 'Calculation of number of lines',
  },
  minRowNb: {
    fr: 'Nombre de lignes min.',
    en: 'Number of lines min.',
  },
  maxRowNb: {
    fr: 'Nombre de lignes max.',
    en: 'Number of lines max.',
  },
  addScndAxis: {
    fr: 'Ajouter un axe secondaire',
    en: 'Add a secondary axis',
  },
  scndInfoAxis: {
    fr: "Axe d'information secondaire",
    en: 'Second information axis',
  },
  modification: {
    en: 'Your modification is not saved! Are you sure you want to leave?',
    fr: "Votre modification n'est pas sauvegardée ! Êtes-vous sûr de vouloir quitter ?",
  },
  modificationsNotSaved: {
    en: 'Your modifications are not saved!',
    fr: 'Vos modifications ne sont pas sauvegardées !',
  },
  saveLower: {
    en: 'Thank you to validate all the actions on the page',
    fr: "Merci de valider toutes les actions sur l'élément",
  },
  validateEtat: {
    en: 'Validate as it is',
    fr: "Valider en l'état",
  },
  saveLowerTitle: {
    en: 'Modifications not validated',
    fr: 'Modifications non validées',
  },
  notSaved: {
    en: 'An error occurs, your modification can not be saved',
    fr: "Une erreur s'est produite, votre modification ne peut pas être sauvegardée",
  },
  loopNotSaved: {
    en: 'Your questionnaire has at least one loop, the last change made may generate inconsistencies (addition or change of order of a sequence or sub-sequence, modification of a question within a loop), please consult the loops concerned of your questionnaire, modify them if necessary and revalidate them.',
    fr: "Votre questionnaire comporte au moins une boucle, le dernier changement opéré peut générer des incohérences (ajout ou changement d'ordre d'une séquence ou sous-séquence, modification d'une question au sein d'une boucle), merci de consulter les boucles concernées de votre questionnaire, les modifier si nécessaire et les revalider.",
  },
  visualizationError: {
    en: 'An error occurred while visualizing the questionnaire:',
    fr: 'Une erreur a été rencontrée lors de la visualisation du questionnaire :',
  },
  close: {
    fr: 'Fermer',
    en: 'Close',
  },
  yes: {
    fr: 'Oui',
    en: 'Yes',
  },
  no: {
    fr: 'Non',
    en: 'No',
  },
  alternativeLabel: {
    fr: 'Valeur alternative',
    en: 'Alternative value',
  },
  unCollected: {
    fr: 'Case non collectée',
    en: 'uncollected cell',
  },
  infoAxis: {
    fr: "Axe d'information",
    en: 'Information axis',
  },
  measureFormat: {
    fr: "Format de l'information mesurée",
    en: 'Measure format',
  },
  boolean: {
    fr: 'Booléen',
    en: 'Boolean',
  },
  measureInfo: {
    fr: 'Représentation des réponses',
    en: 'Responses representation',
  },
  measureLabel: {
    fr: "Libellé de l'information mesurée",
    en: 'Measure label',
  },
  responseFormats: {
    fr: 'Type de question',
    en: 'Question type',
  },
  addMeasure: {
    fr: 'Réinitialiser',
    en: 'Reset',
  },
  noMeasureYet: {
    en: 'No measure yet',
    fr: 'Aucune information mesurée définie',
  },
  typeMeasure: {
    fr: 'Type de mesure',
    en: 'Measure type',
  },
  addCondition: {
    fr: 'Ajouter une condition',
    en: 'Add a condition',
  },
  conditions: {
    fr: 'Conditions',
    en: 'Conditions',
  },
  condition: {
    fr: 'Condition',
    en: 'Condition',
  },
  deleteCondition: {
    fr: 'Supprimer la condition',
    en: 'Remove condition',
  },
  addCode: {
    fr: 'Ajouter un code',
    en: 'Add a code',
  },
  uploadCode: {
    fr: "Import d'une liste de codes",
    en: 'Import a code list',
  },
  invalidFile: {
    fr: "Fichier invalide : merci d'importer un fichier valide",
    en: 'Invalid file: please import a valid file',
  },
  codeNumber: {
    fr: 'modalités importées',
    en: 'code found',
  },
  fileImport: {
    fr: 'Fichier à importer',
    en: 'File to import',
  },
  editCode: {
    fr: 'Editer un code',
    en: 'Edit a code',
  },
  codeLabel: {
    fr: 'Libellé de la modalité',
    en: 'Code label',
  },
  code: {
    fr: 'Code de la modalité',
    en: 'Code',
  },
  precisionId: {
    fr: 'Identifiant',
    en: 'Identifiant',
  },
  codeUnicity: {
    fr: 'Tous les codes doivent être uniques',
    en: 'All codes should be unique',
  },
  clarificationUnicity: {
    fr: 'Toutes les clarifications doivent être uniques',
    en: 'All clarifications should be unique',
  },
  dupliquate: {
    fr: 'dupliquer un questionnaire',
    en: 'duplicate a question',
  },
  codePh: {
    fr: 'Code',
    en: 'Code',
  },
  uiBehaviour: {
    fr: "Comportement d'affichage",
    en: 'Ui behaviour',
  },
  followUpMsg: {
    fr: 'Message de relance',
    en: 'Follow-up message',
  },
  FIRST_INTENTION: {
    fr: 'En première intention',
    en: 'Immediately',
  },
  SECOND_INTENTION: {
    fr: 'En deuxième intention',
    en: 'Later',
  },
  mandatory: {
    fr: 'Obligatoire',
    en: 'Mandatory',
  },
  by: {
    fr: 'par',
    en: 'by',
  },
  durationformat1: {
    fr: 'heures/minutes',
    en: 'hours/minutes',
  },
  durationformat2: {
    fr: 'années/mois',
    en: 'years/months',
  },
  dateyyyy: {
    fr: 'AAAA',
    en: 'YYYY',
  },
  datemmyyyy: {
    fr: 'AAAA-MM',
    en: 'YYYY-MM',
  },
  dateddmmyyyy: {
    fr: 'AAAA-MM-JJ',
    en: 'YYYY-MM-DD',
  },
  dclPosAfterQuestion: {
    fr: 'Après le libellé de question',
    en: 'After question label',
  },
  dclPosAfterAnswer: {
    fr: 'Après les champs de réponse',
    en: 'After response fields',
  },
  dclPosBeforeText: {
    fr: 'Avant le libellé de question',
    en: 'Before question label',
  },
  dclPosDetachable: {
    fr: 'Note de bas de page',
    en: 'Foot note',
  },
  dropdown: {
    fr: 'Liste déroulante',
    en: 'Dropdown',
  },
  radio: {
    fr: 'Bouton radio',
    en: 'Radio',
  },
  checkbox: {
    fr: 'Case à cocher',
    en: 'Checkbox',
  },
  suggester: {
    fr: 'Recherche sur liste',
    en: 'Suggester',
  },
  enterURL: {
    fr: 'Entrez une url',
    en: 'Url',
  },
  enterInfo: {
    fr: "Entrer un message d'information",
    en: 'Contextual information',
  },
  logout: {
    fr: 'Se déconnecter',
    en: 'Logout',
  },
  headerSubtitle: {
    fr: 'Conception et test de questionnaires',
    en: 'Design and testing of questionnaires',
  },
  homepage: {
    fr: 'Accueil',
    en: 'Homepage',
  },
  stamp: {
    fr: 'Habilitation :',
    en: 'Authorisation:',
  },
  welcome: {
    fr: 'Bienvenue dans POGUES',
    en: 'Welcome to POGUES',
  },
  homeQuestionnairesInProgress: {
    fr: 'Questionnaires en cours de conception par votre équipe',
    en: 'Questionnaires in progress by your team',
  },
  homeStampChoice: {
    fr: 'Choisissez le timbre associé à votre questionnaire : ',
    en: 'Choose the stamp associated with your questionnaire : ',
  },
  emptyQuestionnaire: {
    fr: 'Questionnaire vide',
    en: 'Empty questionnaire',
  },
  searchQuestionnaire: {
    fr: 'Rechercher un questionnaire',
    en: 'Search a questionnaire',
  },
  fromMyTeam: {
    fr: 'De mon équipe',
    en: 'From my team',
  },
  inProgressAndPublished: {
    fr: 'En cours et publiés',
    en: 'In progress and published',
  },
  fromRepository: {
    fr: 'Du référentiel',
    en: 'From the repository',
  },
  publishedByInsee: {
    fr: "Publiés par l'Insee",
    en: 'Published by Insee',
  },
  collectionMode: {
    fr: 'Mode de collecte',
    en: 'Collection mode',
  },
  dynamiqueSpecified: {
    fr: 'Dynamique spécifiée en',
    en: 'Dynamics specified in',
  },
  formulaSpecified: {
    fr: 'Formules spécifiées en',
    en: 'Formulas specified in',
  },
  lastUpdate: {
    fr: 'Dernière mise à jour',
    en: 'Last update',
  },
  state: {
    fr: 'État',
    en: 'State',
  },
  stateValidated: {
    fr: 'Validé',
    en: 'Validated',
  },
  stateProvisional: {
    fr: 'Provisoire',
    en: 'Provisional',
  },
  noQuestionnaires: {
    fr: 'Aucun questionnaire',
    en: 'No questionnaires',
  },
  loading: {
    fr: 'En cours de chargement',
    en: 'Loading',
  },
  validate: {
    fr: 'Valider',
    en: 'Validate',
  },
  cancel: {
    fr: 'Annuler',
    en: 'Cancel',
  },
  newEmptyQuestionnaire: {
    fr: 'Nouveau questionnaire',
    en: 'New questionnaire',
  },
  newQuestionnaireLegend: {
    fr: 'Vous allez maintenant pouvoir préciser le contexte de création de votre questionnaire. Ceci permettra de classer et retrouver le questionnaire dans le référentiel.',
    en: 'You will now be able to specify the context',
  },
  collectionCampaign: {
    fr: 'Campagne de collecte',
    en: 'Collection campaign',
  },
  collectionCampaignNew: {
    fr: 'Créer une campagne',
    en: 'Create a collection campaign',
  },
  contextModel: {
    fr: 'Modèle de contexte',
    en: 'Context Model',
  },
  showDetail: {
    fr: 'Voir le détail',
    en: 'Show the detail',
  },
  questionnaireDetail: {
    fr: 'Détail du questionnaire',
    en: 'Questionnaire detail',
  },
  collection: {
    fr: 'Série',
    en: 'Collection',
  },
  operationStat: {
    fr: 'Opération statisque',
    en: 'Stat operation',
  },
  model: {
    fr: 'Modèle',
    en: 'Model',
  },
  modelNew: {
    fr: 'Créer un modèle',
    en: 'New model',
  },
  addObject: {
    fr: 'Ajouter un objet',
    en: 'Add object',
  },
  validationNumber: {
    fr: 'Vous devez introduire un chiffre',
    en: 'Must be a number',
  },
  validationRequired: {
    fr: 'Champ obligatoire',
    en: 'Mandatory field',
  },
  validationRequiredMultiple: {
    fr: 'Sélectionner au moins une option',
    en: 'Select at least one option',
  },
  validationInvalidName: {
    fr: "L'identifiant peut uniquement contenir des lettres non accentuées, chiffres, tirets et underscore",
    en: 'The Id can only contain non-accented letters, numbers, dashes and underscore',
  },
  validationInvalidNameSize: {
    fr: "L'identifiant ne peux pas dépasser 32 caractères",
    en: 'The Id can not exceed 32 characters',
  },
  validationMinNumber: {
    fr: 'Veuillez saisir au minimum',
    en: 'Must be at least',
  },
  validationMaxNumber: {
    fr: 'Veuillez saisir au maximum',
    en: 'Must be at most',
  },
  validationNoCodes: {
    fr: 'Veuillez ajouter des codes a la liste',
    en: 'Must be added codes to the list',
  },
  dropHere: {
    fr: 'Déposer ici !',
    en: 'Drop here !',
  },
  backToHomePage: {
    fr: "Retour à l'accueil",
    en: 'Back to the Home',
  },
  back: {
    fr: 'Retour',
    en: 'Back',
  },
  seeFilters: {
    fr: 'Voir les filtres',
    en: 'See filters',
  },
  confirmBodyTitle: {
    fr: 'Confirmation',
    en: 'Confirmation',
  },
  confirmBodyMessage: {
    fr: 'Vous allez supprimer le questionnaire et perdre toutes les informations saisies.',
    en: 'You are deleting the questionnaire. You are going to lose all information entered.',
  },
  confirmQuestionMessage: {
    fr: 'Êtes-vous sûr ?',
    en: 'Are you sure?',
  },
  serie: {
    fr: 'Série',
    en: 'Series',
  },
  operation: {
    fr: 'Opération statistique',
    en: 'Statistical operation',
  },
  campaigns: {
    fr: 'Campagnes',
    en: 'Campaigns',
  },
  campaign: {
    fr: 'Campagne',
    en: 'Campaign',
  },
  selectSerie: {
    fr: 'Sélectionner une série',
    en: 'Select a series',
  },
  selectOperation: {
    fr: 'Sélectionner une opération',
    en: 'Select an operation',
  },
  selectCampaign: {
    fr: 'Sélectionner une campagne',
    en: 'Select a campaign',
  },
  selectCampaigns: {
    fr: 'Sélectionner au moins une campagne',
    en: 'Select at least one campaign',
  },
  selectType: {
    fr: 'Sélectionner un type',
    en: 'Select a type',
  },
  noValuesCampaigns: {
    fr: 'Sélectionner une opération pour afficher la liste des campagnes',
    en: 'Select an operation to show a list of campaigns',
  },
  validation_declaration_label: {
    fr: 'Libellé de la déclaration obligatoire',
    en: 'Statement label required',
  },
  validation_card_code: {
    fr: "La modalité carte-code n'a de sens que pour les modes de collecte CAPI et/ou CATI.",
    en: 'The codecard modality is meanful only for CAPI and/or CATI mode.',
  },
  validation_control_description: {
    fr: 'Description du contrôle obligatoire',
    en: 'Control description required',
  },
  validation_expression: {
    fr: 'Condition obligatoire',
    en: 'Condition required',
  },
  validation_control_message: {
    fr: "Message d'erreur obligatoire",
    en: 'Fail message required',
  },
  validation_goTo_description: {
    fr: 'Description de la redirection obligatoire',
    en: 'Goto description required',
  },
  validation_condition: {
    fr: 'Condition obligatoire',
    en: 'Condition required',
  },
  validation_target: {
    fr: 'Cible obligatoire',
    en: 'Target required',
  },
  validation_calculatedvariable_label: {
    fr: 'Libellé de la variable calculée obligatoire',
    en: 'Calculated variable label required',
  },
  validation_calculatedvariable_name: {
    fr: 'Nom de la variable calculée obligatoire',
    en: 'Calculated variable name required',
  },
  validation_calculatedvariable_formula: {
    fr: 'Formule de la variable calculée obligatoire',
    en: 'Calculated variable formula required',
  },
  validation_calculatedvariable_existing: {
    fr: 'Il existe une variable calculée avec le même nom',
    en: 'It already exists a calculated variable with this name',
  },
  validation_minimum: {
    fr: 'minimum obligatoire',
    en: 'minimum required',
  },
  validation_maximum: {
    fr: 'maximum obligatoire',
    en: 'maximum required',
  },
  validation_externalvariable_label: {
    fr: 'Libellé de la variable externe obligatoire',
    en: 'External variable label required',
  },
  validation_externalvariable_name: {
    fr: 'Nom de la variable externe obligatoire',
    en: 'External variable name required',
  },
  validation_externalvariable_existing: {
    fr: 'Il existe une variable externe avec le même nom',
    en: 'It already exists an external variable with this name',
  },
  validation_collectedvariable_label: {
    fr: 'Libellé de la variable collectée obligatoire',
    en: 'Collected variable label required',
  },
  validation_collectedvariable_name: {
    fr: 'Identifiant de la variable collectée obligatoire',
    en: 'Collected variable id required',
  },
  validation_collectedvariable_existing: {
    fr: 'Il existe une variable collectée avec le même nom',
    en: 'It already exists an collected variable with this name',
  },
  validation_collectedvariable_no_new: {
    fr: 'Vous ne pouvez pas ajouter des nouvelles variables collectées',
    en: 'It already exists an collected variable with this name',
  },
  validation_collectedvariable_need_reset: {
    fr: 'Veuillez regénérer les variables collectées',
    en: 'Renew your collected variables',
  },
  validation_collectedvariable_need_creation: {
    fr: 'Veuillez spécifier une variable collectée',
    en: 'Specify a collected variable',
  },
  validation_question_name_required: {
    fr: 'Identifiant de la question obligatoire.',
    en: 'Question name required.',
  },
  validation_response_format_required: {
    fr: 'Format de réponse obligatoire.',
    en: 'Response format required.',
  },
  validationCodeListCode: {
    fr: 'Code de la modalité obligatoire.',
    en: 'Code required.',
  },
  validationCodeListLabel: {
    fr: 'Libellé obligatoire.',
    en: 'Label required.',
  },
  validationMeasureLabel: {
    fr: "Libellé de l'information mesurée obligatoire",
    en: 'Measure label required',
  },
  headerSearchQuestionnaire_version: {
    fr: 'Version',
    en: 'Version',
  },
  headerSearchQuestionnaire_id: {
    fr: 'Identifiant',
    en: 'Id',
  },
  headerSearchQuestionnaire_title: {
    fr: 'Titre',
    en: 'Title',
  },
  headerSearchQuestionnaire_serie: {
    fr: 'Série',
    en: 'Series',
  },
  headerSearchQuestionnaire_operation: {
    fr: 'Opération statistique',
    en: 'Statistical operation',
  },
  headerSearchQuestionnaire_campaign: {
    fr: 'Campagne',
    en: 'Campaign',
  },
  headerSearchQuestionnaire_action: {
    fr: 'Action',
    en: 'Action',
  },
  actions_reuse: {
    fr: 'Réutiliser',
    en: 'Reuse',
  },
  customize: {
    fr: 'Personnaliser',
    en: 'Customize',
  },
  displayVersions: {
    fr: 'Versions',
    en: 'Versions',
  },
  searchInputQuestionnaireLabel: {
    en: 'Questionnaire title',
    fr: 'Titre du questionnaire',
  },
  searchInputCodesListsLabel: {
    en: 'Code list label',
    fr: 'Libellé de la liste de code',
  },
  searchInputButton: {
    en: 'Search',
    fr: 'Rechercher',
  },
  pageSearchNoResults: {
    en: 'No questionnaire found',
    fr: 'Aucun questionnaire trouvé',
  },
  codesListsNoResults: {
    en: 'No code list found',
    fr: 'Aucune liste de codes trouvée',
  },
  reset: {
    en: 'Reset',
    fr: 'Réinitialiser',
  },
  searchResultVersion: {
    fr: 'Version',
    en: 'Version',
  },
  searchResultId: {
    fr: 'Identifiant',
    en: 'Id',
  },
  searchResultTitle: {
    fr: 'Titre',
    en: 'Title',
  },
  searchResultLabel: {
    fr: 'Libellé',
    en: 'Label',
  },
  searchResultSerie: {
    fr: 'Série',
    en: 'Series',
  },
  searchResultOperation: {
    fr: 'Opération statistique',
    en: 'Statistical operation',
  },
  searchResultCampaign: {
    fr: 'Campagne',
    en: 'Campaign',
  },
  searchResultAction: {
    fr: 'Action',
    en: 'Action',
  },
  searchResultActionReuse: {
    fr: 'Réutiliser',
    en: 'Reuse',
  },
  actions: {
    fr: 'Actions',
    en: 'Actions',
  },
  level: {
    fr: 'Niveau',
    en: 'Level',
  },
  VISUALIZE_WEB: {
    fr: 'Web V1',
    en: 'Web V1',
  },
  VISUALIZE_WEB_HOUSEHOLD: {
    fr: 'Web ménage',
    en: 'Web household',
  },
  VISUALIZE_WEB_BUSINESS: {
    fr: 'Web entreprise',
    en: 'Web business',
  },
  VISUALIZE_QUEEN_CAPI: {
    fr: 'Enquêteur face à face',
    en: 'Questioner face to face',
  },
  VISUALIZE_QUEEN_CATI: {
    fr: 'Enquêteur téléphone',
    en: 'Questioner phone',
  },
  VISUALIZE_PDF: {
    fr: 'Papier',
    en: 'Paper',
  },
  VISUALIZE_SPECIFICATION: {
    fr: 'Spécification',
    en: 'Specification',
  },
  VISUALIZE_DDI: {
    fr: 'Métadonnées',
    en: 'Metadata',
  },
  beta: {
    fr: 'beta',
    en: 'beta',
  },
  deprecated: {
    fr: 'obsolète',
    en: 'deprecated',
  },
  NEW: {
    fr: 'Nouveau',
    en: 'New',
  },
  EXISTING: {
    fr: 'Existant',
    en: 'Existing',
  },
  TYPEFILTER: {
    fr: 'Type de filtre',
    en: 'Filtre type',
  },
  If: {
    fr: 'Si',
    en: 'If',
  },
  EndIf: {
    fr: 'Fin si',
    en: 'End if',
  },
  IsNotLetter: {
    en: 'Id should begin with a letter',
    fr: "L'identifiant de la variable doit commencer par une lettre",
  },
  duplicateQuestion: {
    fr: 'Vous avez demandé à dupliquer le questionnaire "',
    en: 'You asked to duplicate the questionnaire "',
  },
  duplicateQuestionConfirmation: {
    fr: '". Confirmez-vous votre demande ?',
    en: '". Are you sure ?',
  },
  openQuestionnaire: {
    fr: 'Ouvrir',
    en: 'Open',
  },
  versionsInfo: {
    fr: 'Pour afficher une précédente version, choisissez "Charger" puis valider. Cette version peut ensuite être modifiée et sauvegardée comme une nouvelle version.',
    en: 'To load a previous version, click "Load" and validate. That version can then be edited and saved as a new one.',
  },
  versionsLimitInfo: {
    fr: 'Attention, seulement les 10 dernières versions de la journée la plus récente sont conservées, et la dernière des journées précédentes.',
    en: 'Caution: only the latest 10 versions of the most recent day are stored, and the last one for the days before.',
  },
  documentationInfoLink: {
    fr: 'Pour plus de précision, se référer à la documentation.',
    en: 'For more information check the documentation.',
  },
};

// Dynamic translations

dictionary[`componentNew${QUESTION}`] = {
  fr: 'Nouvelle question',
  en: 'New question',
};

dictionary[`componentNew${SEQUENCE}`] = {
  fr: 'Nouvelle sequence',
  en: 'New sequence',
};

dictionary[`componentNew${LOOP}`] = {
  fr: 'Nouvelle boucle',
  en: 'New loop',
};

dictionary[`componentNew${ROUNDABOUT}`] = {
  fr: 'Nouveau rond-point',
  en: 'New roundabout',
};

dictionary[`componentNew${FILTER}`] = {
  fr: 'Nouveau filtre',
  en: 'New filter',
};

dictionary[`componentNew${SUBSEQUENCE}`] = {
  fr: 'Nouvelle sous-séquence',
  en: 'New sub-sequence',
};

dictionary[`componentEdit${QUESTION}`] = {
  fr: 'Modifier la question',
  en: 'Edit question',
};

dictionary[`componentEdit${SEQUENCE}`] = {
  fr: 'Modifier la sequence',
  en: 'Edit sequence',
};

dictionary[`componentEdit${SUBSEQUENCE}`] = {
  fr: 'Modifier la sous-séquence',
  en: 'Edit sub-sequence',
};

dictionary[`componentEdit${LOOP}`] = {
  fr: 'Modifier la boucle',
  en: 'Edit loop',
};

dictionary[`componentEdit${ROUNDABOUT}`] = {
  fr: 'Modifier le rond-point',
  en: 'Edit roundabout',
};

dictionary[`componentEdit${FILTER}`] = {
  fr: 'Modifier le filtre',
  en: 'Edit filter',
};

dictionary[`componentCodeList${EDIT.name}`] = {
  fr: 'Modifier',
  en: 'Modify',
};

dictionary[`componentCodeList${DUPLICATE.name}`] = {
  fr: 'Dupliquer',
  en: 'Copy',
};
dictionary[`componentCodeList${REMOVE.name}`] = {
  fr: 'Supprimer',
  en: 'Delete',
};
dictionary[`componentCodeList${MOVE_UP.name}`] = {
  fr: 'Monter',
  en: 'Up',
};
dictionary[`componentCodeList${MOVE_DOWN.name}`] = {
  fr: 'Descendre',
  en: 'Down',
};
dictionary[`componentCodeList${MOVE_LEFT.name}`] = {
  fr: 'Mettre au niveau inférieur',
  en: 'Level down',
};
dictionary[`componentCodeList${MOVE_RIGHT.name}`] = {
  fr: 'Mettre au niveau supérieur',
  en: 'Level up',
};
dictionary[`componentCodeList${PRECISION.name}`] = {
  fr: `Ajouter un "Préciser"`,
  en: `Add a "Specify"`,
};
dictionary[`componentCodeList${PRECISION_EDIT.name}`] = {
  fr: `Modifier le "Préciser"`,
  en: `Modify "Specify"`,
};

export default dictionary;
