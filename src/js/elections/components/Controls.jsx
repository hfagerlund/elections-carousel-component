'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import css from '../../../css/controls.scss';

export default class Controls extends React.Component {
  constructor() {
    super();
    this.state = {
      prevButtonDisabled: true,
      nextButtonDisabled: false
    };
    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.controlsEnabled !== nextProps.controlsEnabled) {
      this._checkControlsEnabled(nextProps.controlsEnabled);
    }
  }

  componentDidMount() {
    this._checkControlsEnabled(this.props.controlsEnabled);
  }

  _checkControlsEnabled(enabled) {
    this.forceUpdate();

    if (enabled === false) {
      this.setState({ nextButtonDisabled: true, prevButtonDisabled: true });
    } else {
      this.setState({ nextButtonDisabled: false, prevButtonDisabled: true });
    }
  }

  handleClickNext() {
    if (this.props.count < this.props.maxCount - 1) {
      this.setState({ nextButtonDisabled: false, prevButtonDisabled: false });
      this.props.callback(this.props.count + 1);
      this.props.position(this.props.count + 1);
    }

    if (this.props.count >= this.props.maxCount - 2) {
      this.setState({ nextButtonDisabled: true, prevButtonDisabled: false });
    }
  }

  handleClickPrevious() {
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
          onClick={this.handleClickPrevious}
        />
        <button
          aria-label="Next riding"
          disabled={this.state.nextButtonDisabled}
          className={[
            css.ctrl,
            css.ctrlNext,
            this.state.nextButtonDisabled ? 'ctrlDisabled' : ''
          ].join(' ')}
          onClick={this.handleClickNext}
        />
      </div>
    );
  }
}

Controls.defaultProps = {
  controlsEnabled: true
};

Controls.propTypes = {
  controlsEnabled: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  maxCount: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  position: PropTypes.func.isRequired
};
