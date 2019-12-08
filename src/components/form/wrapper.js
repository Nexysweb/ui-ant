import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Form } from 'antd';

class Wrapper extends Component {
  renderHelp = () => {
    const { errors, name, label } = this.props;

    if (label && errors && name in errors) {
      return <ErrorWrapper>{errors[name].map((e, i) => <span key={i}>{e}<br/></span>)}</ErrorWrapper>;
    }

    return null;
  }

  render() {
    const {
      name,
      errors,
      label,
      required,
      inline,
      noMargin,
      children
    } = this.props;

    const formLabel = label && (required ? label : <span>{label} - <i>Optional</i></span>);
    // NOTE: alternative required={required}

    const validateStatus = errors && errors[name] ? 'error' : '';

    // TODO: pass on name to children
    return (
      <FormItem
        label={formLabel}
        inline={inline || false}
        validateStatus={validateStatus}
        help={this.renderHelp()}
        noMargin={noMargin}>
        {children}
      </FormItem>
    );
  }
}

const FormItem = styled(Form.Item)`
  margin-bottom: 0px !important;
  margin-top: ${props => props.noMargin ? '0px' : '10px'} !important;
  
  ${props => props.inline && `
      .ant-form-item-label, .ant-form-item-control-wrapper {
        display: inline-block !important;
      }
  `}

  .ant-form-item-label label {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    color: #444;

    i {
      text-transform: none;
    }
    
    &:after {
      content: none;
    }
  }

  .ant-form-item-control.has-error {
    .ant-input {
      border-color: #ff6060;
      border-width: 2px;
    }

    .react-select__control {
      border-color: #ff6060;
      border-width: 2px;
    }

    .react-select__control--is-focused {
      border-color: #2684ff;
      border-width: 1px;
    }
  }
`;

const ErrorWrapper = styled.span`
  display: flex;
  font-size: 12px;
  padding: 4px 0 0 7px;
  font-style: italic;
  flex-direction: column;

  span {
    margin-top: 5px;

    &:first-child {
      margin: 0;
    }
  }
`;

Wrapper.propTypes = {
  children: PropTypes.node,
  errors: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string
};

export default Wrapper;