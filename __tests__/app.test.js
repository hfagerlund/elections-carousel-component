import App from '../src/js/elections/components/App';
import Spinner from '../src/js/elections/components/Spinner';
import Ridings from '../src/js/elections/components/Ridings';
import Controls from '../src/js/elections/components/Controls';
import React, { Fragment } from 'react';
import { Results } from '../src/assets/fixtures/mock-results.js';

import { shallow, mount } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { assert, expect } from 'chai';
import { spy } from 'sinon';

describe('App component', () => {
  const DEFAULT_APP_PROPS = {
    componentTitle: 'Election Results',
    resultUpdatesEnabled: true,
    updatesDisabledMessage: 'Final results reported. All polls are now closed.',
    updateIntervalInMilliseconds: 300000,
    url: 'http://127.0.0.1:8080/src/assets/fixtures/results.js?callback='
  };

  describe('rendering tests', () => {
    it('renders expected main heading', () => {
      const customComponentTitle = 'Custom Title';
      const app = TestUtils.renderIntoDocument(
        <App {...DEFAULT_APP_PROPS} componentTitle={customComponentTitle} />
      );
      const mainHeading = TestUtils.findRenderedDOMComponentWithTag(app, 'h1');
      expect(mainHeading.textContent).equal(customComponentTitle);
    });

    it('should show a single wrapper div', () => {
      const wrapper = shallow(<App {...DEFAULT_APP_PROPS} />);
      const container = wrapper.first('div');
      assert.equal(container.length, 1);
    });

    it('has one Controls component', function() {
      const component = TestUtils.renderIntoDocument(<App {...DEFAULT_APP_PROPS} />);
      const childComponents = TestUtils.scryRenderedComponentsWithType(component, Controls);

      expect(childComponents.length).equal(1);
    });
  });

  describe('state tests', () => {
    it('should start with an empty list of ridings', () => {
      const wrapper = shallow(<App {...DEFAULT_APP_PROPS} />);
      expect(wrapper.state('ridings')).to.eql([]);
    });

    it('should render one Ridings component if isDataLoaded state is true', function() {
      const component = TestUtils.renderIntoDocument(<App {...DEFAULT_APP_PROPS} />);
      component.setState({ isDataLoaded: true });
      const childComponents = TestUtils.scryRenderedComponentsWithType(component, Ridings);

      expect(childComponents.length).equal(1);
    });

    it('should not render any Ridings components if isDataLoaded state is false', function() {
      const component = TestUtils.renderIntoDocument(<App {...DEFAULT_APP_PROPS} />);
      component.setState({ isDataLoaded: false });
      const childComponents = TestUtils.scryRenderedComponentsWithType(component, Ridings);

      expect(childComponents.length).equal(0);
    });

    it('should render one Spinner component if isDataLoaded state is false', function() {
      const component = TestUtils.renderIntoDocument(<App {...DEFAULT_APP_PROPS} />);
      component.setState({ isDataLoaded: false });
      const childComponents = TestUtils.scryRenderedComponentsWithType(component, Spinner);

      expect(childComponents.length).equal(1);
    });
  });

  describe('lifecycle tests', () => {
    it('calls componentDidMount() when component is mounted', () => {
      const componentDidMountSpy = spy(App.prototype, 'componentDidMount');
      mount(<App {...DEFAULT_APP_PROPS} />);
      assert.ok(App.prototype.componentDidMount.calledOnce);
      componentDidMountSpy.restore();
    });
  });

  describe('callbacks tests', () => {
    it('passes callback to Controls', () => {
      const wrapper = shallow(<App {...DEFAULT_APP_PROPS} />);
      const controls = wrapper.find(Controls);
      const callBack = wrapper.instance().callBack;
      expect(controls.prop('callback')).to.eql(callBack);
    });
  });

  describe('test other functions return values', () => {
    it('returns ridings from getInitialState function', () => {
      const wrapper = shallow(<App {...DEFAULT_APP_PROPS} />);
      expect(wrapper.instance().getInitialState()).to.eql({ ridings: [] });
    });

    it('returns updatesDisabledMessage prop from renderUpdatesDisabledMessage function', () => {
      const string = 'Polls are closed';
      const wrapper = shallow(<App {...DEFAULT_APP_PROPS} updatesDisabledMessage={string} />);
      expect(wrapper.instance().renderUpdatesDisabledMessage()).to.eql(string);
    });

    it('returns allRidingsVoteTotals from totalVotes function', () => {
      const allRidingsVoteTotals = [10160, 9073, 7195, 10023, 7595, 7753, 9477, 9367, 8253, 7817];
      const apiJson = Results;
      const wrapper = shallow(<App {...DEFAULT_APP_PROPS} />);
      expect(wrapper.instance().totalVotes(apiJson)).to.eql(allRidingsVoteTotals);
    });

    it('returns last updated info from renderUpdatesEnabledMessage function', () => {
      const datetime = '1990-01-01T00:00:00.000Z';
      const date = 'Thu, 01 Jan 1990 00:00:00 GMT';
      const wrapper = mount(<App {...DEFAULT_APP_PROPS} />);
      expect(wrapper.instance().renderUpdatesEnabledMessage(datetime, date)).to.eql(
        <Fragment>
          Last updated: <time dateTime={datetime}>{date}</time>
        </Fragment>
      );
    });
  });
});
