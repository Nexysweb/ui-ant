import React from 'react';
import PropTypes from 'prop-types';

import NexysUtils from '@nexys/utils';

const { ds: UtilsDs } = NexysUtils;

/**
 * @return simple key-value view
 */
class FormGeneratorWrapper extends React.Component {
  constructor(props) {
    super(props);

    const data = this.props.data ? this.props.data : {};

    this.state = {
      data
    };
  }

  componentWillReceiveProps(p) {
    const data = p.data ? p.data : {};

    this.setState({data});
  }

  handleChange = newObj => {
    const data = UtilsDs.updateObject(this.state.data, newObj);
    this.setState({data});
  }

  handleSubmit = event => {
    event.preventDefault();
    const { data } = this.state;
    this.props.onSubmit(data);
  }

  render() {
    const { data } = this.state;
    const { errors } = this.props;

    return (<form onSubmit={this.handleSubmit}>
      {this.props.body(data, errors, this.handleChange)}

      <button type="submit" color="primary">
        Submit
      </button>
    </form>);
  }
}

FormGeneratorWrapper.propTypes = {
  /** Function that fills in the Body component */
  body: PropTypes.func.isRequired,
  data: PropTypes.object,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  /** Endpoint that can be passed for submit. If not given, parent onSubmit is called */
  url: PropTypes.string
};

export default FormGeneratorWrapper;
