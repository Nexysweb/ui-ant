import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import List from './list';
import Detail from './detail';
import Add from './add';

/**
 * Main router when entering module (this also loads async javascript)
 **/
class RouterIndex extends Component {
  render() {
    const { config } = this.props;

    if (!config) {
      console.log('config not initalised');
      return null;
    }

    const { routes, additionalRoutes, add } = config;

    return (
      <Switch>
        <Route exact path={routes.prefix} render={props => <List {...props} config={config} root />} />
        {(!config.withoutAdd && add) && <Route exact path={routes.add} render={props => <Add {...props} {...add} {...config} />} />}
        {/* explanation for the syntax below: https://tylermcginnis.com/react-router-pass-props-to-components */}
        <Route path={`${routes.prefix}/list`} render={props => <List {...props} config={config} />} />
        {config.detail && <Route path={`${routes.prefix}/:id`} render={props => <Detail {...props} config={config} />} />}
        {additionalRoutes && additionalRoutes}
      </Switch>
    );
  }
}

RouterIndex.propTypes = {
  config: PropTypes.object.isRequired
};

export default RouterIndex;
