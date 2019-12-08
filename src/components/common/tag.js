import React, { Component } from 'react';
//import randomColor from 'randomcolor';

import { Tag } from 'antd';


class MyTag extends Component {
  render() {
    const { color, children, style } = this.props;
    return (
      <Tag color={color /* || randomColor()*/} style={style}>{children}</Tag>
    );
  }
}

export default MyTag;