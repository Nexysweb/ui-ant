import React, { Component } from 'react';
import Tabs from 'components/business/tabs';

// merge withtabsSimple (use withTabSimple here to removen complexity)
export const withTabs = (tabs, config, uriPrefix, activeKeyId) => MainComponent => {
  class TabsWrapper extends Component {
    render() {
      const { generic } = this.props;

      // TODO: use props, not params const { config } = this.props;
      const entity = config.entity;
      return (
        <div>
          <Tabs tabs={tabs} entity={!generic && entity} uriPrefix={uriPrefix} activeKeyId={activeKeyId} />
          <MainComponent {...this.props} config={config} />
        </div>
      );
    }
  }

  return TabsWrapper;
}