import App from '../src/js/elections/components/App';
import Controls from '../src/js/elections/components/Controls';
import React from 'react';

import { shallow } from 'enzyme';

describe('Controls component', () => {
  describe('interactions tests', () => {
    it('calls handleClick() on button click', () => {
      const container = shallow(<App />);
      const CONTROLS_PROPS = {
        count: 0,
        maxCount: 9,
        callback: container.instance().callBack,
        position: container.instance().getNewPosition
      };
      const spy = jest.spyOn(Controls.prototype, 'handleClick');
      const wrapper = shallow(<Controls {...CONTROLS_PROPS} />);
      const previousButton = wrapper.find('button').first();
      previousButton.simulate('click');

      expect(spy).toHaveBeenCalled();
    });
  });
});
