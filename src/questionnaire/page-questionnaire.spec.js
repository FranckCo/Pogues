jest.dontMock('./page-questionnaire.jsx');

import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
// Not connected to store
import { PageQuestionnaire } from './page-questionnaire';

describe('<PageQuestionnaire />', () => {
  const spy = jest.fn(() => false);
  const props = {
    params: { id: 1 },
    loadQuestionnaireIfNeeded: spy,
    setActiveQuestionnaire: spy,
    setActiveComponents: spy,
  };

  const wrapper = shallow(<PageQuestionnaire {...props} />);

  test('should render without throwing an error', () => {
    expect(wrapper.is('#page-questionnaire')).toBe(true);
  });

  test('should render <QuestionnaireNav /> component', () => {
    expect(wrapper.find('QuestionnaireNav').length).toBe(1);
  });

  test('should call switchToQuestionnaire in render', () => {
    shallow(<PageQuestionnaire {...props} />);
    expect(spy).toBeCalled();
  });
});
