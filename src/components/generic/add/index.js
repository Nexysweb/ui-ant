import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckPermission from 'components/common/permission-wrapper';
import { entitySubscribe } from 'components/common/subscribe';

import DetailLayout from 'components/layout/detail';
import Form from '../detail/form';


class Add extends Component {
  handleSubmit = (isSuccess, data) => {
    if (isSuccess) {
      const { routes, add, history } = this.props;

      if (add.redirectTo) history.push(add.redirectTo);
      else history.push(routes.detail(data.uuid || data.id));

      if (!!add.onSuccess) add.onSuccess();
    }
  }

  render() {
    const { entity, add, requestCrud, routes, breadcrumbs, permission, withoutLayout } = this.props;

    let form = (
      <Form
        {...this.props}
        {...add.form}
        mapping={add.mapping}
        request={requestCrud.insert}
        data={{...add.initData}}
        afterSubmit={this.handleSubmit}
      />
    );

    form = permission ? <CheckPermission permission={permission}>{form}</CheckPermission> : form;
    if (withoutLayout) return form;

    return (
      <DetailLayout
        entityName={entity}
        uriPrefix={routes.prefix}
        breadcrumbs={add.breadcrumbs || breadcrumbs}
        add>
        {form}
      </DetailLayout>
    );
  }
}

Add.propTypes = {
  entity: PropTypes.string.isRequired,
  requestCrud: PropTypes.object.isRequired,
  add: PropTypes.object.isRequired
};

export default entitySubscribe()(Add);