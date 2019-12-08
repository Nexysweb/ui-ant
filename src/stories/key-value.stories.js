import React from 'react';

import {storiesOf} from '@storybook/react';

import { IntlProvider } from 'react-intl';

import KeyValue from '../components/common/key-value';

const data = [
  {key: 'age', value: 32},
  {key: 'height', value: '187'},
  {key: 'weight', value: '76kg'},
];

storiesOf('Components/Key Value', module)
.addDecorator(story => {
  return (<IntlProvider locale={'en'} messages={[]}>
      {story()}
    </IntlProvider>);
})
//Display a single view
.add('Simple usage', () => {

  return <KeyValue entries={data}/>;
})

// Display a single view and takes an array as input instead of a regular object
.add('Array input usage', () => {
  const dataArray = data.map(x => {
    return [x.key, x.value];
  });

  return <KeyValue entries={dataArray}/>;
});