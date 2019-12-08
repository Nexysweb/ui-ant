import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Breadcrumb } from 'antd';


class Breadcrumbs extends Component {
  renderBreadcrumb = (item, id) => {
    return (
      <Breadcrumb.Item key={`breadcrumb-${id}`}>
        {item.link ?
          <Link to={item.link}>{item.label}</Link>
          : <span>{item.label}</span>
        }
      </Breadcrumb.Item>
    )
  }

  render() {
    let { values, withRoot } = this.props;

    if (withRoot) {
      values = [{ label: 'Home', link: '/app' }].concat(values);
    }
   
    return (
      <StyledBreadcrumb>
        {values.map((item, id) => this.renderBreadcrumb(item, id))}
      </StyledBreadcrumb>
    );
  }
}

const StyledBreadcrumb = styled(Breadcrumb)`
  @media (max-width: 580px) {
    padding: 10px !important;
  }
`

export default Breadcrumbs;