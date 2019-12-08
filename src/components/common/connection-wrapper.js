import { connect } from 'react-redux';

const withConnection = RenderComponent => {
  const mapStateToProps = state => ({
    wsConnection: state.WsConnection.connection
  });

  // TODO: add withNotification?
  return connect(mapStateToProps, null)(RenderComponent);
}

export default withConnection;
