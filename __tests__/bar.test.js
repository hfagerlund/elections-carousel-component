import Bar from '../src/js/elections/components/Bar';
import React from 'react';

import { assert } from 'chai';
import { shallow } from 'enzyme';

describe('Bar component', () => {
  const BAR_PROPS = {
    ridingResults: testRiding.results
  };

  describe('rendering tests', () => {
    it('should contain a list of parties in the riding', () => {
      const wrapper = shallow(<Bar {...BAR_PROPS} />);
      const listWrapper = wrapper.find('ol');
      assert.ok(listWrapper.children());
    });
  });
});
