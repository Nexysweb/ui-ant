import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs/react';

import Progress from '../components/common/progress';

const stories = storiesOf('Components/Progress', module);
stories.addDecorator(withKnobs);

stories.add('Active', () => (
  <Progress progress={number('progress', 40)} status={text('status', 'active')}/>
));

stories.add('Failed', () => (
  <Progress progress={number('progress', 70)} status={text('status', 'exception')}/>
));

stories.add('Successful', () => (
  <Progress progress={number('progress', 100)} status={text('status', 'success')}/>
));