import Bar from '../src/js/elections/components/Bar';
import React from 'react';

import {assert} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';


describe('Bar component', () => {
  describe('rendering tests', () => {
    it('should contain a list of parties in the riding', () => {
      const wrapper = shallow(<Bar />);
      const listWrapper = wrapper.find('ol');
      assert.ok(listWrapper.children());
    });
  });
});

