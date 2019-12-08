import React, { Component } from 'react';

import { Button } from '../';


class Switches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || props.values[0]
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value) this.setState({value});
  }

  handleChange = value => {
    const { values, onChange, exclusive } = this.props;
    const switchName = values[value];
    this.setState({value: switchName});
    if (exclusive) onChange({name: 'switch', value: switchName}, false, true);
    else onChange({name: 'switch', value: switchName});
  }

  render() {
    const { values } = this.props;
    const { value } = this.state;

    return (
      <div style={{textAlign: 'right'}}>
        {values.map((s, i) => {
          const color = s === value ? 'primary' : '';
          const myClass = i === (values.length - 1) ? 'last' : '';
          return (
            <Button
              key={i}
              color={color}
              onClick={() => this.handleChange(i)}
              className={myClass}>
              {s}
            </Button>
          )
        })}
      </div>
    );
  }
}

export default Switches;