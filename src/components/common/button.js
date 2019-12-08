import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../uielements/button';

class MyButton extends Component {
  render() {
    const { children, submit, color, type, round } = this.props;

    const htmlType = submit ? 'submit' : 'button';

    const content = type === 'icon' ? null : children;
    const icon = type === 'icon' ? children.props.name : null;
    const shape = round ? "circle" : null;

    return (
      <Button
        shape={shape}
        {...this.props}
        type={color}
        htmlType={htmlType}
        icon={icon}>
        {content}
      </Button>
    );
  }
}

MyButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  submit: PropTypes.bool,
  shape: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.bool
};

export default MyButton;
