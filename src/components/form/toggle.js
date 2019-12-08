import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Switch from '../uielements/switch';

class MyToggle extends Component {
  handleChange = value => {
    const { name, onChange } = this.props;
    onChange({name, value});
  }

  render() {
    const { value, disabled } = this.props;

    return (
      <Switch
        checked={value}
        disabled={disabled}
        onChange={this.handleChange}
      />
    );
  }
}

MyToggle.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default MyToggle;
