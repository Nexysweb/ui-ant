import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
//import { connect } from 'react-redux';

import { Panel, Icon } from 'components';
import { withI18n } from 'components/common';
import { List as Layout, Row, Col } from 'components/layout';
import List from 'components/business/list';
import { withTabs } from 'components/common/withTabs';

import toPageGrid from '../detail/page-grid';

import viewDictionary from 'components/generic/view-dict';
//import subscribe from 'components/common/subscribe';

//import { setPageFilterAction } from '../detail/redux/actions';
//


import DigisUtil from '@nexys/digis-i18n';

const { Request } = DigisUtil;

class ListLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {data: null};
  }

  componentDidMount() {
    const { config: {requestCrud: { list: r } } } = this.props;

    Request.fetch(r.uri, r.payload, r.method).then(data => {
      this.setState({data});
    });
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    if (this.props.user.data === nextProps.user.data && this.props.config === nextProps.config) {
      return false;
    } else return true;
  } */

  reloadRoute = () => {
    const { history, location } = this.props;
    history.push({ pathname: "/" });
    history.replace({ pathname: location.pathname });
  }

  assembleViews = (list, views, config) => {
    const funcViews = views.map(conf => ({
      fv: conf,
      View: conf.component || (
        conf.main ? this.renderList(list, config, 2, true, conf.title) :
        viewDictionary(conf.key || conf.viewType.name) 
      )
    }));
    const Grid = toPageGrid(funcViews, list=true);
    return Grid;
  }

  renderList = (list, config, numTabs, panel=false, title) => {
    const { data } = this.state;
    const { reload } = this.props;
    
    const { props, config: listConfig } = list;
    const { extra: extraFn } = listConfig;
    const extra = extraFn && extraFn(reload);

    const ListC = ({onSuccess}) => (
      <List
        {...props}
        uriPrefix={config.routes.prefix}
        onSuccess={onSuccess}
        columns={list.columns}
        values={data}
        config={{
          ...list.config,
          extra,
          simple: numTabs > 1
        }}
      />
    );

    if (panel) return props => <Panel title={title}><ListC {...props} /></Panel>;
    else return ListC;
  };

  renderRoute = (tabs, config, list, idx, head=false) => {
    const { root, reload } = this.props;
    const uriTabPrefix = config.routes.prefix + '/list';
    const uriPrefix = root ? config.routes.prefix : uriTabPrefix;
    const tab = tabs[idx];
    const uri = head ? uriPrefix : `${uriPrefix}/${tab}`;

    const numTabs = tabs.length;
    const ListView = (
      list.key ? viewDictionary(list.key) : 
      (list.views ? this.assembleViews(list, list.views, config) :
       this.renderList(list, config, numTabs)
      )
    );

    const PageWithTabs = withTabs(tabs, config, uriTabPrefix, idx)(ListView);

    // NOTE: generic flag not needed, because `entity` do not have listPages
    if (root) {
      if (numTabs > 1) {
        // generic
        return <PageWithTabs {...this.props} page={list.key || tab} onSuccess={reload} reloadRoute={this.reloadRoute} />;
      } else {
        return <ListView {...this.props} page={list.key || tab} onSuccess={reload} reloadRoute={this.reloadRoute} />;
      }
    }

    return (
      <Route
        exact
        key={`${tab}-${head ? 'root' : idx}`}
        path={uri}
        render={props => (
          <PageWithTabs
            {...this.props}
            {...props}
            onSuccess={reload}
            page={list.key || tab}
            reloadRoute={this.reloadRoute} 
          />
        )}
      />
    );
  }

  renderPages = () => {
    const { config, root } = this.props;
    const { list: pages } = config;
    const [list] = pages;
    const tabs = pages.map(p => p.tab || p.key);
    const rootRoute = this.renderRoute(tabs, config, list, 0, true);

    if (root) return rootRoute;

    if (pages.length > 1) {
      const listPages = pages.map((list, i) => this.renderRoute(tabs, config, list, i));
      const listRoutes = [rootRoute];
      return listRoutes.concat(listPages);
    }

    return rootRoute;
  }

  render() {
    const { config, translate, user } = this.props;
    const { list: pages, add } = config;
    const [list] = pages;

    if (config.withoutLayout) return (
      <Fragment>
        <Row>
          <Col xs={24} className="text-right">
            <Link to={`${config.routes.prefix}/add`}>
              <Icon name="plus-circle"/>
              &nbsp;
              {translate('add')}
            </Link>
          </Col>
        </Row>
        {this.renderPages()}
      </Fragment>
    );

    const extra = add && (typeof add.extra === 'function' ? add.extra(this.reloadRoute) : add.extra);
    const btn = add && (typeof add.btn === 'function' ? add.btn(this.reloadRoute) : add.btn);

    const addBtn = !config.withoutAdd && add && (!add.permission || user.data.checkPermission(add.permission));
    return (
      <Layout
        entityName={config.entity}
        uriPrefix={config.routes.prefix}
        breadcrumbs={list.breadcrumbs || config.breadcrumbs}
        btn={btn}
        extra={extra}
        add={addBtn}>
        {this.renderPages()}
      </Layout>
    );
  }
}

export default withI18n(ListLayout)


// TODO: get user from context API
//export default subscribe()(connect(state => ({ user: { ...state.User.toJS() }}), { setPageFilter: setPageFilterAction })(withRouter(withI18n(ListLayout))));
