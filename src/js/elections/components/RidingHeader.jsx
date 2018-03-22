'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import css from './ridingHeader.scss';

export default class RidingHeader extends React.Component {
  render() {
    return (
      <header className={css.header}>
        <h2 className={css.heading}>Riding of: {this.props.ridingName}</h2>
        <h3 className={css.subheading}>
          {this.props.ridingId} of {this.props.numRidings}
        </h3>
      </header>
    );
  }
}

RidingHeader.propTypes = {
  ridingName: PropTypes.string,
  ridingId: PropTypes.number,
  numRidings: PropTypes.number
};
