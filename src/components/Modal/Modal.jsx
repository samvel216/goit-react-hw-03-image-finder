import styles from './Modal.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydown);
  }

  keydown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    const { src } = this.props;
    return (
      <div
        className={styles.Overlay}
        onClick={this.handleBackdropClick}
      >
        <div className={styles.Modal}>
          <img src={src} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  src: PropTypes.string.isRequired,
};
