import Bar from '../src/js/elections/components/Bar';
import React from 'react';

import { assert } from 'chai';
import { shallow } from 'enzyme';

describe('Bar component', () => {
  const ridingResult = [
    {
      name: 'Henry Spurr',
      partyId: 13,
      votes: 834,
      isElected: false,
      partyCode: 'NDP'
    },
    {
      name: 'Stephen McNeil',
      partyId: 12,
      votes: 7709,
      isElected: true,
      partyCode: 'LIB'
    },
    {
      name: 'Ginny Hurlock',
      partyId: 14,
      votes: 1390,
      isElected: false,
      partyCode: 'PC'
    },
    {
      name: 'Ron Neufeld',
      partyId: 11,
      votes: 227,
      isElected: false,
      partyCode: 'GRN'
    }
  ];

  const BAR_PROPS = {
    ridingResults: ridingResult
  };

  describe('rendering tests', () => {
    it('should contain a list of parties in the riding', () => {
      const wrapper = shallow(<Bar {...BAR_PROPS} />);
      const listWrapper = wrapper.find('ol');
      assert.ok(listWrapper.children());
    });
  });
});
