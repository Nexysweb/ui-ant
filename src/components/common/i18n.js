// repalce with package

import React, { Component } from 'react';
import { PageLoader } from './loader';
//import APIService from '../../lib/api-service';

//import { getAutoInsertKeys } from '../../../src/config';
  // NOTE: disable in production
  // TODO: provide via context?
  const autoInsertKeys = null//getAutoInsertKeys();

// NOTE: better just call FormattedMessage when inside react component? -> context will be provided
// https://github.com/yahoo/react-intl/wiki#formatting-data
const withI18n = MainComponent => {
  class I18nWrapper extends Component {
    formatMessage = (id, values) => {
      const { intl } = this.props;

      if (!id) return null;
      
      const t = intl.formatMessage({id}, values);

      if (autoInsertKeys && id === t) {
        console.log(`No translation for key: ${id} => calling Digis translation API`);
        
        /*const request = {
          method: 'POST',
          uri: '/translate/insert',
          payload: {
            key: t
          }
        };*/

        //APIService.execRequest(request, s => console.log(`Key ${id} inserted successfully`));
      }

      return t;
    }
    
    // NOTE: extend method with parameters according to required features
    translate = (key, values) => key // this.formatMessage(key, values);

    render() {
      return <MainComponent {...this.props} translate={this.translate} />;
    }
  }

  return I18nWrapper;
}

export default withI18n;

export const I18nMessage = withI18n(props => props.translate(props.id));
// TODO: get string back https://github.com/yahoo/react-intl/issues/1051
export const translate = key => key // <I18nMessage id={key} />;


export class I18nProvider extends Component {
  constructor(props) {
    super(props);

    this.state = { ...props, loading: true, text: null };
  }

  translate = locale => {
    this.setState({loading: true});

    this.setState({loading: false, messages: {}});

    return;

    /*
    const text = "Loading translations..";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // NOTE: in development serve json from Digis API
      //APIService.getRequest(`/translate/${locale}/dev`, data => {
      //  this.setState({locale, messages: data, loading: false, text});
      //});
    } else {
      //APIService.getRequest(`/translate/${locale}/serve`, data => {
      //  this.setState({locale, messages: data, loading: false, text});
      //});
    }*/
  }

  componentDidMount() {
    this.translate(this.state.locale);
  }

  // is this used?
  /*componentWillReceiveProps({locale}) {
    if (locale !== this.state.locale) this.translate(locale);
  }*/

  render() {
    const { loading, text } = this.state;

    if (loading) return <PageLoader text={text} center />;

    return this.props.children;

    /*(
      <IntlProvider locale={locale} messages={messages}>
        {this.props.children}
      </IntlProvider>
    );*/
  }
}