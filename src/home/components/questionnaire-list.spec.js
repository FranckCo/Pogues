jest.dontMock('./questionnaire-list');

import React from 'react';
import { shallow } from 'enzyme';

import QuestionnaireList from './questionnaire-list';

describe('<QuestionnaireList />', () => {
  // @TODO: Remove mock
  const mockQuestionnaires = [
    {
      id: '1',
      label: "Enquête sur les investissements pour protéger l'environnement 2016",
      type: 'Face à face',
      updatedAt: '03/01/2017',
    },
    {
      id: '2',
      label: "Enquête sur les investissements pour protéger l'environnement 2015",
      type: 'Téléphone',
      updatedAt: '03/01/2017',
    },
    {
      id: '3',
      label: "Enquête sur les investissements pour protéger l'environnement 2014",
      type: 'Face à face',
      updatedAt: '03/01/2017',
    },
    {
      id: '4',
      label: "Enquête sur les investissements pour protéger l'environnement 2013",
      type: 'Téléphone',
      updatedAt: '03/01/2017',
    },
  ];
  const propsWithQuestionnaires = {
    questionnaires: mockQuestionnaires,
  };
  const wrapperWithoutQuestionnaires = shallow(<QuestionnaireList />);
  const wrapperWithQuestionnaires = shallow(<QuestionnaireList {...propsWithQuestionnaires} />);

  test('should render without throwing an error', () => {
    expect(wrapperWithoutQuestionnaires.is('#questionnaire-list')).toBe(true);
  });

  test('should render as many <QuestionnaireListItem /> as questionnaires passed', () => {
    expect(wrapperWithQuestionnaires.find('QuestionnaireListItem').length).toBe(mockQuestionnaires.length);
  });

  test('should render "No results" message only if no questionnaries are passed', () => {
    expect(wrapperWithoutQuestionnaires.find('.questionnaire-list_noresults').length).toBe(1);
    expect(wrapperWithQuestionnaires.find('.questionnaire-list_noresults').length).toBe(0);
  });
});
