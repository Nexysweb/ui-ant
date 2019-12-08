import React from 'react';

import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import Tags from '../components/common/tags';

const stories = storiesOf('Components/Tags', module);

stories.addDecorator(withKnobs);

const list = [
  {id: 1, name: 'USA'},
  {id: 2, name: 'Canada'},
  {id: 3, name: 'Mexico'},
  {id: 4, name: 'Brazil'}
];

// NOTE: https://atlassian.design/guidelines/product/components/tags
stories.add('Usage', () => {
  const dismissible = boolean('Dismissible', false);
  return <Tags isDismissible={dismissible} data={list} onDismiss={action('onDismiss')} />;
});