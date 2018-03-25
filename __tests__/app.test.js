import App from '../src/js/elections/components/App';
import Ridings from '../src/js/elections/components/Ridings';
import Controls from '../src/js/elections/components/Controls';
import React from 'react';

import { shallow, mount } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { assert, expect } from 'chai';
import { spy } from 'sinon';

describe('App component', () => {
  describe('rendering tests', () => {
    it('renders expected main heading', () => {
      var app = TestUtils.renderIntoDocument(<App />);
      var mainHeading = TestUtils.findRenderedDOMComponentWithTag(app, 'h1');
      expect(mainHeading.textContent).equal('2011 Election Results');
    });

    it('should show a single wrapper div', () => {
      const wrapper = shallow(<App />);
      const container = wrapper.first('div');
      assert.equal(container.length, 1);
    });

    it('should render child components Ridings and Controls', () => {
      const wrapper = shallow(<App />);
      const options = [
        <div>
          <Ridings key={'child_1'} />
        </div>,
        <Controls key={'child_2'} />
      ];
      expect(wrapper.containsAllMatchingElements(options)).to.equal(true);
    });

    it('has one Ridings component', function() {
      var component = TestUtils.renderIntoDocument(<App />);
      var childComponents = TestUtils.scryRenderedComponentsWithType(component, Ridings);

      expect(childComponents.length).equal(1);
    });

    it('has one Controls component', function() {
      var component = TestUtils.renderIntoDocument(<App />);
      var childComponents = TestUtils.scryRenderedComponentsWithType(component, Controls);

      expect(childComponents.length).equal(1);
    });
  });

  describe('state tests', () => {
    it('should start with an empty list of ridings', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.state('ridings')).to.eql([]);
    });
  });

  describe('lifecycle tests', () => {
    it('calls componentDidMount() when component is mounted', () => {
      const componentDidMountSpy = spy(App.prototype, 'componentDidMount');
      mount(<App />);
      assert.ok(App.prototype.componentDidMount.calledOnce);
      componentDidMountSpy.restore();
    });
  });

  describe('callbacks tests', () => {
    it('passes callback to Controls', () => {
      const wrapper = shallow(<App />);
      const controls = wrapper.find(Controls);
      const callBack = wrapper.instance().callBack;
      expect(controls.prop('callback')).to.eql(callBack);
    });
  });
});
