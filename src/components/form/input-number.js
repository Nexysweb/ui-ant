import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputNumber from '../uielements/InputNumber';


class MyNumberInput extends Component {
  handleChange = value => {
    const { name, onChange } = this.props;
    onChange({name, value});
  }

  handleBlur = value => {
    const { name, onBlur } = this.props;
    if (onBlur) {
      onBlur({name, value});
    }
  }

  formatter = value => {
    const { endAdornment, startAdornment } = this.props;
    const prefix = startAdornment || '';
    const suffix = endAdornment || '';
    return `${prefix}${value}${suffix}`;
  }

  render() {
    const { disabled, max, min, placeholder, integer, size, value } = this.props;
    let { precision, parser } = this.props;

    if (integer) {
      precision = 1;
      parser = value => isNaN(value) ? 0 : parseInt(value);
    }

    return (
      <InputNumber
        disabled={disabled}
        formatter={this.formatter}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        placeholder={placeholder}
        step={precision || 0.1}
        parser={parser}
        value={value}
        size={size}
        max={max}
        min={min}
      />
    );
  }
}

MyNumberInput.propTypes = {
  disabled: PropTypes.bool,
  endAdornment: PropTypes.node,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  parser: PropTypes.func,
  placeholder: PropTypes.string,
  precision: PropTypes.number,
  size: PropTypes.string,
  startAdornment: PropTypes.node,
  value: PropTypes.node
}

export default MyNumberInput;
