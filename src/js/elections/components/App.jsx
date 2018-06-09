'use strict';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Controls from './Controls.jsx';
import Ridings from './Ridings.jsx';
import Spinner from './Spinner.jsx';

import css from '../../../css/app.scss';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isDataLoaded: false,
      ridings: [],
      count: 0,
      slidesNewPosition: 0,
      ridingVotesTotals: [],
      maxClicks: null,
      lastUpdated: null
    };

    this.callBack = this.callBack.bind(this);
    this.getNewPosition = this.getNewPosition.bind(this);
    this.getElectionsResults = this.getElectionsResults.bind(this);
  }

  getNewPosition(clicks) {
    const slideWidth = 600; //measured in px
    const initialPosition = 0;
    const updatedSlidesPosition = -(slideWidth * clicks);

    if (clicks >= 0 && clicks < this.state.maxClicks) {
      this.setState({ slidesNewPosition: initialPosition + updatedSlidesPosition });
    }
  }

  callBack(count) {
    this.setState({
      count: count
    });
  }

  enableUpdateTimer() {
    const _this = this;
    setTimeout(_this.getElectionsResults, _this.props.updateIntervalInMilliseconds); //milliseconds
  }

  getElectionsResults() {
    const _this = this;
    let voteTotals = 0;
    const callbackName = 'gNews_getRidingDetailsCallback';
    const timestamp = Date.now();
    const script = document.createElement('script');
    script.src = _this.props.url + callbackName + '&_=' + timestamp;

    window[callbackName] = function(jsonData) {
      _this.setState({
        isDataLoaded: true,
        ridings: jsonData,
        maxClicks: Object.keys(jsonData).length,
        lastUpdated: timestamp
      });

      voteTotals = _this.totalVotes(_this.state.ridings);
      _this.setState({
        ridingVotesTotals: voteTotals
      });
      delete window[callbackName];

      if (_this.props.resultUpdatesEnabled) {
        _this.enableUpdateTimer();
      }
    };

    document.head.appendChild(script);
  }

  add(a, b) {
    return a + b;
  }

  totalVotes(apiJson) {
    let allRidingsVoteTotals = apiJson.map(riding => {
      let ridingVoteTotal = 0;
      const votesForRiding = riding.results.map(candidate => {
        return candidate.votes;
      });
      ridingVoteTotal = votesForRiding.reduce(this.add, 0);
      return ridingVoteTotal;
    });
    return allRidingsVoteTotals;
  }

  getInitialState() {
    return { ridings: [] };
  }

  componentDidMount() {
    this.getElectionsResults();
  }

  renderUpdatesDisabledMessage() {
    return this.props.updatesDisabledMessage;
  }

  renderUpdatesEnabledMessage(datetime, date) {
    return (
      <Fragment>
        Last updated: <time dateTime={datetime}>{date}</time>
      </Fragment>
    );
  }

  renderCarousel() {
    const unixTimestamp = this.state.lastUpdated;
    const date = new Date(unixTimestamp).toUTCString();
    const datetime = new Date(unixTimestamp).toISOString();
    return (
      <Fragment>
        <p aria-atomic="true" aria-live="polite" className={css.update} role="status">
          {this.props.resultUpdatesEnabled
            ? this.renderUpdatesEnabledMessage(datetime, date)
            : this.renderUpdatesDisabledMessage()}
        </p>
        <div
          id="electionResults"
          className={css.wrapper}
          style={{ left: this.state.slidesNewPosition + 'px' }}
        >
          <Ridings allRidings={this.state.ridings} />
        </div>
      </Fragment>
    );
  }

  renderSpinner() {
    return <Spinner />;
  }

  render() {
    let renderConditional;
    renderConditional = this.state.isDataLoaded ? this.renderCarousel() : this.renderSpinner();

    return (
      <Fragment>
        <h1 className={css.heading}>{this.props.componentTitle}</h1>
        {renderConditional}
        <Controls
          aria-controls="electionResults"
          count={this.state.count}
          maxCount={this.state.ridings.length}
          callback={this.callBack}
          position={this.getNewPosition}
          controlsEnabled={this.state.isDataLoaded}
        />
      </Fragment>
    );
  }
}

App.defaultProps = {
  componentTitle: 'Election Results',
  resultUpdatesEnabled: true,
  updatesDisabledMessage: 'Final results reported. All polls are now closed.',
  updateIntervalInMilliseconds: 300000,
  url: 'http://127.0.0.1:8080/src/assets/fixtures/results.js?callback='
};

App.propTypes = {
  componentTitle: PropTypes.string.isRequired,
  resultUpdatesEnabled: PropTypes.bool.isRequired,
  updatesDisabledMessage: PropTypes.string.isRequired,
  updateIntervalInMilliseconds: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired
};
