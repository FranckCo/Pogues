import { shallow } from 'enzyme';
import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fakeEvent, fakeFieldProps } from '../../utils/test/test-utils';
import GenericOption from './generic-option';
import ListCheckboxes from './list-checkboxes';

describe('Form controls - List checkboxes', () => {
  test('Should render as many checkboxes as options passed', () => {
    const props = {
      ...fakeFieldProps,
      input: {
        ...fakeFieldProps.input,
        value: '',
      },
      label: 'Fake label',
    };
    const wrapper = shallow(
      <ListCheckboxes {...props}>
        <GenericOption value="fakeValue1">Fake label 1</GenericOption>
        <GenericOption value="fakeValue2">Fake label 2</GenericOption>
      </ListCheckboxes>,
    );

    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(2);
  });

  describe('onChange method', () => {
    let onChangeSpy;
    let props;

    beforeEach(() => {
      onChangeSpy = vi.fn();
      props = {
        ...fakeFieldProps,
        input: {
          ...fakeFieldProps.input,
          value: '',
          onChange: onChangeSpy,
        },
        label: 'Fake label',
      };
    });

    test('Should call onChange with the corresding parameters when the first checkbox is clicked', () => {
      props.input.value = '';

      const wrapper = shallow(
        <ListCheckboxes {...props}>
          <GenericOption value="fakeValue1">Fake label 1</GenericOption>
          <GenericOption value="fakeValue2">Fake label 2</GenericOption>
        </ListCheckboxes>,
      );

      wrapper.find('input[value="fakeValue1"]').simulate('change', fakeEvent);
      expect(onChangeSpy).toBeCalledWith('fakeValue1');
    });

    test('Should call onChange with the corresding parameters when the second checkbox is clicked', () => {
      props.input.value = 'fakeValue1';

      const wrapper = shallow(
        <ListCheckboxes {...props}>
          <GenericOption value="fakeValue1">Fake label 1</GenericOption>
          <GenericOption value="fakeValue2">Fake label 2</GenericOption>
        </ListCheckboxes>,
      );

      wrapper.find('input[value="fakeValue2"]').simulate('change', fakeEvent);
      expect(onChangeSpy).toBeCalledWith('fakeValue1,fakeValue2');
    });

    test('Should call onChange with the corresding parameterswhen the second checkbox is clicked again', () => {
      props.input.value = 'fakeValue1,fakeValue2';

      const wrapper = shallow(
        <ListCheckboxes {...props}>
          <GenericOption value="fakeValue1">Fake label 1</GenericOption>
          <GenericOption value="fakeValue2">Fake label 2</GenericOption>
        </ListCheckboxes>,
      );

      wrapper.find('input[value="fakeValue2"]').simulate('change', fakeEvent);
      expect(onChangeSpy).toBeCalledWith('fakeValue1');
    });
  });
});