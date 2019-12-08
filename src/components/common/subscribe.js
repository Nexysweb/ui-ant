import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader, { PageLoader } from 'components/common/loader';
import withConnection from 'components/common/connection-wrapper';
import { setPageDataAction } from 'components/generic/detail/redux/actions';

import ReqUtils from 'utils/request';
import WsReqUtils from 'utils/ws-request';

import APIService from 'lib/api-service';
import WsUtils from 'utils/ws';

import NexysUtils from '@nexys/utils';
const { string: StringUtils } = NexysUtils

const getDisplayName = a => a;

const subscribe = (action, page=true) => MainComponent => {
  class Subscription extends Component {
    constructor(props) {
      super(props);

      const loading = true;

      let request = null;

      if (props.request) {
        request = props.request;
      } else {
        const requestCrud = props.requestCrud || props.config.requestCrud;

        switch (action) {
          case 'detail': {
            request = requestCrud.detail(props.id);
            break;
          }
          default: {
            request = requestCrud.list;
          }
        }
      }

      this.state = {
        loading,
        request,
        data: null
      };
    }

    componentDidMount() {
      this.reload();
    }

    componentWillUnmount() {
      const { wsConnection: connection } = this.props;
      connection.removeEventListener('message', this.handleMessage); 
    }

    componentWillReceiveProps(nextProps) {
      // NOTE: if a specific request is given -> reload when newProps are passed
      if (nextProps.request) {
        this.setState({request: nextProps.request}, this.reload);
      }
    }

    updateData = data => {
      const { dataMapping } = this.props;
      if (dataMapping) data = dataMapping(data);

      this.setState({data, loading: false});
    }

    handleMessage = event => {
      const { request } = this.state;
      const { params, payload } = request;
      const { setPageData, main } = this.props;

      const json = JSON.parse(event.data);
      const { params: wsParams, data } = json;
      const { action, type, apiParams } = wsParams;

      if (wsParams && action === params.action && type === params.type) {
        if (type !== 'entity' || (type === 'entity' && apiParams.entity === payload.params.entity)) {
          // TODO: dispatch data into store?
          if (data.bad) {
            // catch bad requests
            this.updateData([]);
            console.log("Bad request for subscription: ", data);
          } else {
            this.updateData(data);
            // TODO: make setPageData a prop
            if (main && setPageData) setPageData(apiParams.entity, data);
          }
        }
      }
    }

    reload = () => {
      if (!this.state.loading) this.setState({loading: true});

      const { request } = this.state;
      const { wsConnection: connection, fetch, setPageData, main } = this.props;

      if (request.ws) {
        connection.addEventListener('message', this.handleMessage);
        // need to wait until connection is successful
        WsUtils.send(connection, request);
      } else {
        const self = this;
        if (fetch) {
          fetch(request);
        } else {
          APIService.execRequest(request, data => {
            self.updateData(data);
            // TODO: make setPageData a prop
            if (main && setPageData) setPageData("detail", data);
          }, () => {});
        }
      }
    }

    render() {
      const { loading, data } = this.state;

      // TODO: if list: values=data
      return loading ? (page ? <PageLoader /> : <Loader />) : <MainComponent {...this.props} data={data} values={data} reload={this.reload} />;
    }
  }

  Subscription.displayName = `Subscription(${getDisplayName(MainComponent)})`;
  return connect(null, { setPageData: setPageDataAction })(withConnection(Subscription));
}

export const entitySubscribe = (entityList, classic=false) => MainComponent => {
  class EntitySubscription extends Component {
    constructor(props) {
      super(props);

      const { config } = props;
      
      const entities = entityList || props.entities || (config && config.entities);

      // NOTE: can receive entities as objects with classic flag set
      if (entities && entities.length > 0) {
        this.state = {
          loading: true,
          entities: {},
          prerequests: entities
        }
      } else {
        this.state = {
          loading: false
        }
      }
    }

    componentDidMount() {
      this.load();
    }

    componentWillUnmount() {
      const { wsConnection: connection } = this.props;
      connection.removeEventListener('message', this.handleMessage({}));
    }

    createRequest = (entity, isClassic, isPost, params={}, crud) => {
      console.log('h4')
      return (classic || isClassic || crud) ? ((isPost || crud) ? ReqUtils.urlCrud(entity, params, crud).list : ReqUtils.classicCrud(entity).list) : WsReqUtils.crud(entity).list
    };sdf


    // TODO: define mapping in form
    processData = (entity, data) => {
      if (entity === 'user') {
        return data.map(({id, profile: {firstName, lastName}}) => ({id, name: `${firstName} ${lastName}`}));
      }
      if (entity === 'contact') {
        return data.map(({id, firstName, lastName}) => ({id, name: `${firstName} ${lastName}`}));
      }
      if (entity.includes('address')) {
        return data.map(({id, street, zip, city, country}) => ({id, name: `${street}, ${zip} ${city}, ${country.name}`}));
      }
      /*
      if (entity == 'translate') {
        return data.map(({id, key}) => ({id, name: key}));
      }*/
      return data;
    }

    updateData = (entity, data) => this.setState(prevState => ({
      ...prevState,
      entities: {
        ...prevState.entities,
        // TODO: replace processData with mapping
        [entity]: this.processData(entity, data)
      }
    }));

    handleMessage = params => event => {
      const json = JSON.parse(event.data);
      const { params: wsParams, data } = json;
      const { action, type, apiParams } = wsParams;

      const entity = undefined
      const completed = false;

      if (wsParams && action === params.action && type === params.type && typeof entity !== 'undefined' && apiParams.entity === entity) {
        this.updateData(entity, data);
        completed[entity] = true;
        if (Object.values(completed).every(v => v)) {
          this.setState({loading: false});
        }
      }
    }

    load = data => {
      const { prerequests, entities } = this.state;
      if (!entities) return null;

      const requests = prerequests
        .map(entity => StringUtils.lower(entity))
        .filter(item => {
          return data && (typeof item.params === 'function' || !(typeof item.params === 'function'))
        })
        .map(item => {
          if (item.classic || item.crud) {
            let { entity, classic: isClassic, post: isPost, params, crud } = item;
            if (typeof params === 'function') params = params(data);
            const request = this.createRequest(entity, isClassic, isPost, params, crud);
            return {...item, request};
          } else {
            const request = this.createRequest(item);
            return {entity: item, request};
          }
        });

      const { wsConnection: connection } = this.props;

      const completed = {};
      for (const reqWrapper of requests) {
        const { entity, request, classic: isClassic, crud, mapping, filter } = reqWrapper;
        const { params } = request;

        if (classic || isClassic || crud) {
          const onSuccess = data => {
            if (mapping) {
              data = data.map(item => {
                return {...mapping(item)};
              });
            }
            if (filter) {
              data = data.filter(filter);
            }
            this.updateData(entity, data);
            completed[entity] = true;
            if (Object.values(completed).every(v => v)) {
              this.setState({loading: false})
            }
          }
          APIService.execRequest(request, onSuccess, () => {});
        } else {
          // listen to onmessage event
          connection.addEventListener('message', this.handleMessage(params));
            
          // need to wait until connection is successful
          WsUtils.send(connection, request);
        }
      }
    }

    render() {
      const { loading, entities } = this.state;

      /*
        Warning: Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
        To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
      */

      return loading ? <Loader /> : <MainComponent {...this.props} entities={entities} entityReload={this.load} />;
    }
  }

  EntitySubscription.displayName = `EntitySubscription(${getDisplayName(MainComponent)})`;
  return withConnection(EntitySubscription);
}

export default subscribe;