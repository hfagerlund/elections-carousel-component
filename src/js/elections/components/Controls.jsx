'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import css from './controls.scss';

export default class Controls extends React.Component {
  constructor() {
    super();
    this.state = {
      prevButtonDisabled: true,
      nextButtonDisabled: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.count > 0) {
      this.props.callback(this.props.count - 1);
      this.props.position(this.props.count - 1);

      if (this.props.count <= 1) {
        this.setState({ nextButtonDisabled: false, prevButtonDisabled: true });
      }
    }

    if (this.props.count > 1 && this.props.count <= this.props.maxCount - 1) {
      this.setState({ nextButtonDisabled: false, prevButtonDisabled: false });
    }
  }

  render() {
    return (
      <div className={css.wrapper}>
        <button
          aria-label="Previous riding"
          disabled={this.state.prevButtonDisabled}
          className={[
            css.ctrl,
            css.ctrlBack,
            this.state.prevButtonDisabled ? 'ctrlDisabled' : ''
          ].join(' ')}
          onClick={this.handleClick}
        />
        <button
          aria-label="Next riding"
          disabled={this.state.nextButtonDisabled}
          className={[
            css.ctrl,
            css.ctrlNext,
            this.state.nextButtonDisabled ? 'ctrlDisabled' : ''
          ].join(' ')}
          //demo of inline syntax (versus click handler 'handleClick())
          onClick={() => {
            if (this.props.count < this.props.maxCount - 1) {
              this.setState({ nextButtonDisabled: false, prevButtonDisabled: false });
              this.props.callback(this.props.count + 1);
              this.props.position(this.props.count + 1);
            }

            if (this.props.count >= this.props.maxCount - 2) {
              this.setState({ nextButtonDisabled: true, prevButtonDisabled: false });
            }
          }}
        />
      </div>
    );
  }
}

Controls.propTypes = {
  count: PropTypes.number.isRequired,
  maxCount: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  position: PropTypes.func.isRequired
};
