import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from 'components/business/list';


class ListView extends Component {
  render() {
    const {
      data,
      columns,
      entities,
      uriPrefix,
      selectedValues,
      listConfig: config,
      reload
    } = this.props;

    // defines whether we display a link to the detail view
    // const isView = typeof this.props.isView !== 'undefined' ? this.props.isView : true;

    const listConfig = {
      simple: true,
      ...config
    };

    return (
      <List
        values={data}
        columns={columns}
        entities={entities}
        config={listConfig}
        selectedValues={selectedValues}
        onSuccess={reload}	
        uriPrefix={uriPrefix}
      />
    );
  }
}

ListView.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired
};

export default ListView;