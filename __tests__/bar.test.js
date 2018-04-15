import Bar from '../src/js/elections/components/Bar';
import React from 'react';

import { assert, expect } from 'chai';
import { shallow, mount } from 'enzyme';

describe('Bar component', () => {
  const BAR_PROPS = {
    ridingResults: testRiding.results
  };

  describe('rendering tests', () => {
    it('gets instance of Bar component)', () => {
      const wrapper = mount(<Bar {...BAR_PROPS} />);
      const inst = wrapper.instance();
      expect(inst).to.be.instanceOf(Bar);
    });

    it('should contain a list of parties in the riding', () => {
      const wrapper = shallow(<Bar {...BAR_PROPS} />);
      const listWrapper = wrapper.find('ol');
      assert.ok(listWrapper.children());
    });

    it('returns li elements as its children', () => {
      const wrapper = mount(<Bar {...BAR_PROPS} />);
      expect(wrapper.childAt(0).type()).to.equal('li');
      expect(wrapper.childAt(testRiding.results.length - 1).type()).to.equal('li');
    });

    it('returns span element as a child of its (child) li element', () => {
      const wrapper = mount(<Bar {...BAR_PROPS} />);
      expect(
        wrapper
          .find('li')
          .first()
          .childAt(0)
          .type()
      ).to.equal('span');
      expect(
        wrapper
          .find('li')
          .first()
          .childAt(0)
      ).to.have.length(1);
    });

    it('returns exactly one span element as a child of each (child) li element', () => {
      const wrapper = mount(<Bar {...BAR_PROPS} />);
      expect(
        wrapper
          .find('li')
          .first()
          .childAt(0)
      ).to.have.length(1);
    });
  });

  describe('test other functions return values', () => {
    it('returns expected result from _getTotalVotes function', () => {
      const expectedVoteTotal = 10160;
      const wrapper = mount(<Bar {...BAR_PROPS} />);
      expect(wrapper.instance()._getTotalVotes(testRiding.results)).to.equal(expectedVoteTotal);
    });

    it('contains getResultsSortedByVotes function', () => {
      const wrapper = mount(<Bar {...BAR_PROPS} />);
      assert.isFunction(wrapper.instance().getResultsSortedByVotes);
    });

    it('return value of getResultsSortedByVotes function is neither null nor undefined', () => {
      const wrapper = mount(<Bar {...BAR_PROPS} />);
      assert.exists(wrapper.instance().getResultsSortedByVotes(testRiding.results));
    });

    it('returns an array from getResultsSortedByVotes function', () => {
      const wrapper = mount(<Bar {...BAR_PROPS} />);
      assert.isArray(wrapper.instance().getResultsSortedByVotes(testRiding.results));
    });

    it('contains expected number of items in array returned from getResultsSortedByVotes function', () => {
      const expectedNumberOfItems = 4;
      const wrapper = mount(<Bar {...BAR_PROPS} />);
      assert.lengthOf(
        wrapper.instance().getResultsSortedByVotes(testRiding.results),
        expectedNumberOfItems
      );
    });
  });
});
