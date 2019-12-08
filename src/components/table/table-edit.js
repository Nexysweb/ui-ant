import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Alert, Button, Icon } from 'components';

class TableEdit extends React.Component {
  render() {
    return <LinkButton name="edit" url={this.props.url}/>;
  }
}

TableEdit.propTypes = {
  url: PropTypes.string.isRequired
};

export default TableEdit;
