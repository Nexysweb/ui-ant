import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs} from '@storybook/addon-knobs/react';

import FormElement from '../../components/form/generator/element.js';
import FormBody from '../../components/form/generator/body.js';
import FormWrapper from '../../components/form/generator/wrapper2.js';

import { IntlProvider } from 'react-intl';

const s = storiesOf('Form/Generator2', module)

s.addDecorator(withKnobs)
.addDecorator(story => {
  return (<IntlProvider locale={'en'} messages={[]}>
      {story()}
    </IntlProvider>);
})
.add('Form element', () => {

  return  <FormElement componentType={'select'} data={{myName: 'testg'}} name="myName" placeholder="fd" onChange={action('onChange')}/>;
})

const dataLoader = () => MainComponent => class extends React.Component {
  constructor(props) {
    super(props);

    const errors = {};

    this.state = {errors};
  };

  handleSubmit = data => {
    console.log(data);
    console.log('do something');

    const errors = {'comment': ['an error here']};

    this.setState({errors});
  };

  render() {
    const {errors} = this.state;
    return <MainComponent errors={errors} onSubmit={this.handleSubmit} {...this.props}/>;
  }
}

const FormWDataLoader = dataLoader()(FormWrapper);

s.add('Form body', () => {  
  const status = [
    {id: 1, name : "s1"},
    {id: 2, name : "s2"}
  ];

  const elements = [
    {name: ['statusId'], label: ('status'), componentType: 'select', values: status, required: true},
    {name: ['comment'], label: ('description'), componentType: 'textarea'},
    {name: ['dateValidStart'], label: ('startDate'), componentType: 'date'},
    {name: ['dateValidEnd'], label: ('endDate'), componentType: 'date'}
  ];

  const formBody = (data, errors, handleChange) => {
    return (<div>
      <FormBody elements={elements} data={data} errors={errors} onChange={handleChange}/>
      <FormElement componentType={'input'} data={data} name="myName" placeholder="fd" onChange={handleChange}/>
    </div>)
  };

  return <FormWDataLoader body={formBody}/>;
});
