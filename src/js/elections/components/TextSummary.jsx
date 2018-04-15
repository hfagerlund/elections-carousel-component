'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import css from './textsummary.scss';

export default class TextSummary extends React.Component {
  _roundToTwoDec(num) {
    /*
     * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
     */
    return +(Math.round(num + 'e+2') + 'e-2');
  }

  _getTotalVotes(riding) {
    const totalVotes = riding
      ? riding.map(results => results.votes).reduce((a, b) => a + b, 0)
      : null;
    return totalVotes;
  }

  getCandidates(riding) {
    const listCandidates = riding
      ? riding.map(results => (
          <p
            key={results.name}
            className={`${css['candidate']}${results.isElected ? ' candidateWinner' : ''}`}
          >
            <span
              className={`label cap candidate_${results.partyCode.toLowerCase()}${
                results.isElected ? ' labelWinner' : ''
              }`}
            >
              {' '}
              {results.partyCode}{' '}
            </span>

            <span className={`${css['result']}${results.isElected ? ' summaryWinner' : ''}`}>
              {results.name} {results.isElected ? 'was elected with' : 'received'} {results.votes}{' '}
              votes ({this._roundToTwoDec(results.votes / this._getTotalVotes(riding) * 100)}%)
            </span>
          </p>
        ))
      : null;
    return listCandidates;
  }

  render() {
    return <div className={css.ridingSummary}>{this.getCandidates(this.props.riding.results)}</div>;
  }
}

TextSummary.propTypes = {
  riding: PropTypes.object.isRequired
};
