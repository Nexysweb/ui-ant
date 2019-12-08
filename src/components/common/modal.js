import React, { Component } from 'react';

import { Modal } from 'antd';
import Button from '../uielements/button';


class MyModal extends Component {
  handleCancel = e => {
    this.props.cancel();
  }

  handleSubmit = e => {
    this.props.onSubmit(e);
  }

  render() {
    const { title, open, children, center } = this.props;

    return (
      <Modal
        title={title || "Modal"}
        centered={center || false}
        visible={open || false}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>Return</Button>,
          <Button key="submit" type="primary" onClick={this.handleSubmit}>Submit</Button>
        ]}>
        {children}
      </Modal>
    );
  }
}

export default MyModal;
