'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import css from '../../../css/error.scss';

/*
 * source: https://reactjs.org/docs/error-boundaries.html
 * 
 * Catch errors in any components below and re-render with error message
 *
 */

export default class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className={css.error} aria-live="polite">
          [ <strong>Error</strong>: No data currently available. ]
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object
};
