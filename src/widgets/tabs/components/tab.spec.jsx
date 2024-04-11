import React from 'react';
import renderer from 'react-test-renderer';

import Tab from './tab';

describe('Tab', () => {
  test('Should exists with the corresponding template', () => {
    const props = {
      label: 'Fake label',
      path: 'fake path',
    };
    const tab = renderer
      .create(
        <Tab {...props}>
          <div>Fake Children</div>
        </Tab>,
      )
      .toJSON();

    expect(tab).toMatchSnapshot();
  });
});
