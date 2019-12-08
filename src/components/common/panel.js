import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card } from 'antd';


class Panel extends Component {
  render() {
    const { title, className, children, extra, disabled } = this.props;

    const props = this.props;// DSUtils.removeProp(this.props, 'maxHeight');

    return (
      <StyledCard
        {...props}
        title={title}
        style={{fontWeight: 300}}
        className={className}
        disabled={disabled}
        extra={extra}>
        {children}
      </StyledCard>
    );
  }
}

const StyledCard = styled(Card)`
  ${props => props.maxHeight && `
    .ant-card-body {
      max-height: ${props.maxHeight}px; 
      overflow-y: scroll;
    }
  `};

  &.ant-card-bordered {
    border: 3px solid #f3f3f3;
    border-radius: 5px;
  }

  .ant-card-head {
    border-bottom: 2px solid #f3f3f3;
  }

  .ant-card-extra {
    opacity: 1 !important;
  }

  @media (max-width: 768px) {
    .ant-card-body { 
      padding: 10px;
    }
  }

  @media (max-width: 580px) {
    margin-left: -10px;
    margin-right: -10px;

    .ant-card-bordered {
      border-left: none;
      border-right: none;
    }
  }

  ${props => props.disabled && `
    opacity: 0.5;
  `}
`;

Panel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  extra: PropTypes.node,
  title: PropTypes.string
};

export default Panel;
