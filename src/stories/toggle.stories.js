import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import { IntlProvider } from 'react-intl';
import ToggleInfo from '../components/common/toggle-info';

const stories = storiesOf('Components/Toggle Info', module);

stories.addDecorator(withKnobs).addDecorator(story => {
  return (<IntlProvider locale={'en'} messages={[]}>
      {story()}
    </IntlProvider>);
});

stories
.add('Simple',() => {
  return (
    <ToggleInfo label="View endpoints" labelBack="Back" tooltipText="click here to see the endpoint details">
      <code>http://sdfgh.com</code>
    </ToggleInfo>);
});