import React, { Component } from 'react';

//import { withI18n } from 'components/common';
import { Grid, GridCell } from 'components/layout/grid';

import CheckPermission from 'components/common/permission-wrapper';
//import subscribe from 'components/common/subscribe';

import WSReqUtils from 'utils/ws-request';

import NexysUtils from '@nexys/utils';
const { string: StringUtils } = NexysUtils;

// SOURCE: https://aerolab.co/blog/flexbox-grids
// -> search for "Fluid Grid Layout"
const toPageGrid = (functionalViews, list=false) => {
  class PageGrid extends Component {
    // TODO: load all page data via graphql into redux? apollo?
    renderMainView = (View, key, params) => {
      const { config } = this.props;
      const { requestCrud } = config;
      const { title, props, config: viewConfig } = params;

      // TODO: this makes views rerender when store changes, detail subscription should be higher up
      const WrappedView = View // subscribe(list ? "list" : "detail", false)(View);

      return (
        <WrappedView
          {...this.props}
          requestCrud={requestCrud}
          title={title}
          main={true}
          key={key + '-view'}
          {...props}
          {...viewConfig}
        />
      );
    }

    // TODO: move this code to functional view!
    renderAssociatedEntity = (View, params) => {
      let { config, id } = this.props;
      const { entityName, foreignEntity, attributes, props } = params;

      let foreignEntityName = entityName || StringUtils.lower(foreignEntity.name);
      let entity = config.entity;

      // TODO: make sure this works for n-n
      // TODO: do we need to keep componentType foreign?
      if (attributes) {
      // NOTE: get child attribute name for parent entity
        const childForeignAttribute = attributes.find(item => {
          return item.componentType === 'foreign' && StringUtils.lower(item.entity) === config.entity
        });
        if (childForeignAttribute) {
          entity = childForeignAttribute.name;
        }
      }

      // NOTE: use filters to keep only associated entities with parent entity id
      // !!! TODO: doesn't work for admin func view if attribute name differs from entity name, e.g. secretary: doctor vs employer !!!
      const filters = {[entity]: { uuid: id}};
      const requestCrud = WSReqUtils.crud(foreignEntityName, filters);
      console.log('h3')
      const WrappedView = View // subscribe('list', false)(withI18n(View));

      return (
        <WrappedView
          {...this.props}
          {...params}
          {...props}
          entity={config.entity}
          requestCrud={requestCrud}
          entityName={foreignEntityName}
          key={`${foreignEntityName}-view`}
        />
      );
    }

    renderView = (View, params, name) => {
      const { config, id } = this.props;
      const { title, props, config: viewConfig } = params;
      //todo
      const entity = 'user' // props && props.entity || config.entity;

      let requestCrud = null;

      if (name.toLowerCase().includes('statuslog')) {
        const request = {...config.requestCrud.detail(id)};
        if (name === 'statusLog') request.payload.params.wLog = true;
        requestCrud = {...config.requestCrud, detail: () => request};

        // NOTE: temporary fetch detail hack for statusLog
        //View = subscribe('detail', false)(View);
      } else {
        // TODO: wrap these functional views as well -> subscribeBusiness
        // TODO: => view definition
        if (isNaN(id)) {
          // NOTE: cms - file => need to pass entity too
          requestCrud = WSReqUtils.bizCrud(name)(id, entity === 'cms' ? entity : null);
          console.log('h8')
        } else {
          requestCrud = WSReqUtils.classicBizCrud(name)(entity, id);
          console.log('h0')
          console.log(name)
          console.log(requestCrud)
          console.log(View)
        }
      }

      return <View {...config} {...this.props} params={params} title={title} requestCrud={requestCrud} {...props} {...viewConfig} key={name + '-view'} />;
    }

    renderViews = page => {
      return functionalViews.map(({fv: params, View}, i) => {
        const key = `${page}-grid-cell-${i}`;
        const paramsKey = params.key || params.viewType.name;

        let view = paramsKey === 'associatedEntity' ? this.renderAssociatedEntity(View, params) : this.renderView(View, params, paramsKey);

        if (params.main) {
          view = this.renderMainView(View, key, params);
        }

        const checkedView = params.permission ? <CheckPermission permission={params.permission}>{view}</CheckPermission> : view;

        if (params.list) return checkedView;
        return <GridCell key={key} fullWidth={params.fullWidth}>{checkedView}</GridCell>;
      });
    }

    render() {
      // TODO: renderMain
      const { page } = this.props;
      return <Grid key={`${page}-grid`}>{this.renderViews(page)}</Grid>;
    }
  }

  return PageGrid;
}

export default toPageGrid;