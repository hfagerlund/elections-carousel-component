'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import css from './totalvotes.scss';

export default class TotalVotes extends React.Component {
  render() {
    const totalVotes = this.props.riding.results
      ? this.props.riding.results
          .map(results => results.votes)
          .reduce((a, b) => a + b, 0)
      : null;

    return (
      <p className={css.totalVotes}>
        Total votes for this riding:
        <strong> {totalVotes}</strong> votes
      </p>
    );
  }
}

TotalVotes.propTypes = {
  riding: PropTypes.object
};
