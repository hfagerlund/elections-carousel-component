'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import css from '../../../css/totalvotes.scss';

export default class TotalVotes extends React.Component {
  getTotalVotes(riding) {
    const totalVotes = riding.results
      ? riding.results.map(results => results.votes).reduce((a, b) => a + b, 0)
      : null;
    return totalVotes;
  }

  render() {
    return (
      <p className={css.totalVotes}>
        Total votes for this riding:
        <strong> {this.getTotalVotes(this.props.riding)}</strong> votes
      </p>
    );
  }
}

TotalVotes.propTypes = {
  riding: PropTypes.object.isRequired
};
