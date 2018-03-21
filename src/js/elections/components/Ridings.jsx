'use strict';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Bar from './Bar.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import RidingHeader from './RidingHeader.jsx';
import TextSummary from './TextSummary.jsx';
import TotalVotes from './TotalVotes.jsx';

import css from './ridings.scss';

export default class Ridings extends React.Component {
  render() {
    const ridings = this.props.allRidings
      ? this.props.allRidings.map(riding => (
          <article key={`art_${riding.id}`} className={css.riding} id={`art_${riding.id}`}>
            {
              <Fragment>
                <RidingHeader ridingName={riding.name} key={`heading_${riding.id}`} />
                <ErrorBoundary>
                  <ol className={css.riding__list}>
                    <Bar ridingResults={riding.results} key={riding.id} />
                  </ol>
                </ErrorBoundary>

                <TextSummary riding={riding} key={riding.name} />

                <TotalVotes riding={riding} key={`voteTotal_riding-${riding.id}`} />
              </Fragment>
            }
          </article>
        ))
      : null;
    return ridings;
  }
}

Ridings.propTypes = {
  allRidings: PropTypes.array
};
