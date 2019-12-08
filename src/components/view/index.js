import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Add from './add';
import Detail from './detail';
import List from './list';
import KeyValue from './key-value';

export {
  Add,
  Detail,
  List,
  KeyValue
};

class ViewIndex extends Component {
  render() {
    const {
      entityName,
      uriPrefix,
      urlApiPrefix,
      columns,
      itemInit
    } = this.props;

    const url = uriPrefix;

    const ListRoute = props => (
      <List
        {...props}
        columns={columns}
        entityName={entityName}
        uriPrefix={uriPrefix}
        viewType="list"
      />
    );

    const AddRoute = props => (
      <Add
        {...props}
        itemInit={itemInit || {}}
        entityName={entityName}
        uriPrefix={uriPrefix}
        urlApi={`${urlApiPrefix}/insert`}
      />
    );

    const DetailRoute = props => {
      const id = Number(props.match.params.id);

      // TODO: urlApi -> apiUri: prefix/id suffices, detail & update can be added in component
      const urlApi = `${urlApiPrefix}/${id}/detail`;
      const urlApiUpdate = `${urlApiPrefix}/${id}/update`;
      return (
        <Detail
          {...props}
          id={id}
          rows={columns}
          entityName={entityName}
          uriPrefix={uriPrefix}
          urlApiPrefix={urlApiPrefix}
          viewType="detail"
        />
      );
    }

    return (
      <Switch>
        <Route exact path={`${url}`} component={ListRoute}/>
        <Route exact path={`${url}/add`} component={AddRoute}/>
        <Route path={`${url}/:id/detail`} component={DetailRoute}/>
        <Route path={`${url}/:id/edit`} component={DetailRoute}/>
      </Switch>
    );
  }
}

ViewIndex.propTypes = {
  entityName: PropTypes.string.isRequired,
  uriPrefix: PropTypes.string.isRequired,
  urlApiPrefix: PropTypes.string.isRequired,
  elements: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
  itemInit: PropTypes.object
};

export default ViewIndex;