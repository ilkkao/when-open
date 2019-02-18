import React from 'react';
import Select from 'react-select';
import { shallow } from 'enzyme';
import OpeningHours from '../OpeningHours';
import App from './index';

describe('App', () => {
  it('should render correctly in zero state', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(OpeningHours)).toHaveLength(0);
  });
});
