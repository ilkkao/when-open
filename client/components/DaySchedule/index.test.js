import React from 'react';
import { shallow } from 'enzyme';
import { advanceTo, clear } from 'jest-date-mock';
import DaySchedule from './index';

describe('DaySchedule', () => {
  it('should render correctly', () => {
    const schedule = [[1000, 2000], [3000, 4000]];

    advanceTo(new Date(2018, 5, 27, 0, 0, 0)); // No today label.

    const wrapper = shallow(<DaySchedule day="monday" schedule={schedule} />);

    expect(wrapper.html()).toEqual(
      '<div><div>Monday</div><div><div>12:16 AM - 12:33 AM</div><div>12:50 AM - 1:06 AM</div></div></div>'
    );

    clear();
  });
});
