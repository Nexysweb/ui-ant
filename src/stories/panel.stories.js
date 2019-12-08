import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import Panel from '../components/common/panel';

const stories = storiesOf('Components/Panel', module);

stories.addDecorator(withKnobs);

stories.add('Usage', () => (
  <Panel title={ 'Custom title'}>
    {'Custom content'}
  </Panel>
));