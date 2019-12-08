import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import Tooltip from '../components/common/tooltip';

const stories = storiesOf('Components/Tooltip', module);

stories.addDecorator(withKnobs);

stories.add('Usage', () =>
  <Tooltip
    text={'my helper text'}
    iconName={ 'info-circle'}
    placement={ 'top'}
  />
);