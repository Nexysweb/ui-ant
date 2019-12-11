import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button, Icon, Panel } from 'components';

//import { entitySubscribe } from 'components/common/subscribe';

import Form from './form';
import View from './view';


// TODO: use toggle-panel
class Toggle extends Component {
  constructor(props) {
    super(props);

    this.state = { editMode: false, data: props.data };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }
  
  toggleEdit = () => this.setState({editMode: !this.state.editMode});

  handleSuccess = (isSuccess, res, data) => {
    if (isSuccess) {
      this.setState({editMode: false, data});
    }
  }

  renderContent = () => {
    const { editMode, data } = this.state;
    const { config } = this.props;

    const { detail: pages } = config;
    const [detail] = pages;
    const view = detail.views.find(view => view.key === 'toggle');

    const mainConfig = view.config;
    const { form, rows, mapping } = mainConfig;

    let item = {...data};

    if (Array.isArray(data)) item = data.find(({isLog}) => !isLog);

    const id = (item.id && !isNaN(item.id)) ? item.id : item.uuid;

    const requestUpdate = payload => config.requestCrud.update(id, payload);
  
    if (editMode) {
      return (
        <Form
          {...this.props}
          data={item}
          {...form}
          rows={rows}
          mapping={mapping}
          request={requestUpdate}
          afterSubmit={this.handleSuccess}
        />
      );
    }

    return <View {...this.props} data={item} rows={mainConfig.rows} />;
  }

  render() {
    const { config, translate, title, match, Extra } = this.props;
    const { editMode } = this.state;

    const iconName = editMode ? 'arrow-left' : 'edit';
    const button = <Button type="icon" onClick={this.toggleEdit}><Icon name={iconName}/></Button>;

    const extra = Extra ? <Fragment><Extra id={match.params.id} />{button}</Fragment> : button;
    const panelTitle = title || translate(`${config.entity}.title`) || translate('user.profile.title');

    return (
      <Panel title={panelTitle} extra={extra}>
        {this.renderContent()}
      </Panel>
    );
  }
}

Toggle.propTypes = {
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};

export default Toggle;

// export default entitySubscribe()(Toggle);