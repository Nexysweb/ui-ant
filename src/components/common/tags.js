import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Icon from './icon';
import Tag from './tag';


// NOTE: https://atlassian.design/guidelines/product/components/tags
class Tags extends Component {
  handleDismiss = (e, id) => {
    const { onDismiss } = this.props;
    e.preventDefault();
    e.stopPropagation();
    onDismiss(id);
  }

  render() {
    const { data, isDismissible, withLink } = this.props;
    const tagStyle = {
      padding: '3px 5px',
      fontWeight: 'bold',
      height: 'auto'
    };

    return data.map(({id, uuid, name, color})=> {
      /* eslint-disable  jsx-a11y/anchor-is-valid */
      const dismissible = isDismissible ? <a onClick={e => this.handleDismiss(e, id || uuid)}><Icon name="close"/></a> : null;
      const tag = <Tag color={color} style={tagStyle}>{name} {dismissible}</Tag>
      if (withLink) return <Link to={`/app/tag#${uuid}`} target="_blank">{tag}</Link>;
      return tag;
    });
  }
}

export default Tags;
