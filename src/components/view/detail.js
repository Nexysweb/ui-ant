import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'components';
import { KeyValue } from 'components/view';

import NexysUtils from '@nexys/utils';

const { ds: DSUtils } = NexysUtils;

class Detail extends Component {
  render() {
    const { data, rows, emptyMsg } = this.props;

    if (!data || DSUtils.isEmpty(data)) return <Alert>{emptyMsg}</Alert>;

    return (
      <KeyValue item={data} definition={rows} />
    );
  }
}

Detail.propTypes = {
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};

export default Detail;