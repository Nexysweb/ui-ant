import React from 'react';
import PropTypes from 'prop-types';

class TableHead extends React.Component {
  render() {
    const { className, style } = this.props;

    return (
      <th className={className} style={style}>
        {this.props.children}
      </th>
    );
  }
}

TableHead.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

export default TableHead;
