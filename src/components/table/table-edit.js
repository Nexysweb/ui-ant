import React from 'react';
import PropTypes from 'prop-types';

//import { Link } from 'react-router-dom';
import { Button } from 'components';

class TableEdit extends React.Component {
  render() {
    return <Button name="edit" url={this.props.url}/>;
  }
}

TableEdit.propTypes = {
  url: PropTypes.string.isRequired
};

export default TableEdit;
