import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Detail as Layout } from 'components/layout';
import { Alert } from 'components';
//import { withTabs } from 'components/common/withTabs';
import { withI18n } from 'components/common';

import viewDictionary from 'components/generic/view-dict';
import Deletion from 'components/business/deletion';

import toPageGrid from './page-grid';

class DetailLayout extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.user.data === nextProps.user.data && this.props.config === nextProps.config) {
      return false;
    } else return true;
  }

  reloadRoute = () => {
    const { history, location } = this.props;
    history.push({ pathname: "/" });
    history.replace({ pathname: location.pathname });
  }

  assembleViews = views => {
    const funcViews = views.map(conf => ({
      fv: conf,
      View: conf.component || viewDictionary(conf.key || conf.viewType.name)
    }));
    const Grid = toPageGrid(funcViews);
    return Grid;
  }

  // NOTE: renders either single page or several pages with tabs above
  renderPages = id => {
    const { config, translate } = this.props;
    const { detail: pages } = config;

    // NOTE: filter pages py permission
    const filteredPages = pages //.filter(item => !item.permission || user.data.checkPermission(item.permission));

    if (filteredPages.length === 0) return <Alert>{translate('layout.none')}</Alert>;

    if (filteredPages.length > 1) {
      const uriPrefix = config.routes.prefix;
      // router uri takes `id` as placeholder
      const uriPrefixRouter = `${uriPrefix}/:id`;
      // tabs router takes actual id
      //const uriPrefixTabs = `${uriPrefix}/${id}`;

      /*const tabs = filteredPages.map(({key, tab}) => {
        if (tab) return { key, tab };
        else return key;
      });*/

      return (
        <Switch>
          {filteredPages.map((p, i) => {
            // TODO: for now page has to be detail (React router does not support array of paths) 
            const uri = `${uriPrefixRouter}/${p.key}`;

            //const Grid = this.assembleViews(p.views);
            //const PageWithTabs = withTabs(tabs, config, uriPrefixTabs, i)(Grid);

            /*const pw = <PageWithTabs
                    {...this.props}
                    {...props}
                    id={id}
                    page={p.key}
                    generic
                    reloadRoute={this.reloadRoute}
                  />*/

            console.log('view')
            console.log(p.views)

            return (
              <Route
                key={`${p.key}-${id}-${i}`}
                path={uri}
                render={props =>
                  null
                }
              />
            );
          })}
        </Switch>
      );
    }

    const [detail] = pages;
    if (detail.component) { 
      const Page = detail.component;
      return <Page {...this.props} reloadRoute={this.reloadRoute} />;
    }

    const Grid = this.assembleViews(detail.views);
    return <Grid {...this.props} id={id} page="detail" key={`detail-${id}`} reloadRoute={this.reloadRoute} />;
  }

  render() {
    const { config } = this.props;
    const { detail: pages } = config;

    const { match: { params: { id: paramsId }} } = this.props;
    const id = !isNaN(paramsId) ? Number(paramsId) : paramsId;

    const { entity, requestCrud, routes } = config;

    const deleteRequest = requestCrud.delete(id);

    const deletion = (
      <div className="top-30">
        <Deletion
          request={deleteRequest}
          redirectUri={routes.prefix}
        />
      </div>
    );

    const [detail] = pages;

    if (config.withoutLayout || detail.withoutLayout) {
      return (
        <Fragment>
          {this.renderPages(id)};
          {!config.withoutDeletion && deletion}
        </Fragment>
      );
    }

    return (
      <Layout
        entityName={entity}
        breadcrumbs={detail.breadcrumbs || config.breadcrumbs || []}
        uriPrefix={routes.prefix}>
        {this.renderPages(id)}
        {!config.withoutDeletion && deletion}
      </Layout>
    );
  }
}

DetailLayout.propTypes = {
  config: PropTypes.object.isRequired
};

export default withI18n(DetailLayout);

// TODO: get user from context API
//export default withRouter(withI18n(connect(state => ({ user: {...state.User.toJS()} }), { setPageFilter: setPageFilterAction })(DetailLayout)));