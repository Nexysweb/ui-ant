import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import Icon from '../components/common/icon';

const stories = storiesOf('Components/Icon', module);

stories.addDecorator(withKnobs);

stories.add('Usage', () => <Icon name={text('name', 'rocket')} />);