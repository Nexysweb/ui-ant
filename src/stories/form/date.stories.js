import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';

import DatePicker from '../../components/form/datepicker';

const stories = storiesOf('Form/DatePicker', module);

stories.addDecorator(withKnobs);

stories.add('Usage', () => (
  <DatePicker
    name="date"
    value={new Date()}
    onChange={action('onChangeDate')}
    dateFormat={text('dateFormat', null)}
    showTime={boolean('showTime', true)}
    disabled={boolean('disabled', false)}
  />
));