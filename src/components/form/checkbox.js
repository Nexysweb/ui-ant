import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../uielements/checkbox';


class MyCheckbox extends Component {
  handleChange = e => {
    const { name, onChange } = this.props;
    onChange({name, value: e.target.checked});
  }

  render() {
    const { value, disabled, label } = this.props;

    return (
      <Checkbox
        checked={value}
        disabled={disabled}
        onChange={this.handleChange}>
        {label}
      </Checkbox>
    );
  }
}

MyCheckbox.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.node,
  onChange: PropTypes.func.isRequired,
};

export default MyCheckbox;
