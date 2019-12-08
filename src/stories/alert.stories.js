import React from 'react';

import { storiesOf } from '@storybook/react';
//import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
///import { withInfo } from '@storybook/addon-info';

//import { infoConfig } from '../config';

import Alert from '../components/common/alert';

const stories = storiesOf('Components/Alert', module);
//stories.addDecorator(withKnobs);
//stories.addDecorator(withCenter);

// TODO: do alerts even need to be dismissible?
stories.add('Usage', () => (
  <Alert
    color={'danger'}
    showIcon={ false}
    dismissible={false}>
    {'my alert text'}
  </Alert>
));