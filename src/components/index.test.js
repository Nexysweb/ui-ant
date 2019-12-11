import Index from './index';

test('Index', () => {
  expect(typeof Index).toEqual('object');
});

test('List', () => {
  expect(typeof Index.List).toEqual('function');
});