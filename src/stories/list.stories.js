import React from 'react';

import {storiesOf} from '@storybook/react';

import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';

import List from '../components/business/list/index'; // {default as ListHoc, List} 

const data = [
    {id: 1, name: 'Switzerland', capital: 'Bern', wiki: ''},
    {id: 2, name: 'France', capital: 'Paris', wiki: ''},
    {id: 3, name: 'Germany', capital: 'Berlin', wiki: ''},
  ];

const wikiLinkFromName = name => <a href={'https://en.wikipedia.org/wiki/' + name}>Link</a>;

const columns = [
    {title: 'name', render: r => r.name},
    {title: 'capital', render: r => r.capital},
    {title: 'wiki link', render: r => wikiLinkFromName(r.name)}
  ];


storiesOf('Components/List', module)
.addDecorator(story => {
  return (<MemoryRouter>
    <IntlProvider locale={'en'} messages={[]}>
      {story()}
    </IntlProvider>
  </MemoryRouter>);
})
.add('simple', () => <p><List config={{simple: true}} values={data} columns={columns}/></p>)

/*
.add('Simple usage', () => {
  const data = [
    {id: 1, name: 'Switzerland', capital: 'Bern', wiki: ''},
    {id: 2, name: 'France', capital: 'Paris', wiki: ''},
    {id: 3, name: 'Germany', capital: 'Berlin', wiki: ''},
  ];


  const columns = [
    {title: 'name', render: r => r.name},
    {title: 'capital', render: r => r.capital},
    {title: 'wiki link', render: r => wikiLinkFromName(r.name)}
  ];

  return <ListHoc config={{simple: true}} values={data} columns={columns}/>;
});*/