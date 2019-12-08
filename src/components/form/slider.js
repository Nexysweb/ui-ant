import React from 'react';
import PropTypes from 'prop-types';

import { Slider } from 'antd';


class MySlider extends React.Component {
  handleChange = value => {
    const { name, onChange } = this.props;
    onChange({name, value});
  }

  render() {
    const { disabled, marks, max, min, range, step, value } = this.props;

    return (
      <Slider
        disabled={disabled}
        marks={marks}
        max={max}
        min={min}
        onChange={this.handleChange}
        range={range}
        step={step}
        value={value}
        />
    );
  }
}

MySlider.propTypes = {
  disabled: PropTypes.bool,
  marks: PropTypes.object,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  range: PropTypes.bool,
  step: PropTypes.number,
  value: PropTypes.node.isRequired
};

export default MySlider;
