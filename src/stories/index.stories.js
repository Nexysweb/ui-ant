import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs);

stories
.add('index', () => <p>Main page</p>)