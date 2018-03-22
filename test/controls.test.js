import Controls from '../src/js/elections/components/Controls';
import React from 'react';

import { shallow } from 'enzyme';
import { spy } from 'sinon';

describe('Controls component', () => {
  describe('interactions tests', () => {
    it('calls handleClick() on button click', () => {
      const spy = jest.spyOn(Controls.prototype, 'handleClick');
      const wrapper = shallow(<Controls />);
      const previousButton = wrapper.find('button').first();
      previousButton.simulate('click');

      expect(spy).toHaveBeenCalled();
    });
  });
});
