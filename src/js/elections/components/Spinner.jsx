'use strict';
import React from 'react';

import css from '../../../css/spinner.scss';

export default class Spinner extends React.Component {
  render() {
    return (
      <div
        className={css.loader}
        aria-atomic="true"
        aria-busy="true"
        aria-labelledby="results"
        aria-live="polite"
        role="region"
      >
        <h2 className={css.visuallyHidden} id="results">
          Loading Poll Updates
        </h2>
        <div
          aria-describedby="loadingStatus"
          aria-valuemin="0"
          aria-valuemax="100"
          className={css.spinner}
          role="progressbar"
          tabIndex="0"
        >
          <p className={css.statusLoading} id="loadingStatus">
            Loading data&hellip;
          </p>
        </div>
      </div>
    );
  }
}
