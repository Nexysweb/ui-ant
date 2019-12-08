import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { entitySubscribe } from 'components/common/subscribe';
import FormWrapper, { FormBody } from 'components/form/generator';


class Form extends Component {
  render() {
    const { CustomBody, elements } = this.props;
    return (
      <FormWrapper {...this.props}>
        {CustomBody ? <CustomBody elements={elements} /> : <FormBody elements={elements} />}
      </FormWrapper>
    );
  }
}

Form.propTypes = {
  request: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Form // entitySubscribe()(Form);