import RidingHeader from '../src/js/elections/components/RidingHeader';
import React from 'react';

import {assert, expect} from 'chai';
import { mount } from 'enzyme';
import TestUtils from 'react-dom/test-utils';


describe('RidingHeader component', () => {
  describe('rendering tests', () => {
    it('renders heading containing expected text', () => {
      var app = TestUtils.renderIntoDocument(
        <RidingHeader />
      );
      var heading = TestUtils.findRenderedDOMComponentWithTag(app, 'h2');
      expect(heading.textContent).contain('Riding of:');
    });

    it('should contain a header with a specific classname', () => {
      const wrapper = mount(<RidingHeader />);
      const mainHeader = wrapper.find('header');
      assert.equal(mainHeader.length, 1);
      assert.ok(mainHeader.hasClass('header'));
    });

    it('should contain an h2 heading with a specific classname', () => {
        const wrapper = mount(<RidingHeader />);
        const heading = wrapper.find('h2');

        assert.equal(heading.length, 1);
        assert.ok(heading.hasClass('heading'));
    });

    it('should contain an h3 heading with a specific classname', () => {
        const wrapper = mount(<RidingHeader />);
        const heading = wrapper.find('h3');

        assert.equal(heading.length, 1);
        assert.ok(heading.hasClass('subheading'));
    });
  });
});
