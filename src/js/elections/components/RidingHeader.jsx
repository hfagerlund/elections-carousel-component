'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import css from './ridingHeader.scss';

export default class RidingHeader extends React.Component {
  render() {
    return (
      <header className={css.header}>
        <h2 className={css.heading}>Riding of: {this.props.ridingName}</h2>
      </header>
    );
  }
}

RidingHeader.propTypes = {
  ridingName: PropTypes.string
};
