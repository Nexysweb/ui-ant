import React, { Component } from 'react';
import Tabs from 'components/common/tabs';

export const withTabs = (tabs, activeKeyId) => MainComponent => {
  class TabsWrapper extends Component {
    render() {
      return (
        <div>
          <Tabs tabs={tabs} activeKeyId={activeKeyId} />
          <MainComponent {...this.props} />
        </div>
      );
    }
  }

  return TabsWrapper;
}