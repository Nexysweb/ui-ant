import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withI18n } from 'components/common';

import LayoutContentWrapper from './layoutWrapper';
import LayoutContent from './layoutContent';
import PageHeader from './pageHeader';


class Layout extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <LayoutContentWrapper>
        <PageHeader>{title}</PageHeader>

        <LayoutContent>
          {children}
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default withI18n(Layout);