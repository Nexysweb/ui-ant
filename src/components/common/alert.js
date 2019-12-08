import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AlertAnt from '../feedback/alert';

class Alert extends Component {
  render() {
    const { children, className, closable, onDismiss, showIcon, style } = this.props;
    let { color } = this.props;

    if (color === 'danger') color = 'error';

    const alert = (
      <AlertAnt
        closable={closable}
        message={children}
        onClose={onDismiss}
        showIcon={showIcon}
        type={color}
        style={{
          ...style,
          fontSize: 14
        }}
      />
    );

    if (className) {
      return (
        <div className={className}>
          {alert}
        </div>
      )
    }

    return alert;
  }
}

Alert.propTypes = {
  /** displays a certain color: {danger, warning, success} */
  color: PropTypes.string,
  /** content of the alert element */
  children: PropTypes.node.isRequired,
  /** does not work ... */
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  showIcon: PropTypes.bool
};

export default Alert;
