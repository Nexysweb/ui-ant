import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import { default as TabsDefault, TabPane } from '../uielements/tabs';

class Tabs extends Component {
  renderTabs() {
    const { tabs } = this.props;

    return tabs.map((x, i) => {
      const uri = x.uri || x.url;
      const label = x.name || x.label;
      return <TabPane tab={<Link to={uri}>{label}</Link>} key={`tab-${i}`} />;
    });
  }

  render() {
    const { activeKeyId } = this.props;

    // NOTE: get the active key, if any. By default set to 0
    const activeKeyIdx = `tab-${String(activeKeyId || 0)}`;

    return (
      <StyledTabs activeKey={activeKeyIdx}>
        {this.renderTabs()}
      </StyledTabs>
    );
  }
}

const StyledTabs = styled(TabsDefault)`
  @media (max-width: 580px) {
    margin-left: -10px !important;
    margin-right: -10px !important;
  }
`;

Tabs.propTypes = {
  /** array of object: {label, uri} */
  tabs: PropTypes.array.isRequired,
  /** active key index */
  activeKeyId: PropTypes.number
};

export default Tabs;
