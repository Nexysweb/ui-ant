import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Icon } from '../';

import Input from '../uielements/input';

class MyInput extends React.Component {
  handleChange = e => {
    const {name, onChange} = this.props;
    onChange({name, value: e.currentTarget.value});
  }

  handleClear = e => {
    const {name, onChange} = this.props;
    onChange({name, value: ''});
  }

  handleBlur = e => {
    const {name, onBlur} = this.props;
    if (onBlur) {
      onBlur({name, value: e.currentTarget.value});
    }
  }

  render() {
    let { disabled, endAdornment, placeholder, size, startAdornment, type, value, handleKeys, clearable, width } = this.props;
    width = width || '100%';

    return (
      <div style={{position: 'relative', width, lineHeight: 0}}>
        <Input
          addonAfter={endAdornment}
          addonBefore={startAdornment}
          disabled={disabled}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          placeholder={placeholder}
          onKeyDown={handleKeys}
          size={size}
          type={type}
          value={value}
        />
        {clearable && value && <Clear isLast={!endAdornment} onClick={this.handleClear}><Icon name="close" /></Clear>}
      </div>
    );
  }
}

const Clear = styled.span`
  position: absolute;
  z-index: 99999;
  right: ${props => props.isLast ? 10 : 45}px;
  margin-top: 10px;
  cursor: pointer;
`

MyInput.propTypes = {
  disabled: PropTypes.bool,
  endAdornment: PropTypes.node,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  startAdornment: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.node
}

export default MyInput;
