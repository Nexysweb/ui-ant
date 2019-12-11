import React from 'react';

import {storiesOf} from '@storybook/react';

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

.add('simple', () => <p><List config={{simple: true}} values={data} columns={columns}/></p>)

.add('Inline Editing', () => {
  const data = [{
  "id":1138,"instance":{"id":5,"name":""},"profile":{"firstName":"Peter","lastName":"Johnson","email":"peter.johnson@jj.com"},"status":{"id":2,"name":"pending"}
}, {
  "id":1139,"instance":{"id":5,"name":""},"profile":{"firstName":"John","lastName":"Smith","email":"john.smith@gmail.com"},"status":{"id":1,"name":"active"}
},{
  "id":1140,"instance":{"id":5,"name":""},"profile":{"firstName":"John","lastName":"Doe","email":"john.doe@gmail.com"},"status":{"id":3,"name":"refused"}
},{
  "id":1142,"instance":{"id":5,"name":""},"profile":{"firstName":"Peter","lastName":"Turf","email":"peter.turf@gmail.com"},"status":{"id":2,"name":"pending"}
},{
  "id":1158,"instance":{"id":5,"name":""},"profile":{"firstName":"Mary","lastName":"Leopard","email":"mary.leopard@gov.co.uk"},"status":{"id":1,"name":"active"}
},{
  "id":1164,"instance":{"id":5,"name":""},"profile":{"firstName":"Diane","lastName":"Fox", "email": "diane.fox@cc.com"},"status":{"id":1,"name":"active"}
}];

const userData = data.map(item => ({...item, ...item.profile}));
  const values = [{
    id: 1, name: 'active'
  }, {
    id: 2, name: 'pending'
  }, {
    id: 3, name: 'refused'
  }];

  const columns = [{
    key: 'lastName',
    dataIndex: 'lastName',
    title: 'lastName',
    sorter: true,
    search: true,
    form: true
  },
  {
    key: 'firstName',
    dataIndex: 'firstName',
    title: 'firstName',
    sorter: true,
    search: true,
    form: true
  },
  {
    key: 'email',
    dataIndex: 'email',
    title: 'email',
    sorter: true
  },
  {
    key: 'status',
    title: 'status',
    render: (record) => record.status.name,
    form: true,
    componentType: 'select',
    values
  }];

  const modalEdit = true // boolean('edit in modal', false);

  const listConfig = {
    edit: (id, payload) => {},
    delete: id => {},
    modalEdit
  };

  // NOTE: on knob change, list is remounted
  const RemountedList = () => (
    <List
      values={userData}
      columns={columns}
      config={listConfig}     
    />
  );

  return <RemountedList/>;
});


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