import { Modal } from 'antd';

class Confirmation {
  constructor() {
    this.confirm = Modal.confirm;
  }

  open = (title, content, accept) => {
    this.confirm({
      title,
      content,
      onOk: accept
    });
  }

  delete = (content, accept) => {
    this.open('Delete confirmation', content, accept)
  }
}

const ConfirmationSingleton = new Confirmation();
export default ConfirmationSingleton;