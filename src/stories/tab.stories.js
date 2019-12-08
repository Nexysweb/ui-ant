import React from 'react';

import {storiesOf} from '@storybook/react';
import {withKnobs, number} from '@storybook/addon-knobs/react';

import Tabs from '../components/common/tabs.js';
import { MemoryRouter } from 'react-router';

const stories = storiesOf('Components/Tabs', module);

stories.addDecorator(withKnobs);

stories.add('Usage', () => {
  const tabs = [
    {label: 'tab #1', uri: '/'},
    {label: 'tab #2', uri: '/'},
    {label: 'tab #3', uri: '/'}
  ];

  return (
    <MemoryRouter>
      <Tabs
        tabs={tabs}
        activeKeyId={number('active key', 1)}
      />
    </MemoryRouter>
  );
});