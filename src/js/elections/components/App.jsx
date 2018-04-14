'use strict';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Controls from './Controls.jsx';

import Ridings from './Ridings.jsx';

import css from './app.scss';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
    var slideWidth = 600; //measured in px
    var initialPosition = 0;
    var updatedSlidesPosition = -(slideWidth * clicks);

    if (clicks >= 0 && clicks < this.state.maxClicks) {
      this.setState({
        slidesNewPosition: initialPosition + updatedSlidesPosition
      });
    }
  }

  callBack(count) {
    this.setState({
      count: count
    });
  }

  enableUpdateTimer() {
    var _this = this;
    setTimeout(
      _this.getElectionsResults,
      _this.props.updateIntervalInMilliseconds
    ); //milliseconds
  }

  getElectionsResults() {
    var _this = this;
    var voteTotals = 0;
    var callbackName = 'gNews_getRidingDetailsCallback';
    var timestamp = Date.now();
    var script = document.createElement('script');
    script.src = _this.props.url + callbackName + '&_=' + timestamp;

    window[callbackName] = function(jsonData) {
      _this.setState({
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
      var ridingVoteTotal = 0;
      var votesForRiding = riding.results.map(candidate => {
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

  render() {
    var unixTimestamp = this.state.lastUpdated;
    var date = new Date(unixTimestamp).toUTCString();
    var datetime = new Date(unixTimestamp).toISOString();

    return (
      <Fragment>
        <h1 className={css.heading}>{this.props.componentTitle}</h1>
        <p
          aria-atomic="true"
          aria-live="polite"
          className={css.update}
          role="status"
        >
          {this.props.resultUpdatesEnabled
            ? this.renderUpdatesEnabledMessage(datetime, date)
            : this.renderUpdatesDisabledMessage()}
        </p>
        <div
          className={css.wrapper}
          style={{ left: this.state.slidesNewPosition + 'px' }}
        >
          <Ridings allRidings={this.state.ridings} />
        </div>

        <Controls
          count={this.state.count}
          maxCount={this.state.ridings.length}
          callback={this.callBack}
          position={this.getNewPosition}
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
  componentTitle: PropTypes.string,
  resultUpdatesEnabled: PropTypes.bool,
  updatesDisabledMessage: PropTypes.string,
  updateIntervalInMilliseconds: PropTypes.number,
  url: PropTypes.string
};
