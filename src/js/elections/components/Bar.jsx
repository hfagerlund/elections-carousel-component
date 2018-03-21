'use strict';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import css from './bar.scss';

export default class Bar extends React.Component {
  _roundToTwoDec(num) {
    /*
     * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
     */
    return +(Math.round(num + 'e+2') + 'e-2');
  }

  render() {
    const totalVotes = this.props.ridingResults
      ? this.props.ridingResults.map(results => results.votes).reduce((a, b) => a + b, 0)
      : null;

    const listResultsSortedByVotes = this.props.ridingResults
      ? this.props.ridingResults.sort((a, b) => b.votes - a.votes).map(results => (
          <li
            key={results.name}
            className={`${css['party']} ${css['party']}_${results.partyCode.toLowerCase()}${
              results.isElected ? ' winner' : ''
            }`}
            style={{ height: 250 * this._roundToTwoDec(results.votes / totalVotes) + 'px' }}
          >
            {results.isElected ? <span className={css.cap}>Elected</span> : ''}
            <span className={css.percentage}>
              <span className={css.cap}>{results.partyCode} </span>
              {this._roundToTwoDec(results.votes / totalVotes * 100)}%
            </span>
          </li>
        ))
      : null;

    return <Fragment>{listResultsSortedByVotes}</Fragment>;
  }
}

Bar.propTypes = {
  ridingResults: PropTypes.array
};
