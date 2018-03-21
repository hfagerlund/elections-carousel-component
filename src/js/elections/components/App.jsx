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
      maxClicks: null
    };

    this.callBack = this.callBack.bind(this);
    this.getNewPosition = this.getNewPosition.bind(this);
  }

  getNewPosition(clicks) {
    var slideWidth = 600; //measured in px
    var initialPosition = 0;
    var updatedSlidesPosition = -(slideWidth * clicks);

    if (clicks >= 0 && clicks < this.state.maxClicks) {
      this.setState({ slidesNewPosition: initialPosition + updatedSlidesPosition });
    }
  }

  callBack(count) {
    this.setState({
      count: count
    });
  }

  getElectionsResults() {
    var _this = this;
    var voteTotals = 0;
    var callbackName = 'gNews_getRidingDetailsCallback';
    var timestamp = Date.now();
    var script = document.createElement('script');
    script.src = this.props.url + callbackName + '&_=' + timestamp;

    window[callbackName] = function(jsonData) {
      _this.setState({
        ridings: jsonData,
        maxClicks: Object.keys(jsonData).length
      });
      voteTotals = _this.totalVotes(_this.state.ridings);
      _this.setState({
        ridingVotesTotals: voteTotals
      });
      delete window[callbackName];
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

  render() {
    return (
      <Fragment>
        <h1 className={css.heading}>2011 Election Results</h1>
        <div className={css.wrapper} style={{ left: this.state.slidesNewPosition + 'px' }}>
          <Ridings allRidings={this.state.ridings} newPosition={this.state.slidesNewPosition} />
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

App.propTypes = {
  url: PropTypes.string
};
