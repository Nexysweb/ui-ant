import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { KeyValue } from 'components/view';


class View extends Component {
  render() {
    const { data, rows } = this.props;
    return <KeyValue item={data} definition={rows} />;
  }
}

View.propTypes = {
  data: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired
};

export default View;