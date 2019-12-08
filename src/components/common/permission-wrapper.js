import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withI18n } from 'components/common';
import { Alert } from 'components';

import {List as Layout } from 'components/layout';


export const setupPermissionCheck = obj => {
  obj.checkPermission = function(permission) {
    return this.isAdmin || this.permissions.includes(permission);
  }
  obj.checkEveryPermission = function(permissions) {
    return this.isAdmin || permissions.every(permission => this.permissions.includes(permission));
  }
  obj.checkAnyPermission = function(permissions) {
    return this.isAdmin || permissions.some(permission => this.permissions.includes(permission));
  }
}

class CheckPermission extends Component {
  render() {
    const { permission, data, action, children, translate } = this.props;

    // TODO: sources for further inspiration:
    // - https://github.com/mjrussell/redux-auth-wrapper
    // - https://github.com/shizpi/react-redux-permissions
    if (data.permissions.includes(permission) || data.isAdmin) {
      return children;
    }

    return <Alert color="warning">{translate('permission.none', { permission, target: action ? 'action' : 'view' })}</Alert>
  }
}

CheckPermission.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
  permission: PropTypes.string.isRequired
};

const mapStateToProps = state => state.User.toJS();

const ConnectedCheckPermission = connect(mapStateToProps, null)(withI18n(CheckPermission));
export default ConnectedCheckPermission;


export const withPermission = permission => ChildComponent => {
  const PermissionWrapper = props => {
    const { data, translate } = props;

    if (permission && data.permissions.includes(permission) || data.isAdmin) return <ChildComponent {...props} />;
    else return (
      <Layout
        title={translate('access.denied')}
        entityName="dashboard">
        <Alert color="warning">{translate('permission.none', { permission: permission || 'admin' })}</Alert>
      </Layout>
    );
  }

  return connect(mapStateToProps, null)(withI18n(PermissionWrapper));
}