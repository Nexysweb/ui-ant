import React from 'react';

import { storiesOf } from '@storybook/react';

import Code from '../components/common/code';

const stories = storiesOf('Components/Code', module);

stories
.add('Simple', () => {
  return (<Code>http://sdfgh.com</Code>);
});