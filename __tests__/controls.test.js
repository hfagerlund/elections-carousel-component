import App from '../src/js/elections/components/App';
import Controls from '../src/js/elections/components/Controls';
import React from 'react';

import { assert } from 'chai';
import { shallow } from 'enzyme';

describe('Controls component', () => {
  const TEST_CONTROLS_PROPS = {
    count: 0,
    maxCount: 9,
    callback: shallow(<App />).instance().callBack,
    position: shallow(<App />).instance().getNewPosition
  };

  describe('state tests', () => {
    it('has expected default button states', () => {
      const wrapper = shallow(<Controls {...TEST_CONTROLS_PROPS} />);
      assert.equal(wrapper.state('prevButtonDisabled'), true);
      assert.equal(wrapper.state('nextButtonDisabled'), false);
    });

    it('enables Previous button after one click of Next button', () => {
      const wrapper = shallow(<Controls {...TEST_CONTROLS_PROPS} count={1} />);
      const nextButton = wrapper.find('button').last();
      nextButton.simulate('click');
      assert.equal(wrapper.state('prevButtonDisabled'), false);
    });

    it('disables Next button after maximum clicks is reached', () => {
      const wrapper = shallow(<Controls {...TEST_CONTROLS_PROPS} count={3} maxCount={5} />);
      const nextButton = wrapper.find('button').last();
      nextButton.simulate('click');
      assert.equal(wrapper.state('nextButtonDisabled'), true);
    });
  });

  describe('interactions tests', () => {
    it('calls handleClickPrevious() on previous button click', () => {
      const spy = jest.spyOn(Controls.prototype, 'handleClickPrevious');
      const wrapper = shallow(<Controls {...TEST_CONTROLS_PROPS} />);
      const previousButton = wrapper.find('button').first();
      previousButton.simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('calls handleClickNext() on next button click', () => {
      const spy = jest.spyOn(Controls.prototype, 'handleClickNext');
      const wrapper = shallow(<Controls {...TEST_CONTROLS_PROPS} />);
      const previousButton = wrapper.find('button').last();
      previousButton.simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});
