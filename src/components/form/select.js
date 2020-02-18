import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ReactSelect from 'react-select';

class Select extends Component {
  handleChange = (obj, ev) => {
    const { name, onChange, simple, multiple, value: values } = this.props;

    // TODO: multi select not reliable yet
    if (multiple) {
      if (ev.action === 'clear') onChange({name}, true);
      else {
        if (ev.option) {
          const value = values ? [...values, ev.option.value] : [ev.option.value];
          onChange({name, value});
        } else {
          const option = ev.removedValue;
          if (values.length === 1) onChange({name}, true);
          else onChange({name, value: values.filter(item => item !== option.value)});
        }
      }
    } else {
      if (simple) onChange(obj ? obj.value : null)
      else if (obj) {
        const { value } = obj;
        onChange({name, value});
      } else onChange({name, value: null});
    }
  }

  render() {
    // TODO: access ant theme
    const { name, disabled, placeholder, value, values, minWidth, clearable, multiple, inline } = this.props;

    // TODO: allowEmpty?
    let isClearable = true;
    if (clearable === false) isClearable = false;

    let options = [];
    if (values) {
      options = values.map(({id, uuid, name, label, title, url, color}) => ({value: id ? Number(id) : (uuid || null), label: name || label || title || url, color}));
    }

    const valueOption = options.find(item => isNaN(item.value) ? item.value === value : item.value === Number(value));

    const IndicatorSeparator = () => null;

    const Option = props => {
      const { color } = props.data;
      return <MyOption {...props.innerProps} color={color}>{props.children}</MyOption>;
    }

    const MultiValueContainer = props => {
      const { color } = props.data;
      return (
        <MyMultiValueContainer {...props} color={color} />
      );
    };

    const replacedComponents = {
      IndicatorSeparator,
      Option,
      MultiValueContainer,
    };

    // TODO: how to apply theme with custom components, how to get list of colors?
    const themeFn = theme => {
      return {
        ...theme,
        colors: {
          ...theme.colors,
          text: 'rgba(0, 0, 0, 0.45)',
          primary25: 'hotpink',
          primary: '#4482FF',
        },
      };
    };
    
    return (
      <MySelect
        key={`${name}_${valueOption.value}`}
        classNamePrefix="react-select"
        value={valueOption || null}
        components={replacedComponents}
        onChange={this.handleChange}
        isDisabled={disabled}
        placeholder={placeholder}
        isClearable={isClearable}
        isMulti={multiple}
        options={options}
        theme={themeFn}
        minWidth={minWidth}
        inline={inline}
      />
    );
  }
}

const MyMultiValueContainer = styled.div`
  display: flex;
  margin-left: 5px;

  &:first-child {
    margin: 0;
  }


`;

// TODO: use theme color
const MyOption = styled.div`
  line-height: 18px;
  padding: 5px 10px;

  ${props => props.color && `
    color: ${props.color} !important;
    font-weight: bold;
  `}

  &:hover {
    cursor: pointer;
    color: white !important;
    background-color: #4482FF;
  }
`;

const MySelect = styled(ReactSelect)`
  line-height: 15px;

  ${props => props.inline && `
    display: inline-block;
  `}
  
  ${props => props.minWidth && `
    min-width: ${props.minWidth}px;
  `}

  .react-select__menu {
    z-index: 2;
  }

  & > div {
    &:first-child {
      background-color: #fff;
      border: 1px solid #e9e9e9;
    }

    & > div {
      &:nth-child(2) {
        padding: 0 5px;

        div {
          padding: 0 !important;
        }
      }
    }
  }
`;

Select.propTypes = {
  allowEmpty: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
  simple: PropTypes.bool,
  value: PropTypes.number || PropTypes.string,
  values: PropTypes.array.isRequired
};

export default Select;