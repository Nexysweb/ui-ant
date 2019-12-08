import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Spin } from 'antd';

class Loader extends Component {
  render() {
    const { size } = this.props;

    return (
      <div style={{textAlign: 'center'}}>
        {size ? <Spin size={size} /> : <Spin />}
      </div>
    );
  }
}

Loader.propType = {
  size: PropTypes.string
};

export default Loader;


export class LoaderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: props.loading || true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading && nextProps.loading !== this.state.loading) {
      this.setState({loading: nextProps.loading});
    }
  }

  render() {
    const { loading } = this.state;
    const { children } = this.props;

    if (loading) {
      return <Spin/>;
    }

    return children;
  }
}

export const withLoader = MainComponent => {
  class LoaderWrapper extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true
      };
    }

    toggleLoading = () => {
      this.setState(prevState => ({loading: !prevState.loading}));
    }

    render() {
      const { loading } = this.state;

      return [
        loading ? <PageLoader><Spin size="large" /></PageLoader> : '',
        <div style={{visibility: loading ? 'hidden' : 'visible'}}>
          <MainComponent {...this.props} toggleLoading={this.toggleLoading} />
        </div>
      ];
    }
  }

  LoaderWrapper.displayName = `LoaderWrapper(${'MainComponent'})`;
  return LoaderWrapper;
}

const Pageholder = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  ${props => !props.center && `
    margin-left: 100px; 
  `}

  p {
    margin-top: 10px;
    margin-left: -33.3%;
  }
`;

export const PageLoader = ({size, text, center}) => (
  <Pageholder center={center}><Spin size={size || "large"} />{text && <p>{text}</p>}</Pageholder>
);