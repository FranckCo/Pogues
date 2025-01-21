import type { Questionnaire } from '@/models/questionnaires';

import QuestionnaireLine from './QuestionnaireLine';

interface TableQuestionnaireProps {
  questionnaires: Questionnaire[];
}

/** Display questionnaires in a table format. */
export default function TableQuestionnaires({
  questionnaires,
}: Readonly<TableQuestionnaireProps>) {
  return (
    <table className="table-auto border border-default w-full shadow-xl">
      <thead className="bg-accent">
        <tr className="*:font-semibold *:p-4 text-left">
          <th>Questionnaire</th>
          <th>Dernière modification</th>
          <th className="w-0" />
        </tr>
      </thead>
      <tbody className="text-default">
        {questionnaires
          .toSorted((a, b) => {
            return b.lastUpdatedDate.getTime() - a.lastUpdatedDate.getTime();
          })
          .map((questionnaire) => (
            <QuestionnaireLine
              questionnaire={questionnaire}
              key={questionnaire.id}
            />
          ))}
      </tbody>
    </table>
  );
}
