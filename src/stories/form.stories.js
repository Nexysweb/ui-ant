import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Input from '../components/form/input';
import InputNumber from '../components/form/input-number';
//import MyBoolean from '../components/form/boolean';

import Checkbox from '../components/form/checkbox';
import Select from '../components/form/select';
import MultiSelect from '../components/form/select-multi';
//import Typeahead from '../form/typeahead';
import Datepicker from '../components/form/datepicker';
import Textarea from '../components/form/textarea';
import Wrapper from '../components/form/wrapper';

const options = [
  {id: 1, name: 'apple'},
  {id: 2, name: 'banana'},
  {id: 3, name: 'orange'},
];

class Layout extends React.Component {
  render() {
    return (<div className="row">
      <div className="col-md-4" style={{marginLeft: '20pt'}}>
      {this.props.children}
      </div>
    </div>)
  }
}

storiesOf('Form', module)
  //.add('boolean', () => <MyBoolean name="myboolean" onChange={action('clicked')}/>)
  .add('checkbox', () => <Checkbox name="mycheckbox" onChange={action('clicked')}/>)
  .add('date', () => <Layout><Datepicker name="mydate" onChange={action('clicked')}/></Layout>)
  .add('input', () => <Layout><Input name="myinput" value=""  onChange={action('clicked')}/></Layout>)
  .add('input number', () => <Layout><InputNumber disabled value="345" type="kPrice" name="mynumber" onChange={action('clicked')}/></Layout>)
  .add('select', () => <Layout><Select name="myselect" value={null} values={options} onChange={action('clicked')}/></Layout>)
  .add('select multi', () => <Layout><MultiSelect name="myselect" values={options} onChange={action('clicked')}/></Layout>)
  //.add('typeahead', () => <Layout><Typeahead name="mytypeahead" options={options} onChange={action('clicked')}/></Layout>)
  .add('textarea', () => <Layout><Textarea name="mytextarea" onChange={action('clicked')}/></Layout>)
  .add('wrapper', () => <Layout><br/><Wrapper mandatory  label="sdf" info="my info" name="mywrapper">inside of wrapper</Wrapper></Layout>)

