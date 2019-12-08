import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import Badge from '../components/common/badge';
import Icon from '../components/common/icon';

const stories = storiesOf('Components/Badge', module);

stories.addDecorator(withKnobs);

stories
.add('Simple usage', () => {
  return (
    <Badge color={'success'}>{'my alert text'}</Badge>);
})
.add('dismissible', () => {
  return (
    /* eslint-disable  jsx-a11y/anchor-is-valid */
    <Badge color={'primary'}>{ 'my alert text'} <a onClick={x => alert('I was clicked')}><Icon name="close"/></a></Badge>);
});