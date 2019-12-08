import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { entitySubscribe } from 'components/common/subscribe';

import { FormWrapper, FormBody } from 'components/form/generator';



class Add extends Component {
  handleSuccess = isSuccess => {
    const { history, url, uriPrefix } = this.props;
    if (isSuccess && history) history.push(url || uriPrefix);
  }

  render() {
    const { data, initData, requestCrud, afterSubmit, onSuccess, elements } = this.props;

    // TODO: enable use of custom body

    // ...data, 
    return (
      <FormWrapper
        {...this.props}
        data={{...initData}}
        request={requestCrud.insert || requestCrud.update}
        afterSubmit={afterSubmit || onSuccess || this.handleSuccess}>
        <FormBody elements={elements} />
      </FormWrapper>
    );
  }
}

Add.propTypes = {
  uriPrefix: PropTypes.string.isRequired,
  urlApi: PropTypes.string.isRequired,
  itemInit: PropTypes.object
};

export default Add //entitySubscribe()(Add);