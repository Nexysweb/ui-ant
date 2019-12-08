import React from 'react';

import {storiesOf} from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import Loader, { PageLoader } from '../components/common/loader.js';

const stories = storiesOf('Components/Loader', module);

stories.addDecorator(withKnobs);

stories.add('Content', () => <Loader />);
stories.add('Page', () => <PageLoader center={boolean('centered', true)} />);