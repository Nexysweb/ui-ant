import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import Checkbox from '../../components/form/checkbox';
import Toggle from '../../components/form/toggle';

const stories = storiesOf('Form/Boolean', module);

stories.addDecorator(withKnobs);

stories.add('Checkbox',() => (
  <Checkbox
    name="checkbox"
    value={boolean('value', true)}
    onChange={action('onChangeCheckbox')}
  />
));

stories.add('Toggle', () => (
  <Toggle
    name="toggle"
    value={boolean('value', true)}
    onChange={action('onChangeToggle')}
  />
));