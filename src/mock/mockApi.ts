import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive' },
];

const roles = [
  { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
  { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
];

mock.onGet('/users').reply(200, users);
mock.onPost('/users').reply(config => {
  const newUser = JSON.parse(config.data);
  users.push(newUser);
  return [200, newUser];
});
mock.onDelete(/\/users\/\d+/).reply(config => {
  const id = Number(config.url!.split('/').pop());
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) users.splice(index, 1);
  return [200];
});
mock.onGet('/roles').reply(200, roles);
mock.onPost('/roles').reply(config => {
  const newRole = JSON.parse(config.data);
  roles.push(newRole);
  return [200, newRole];
});

export default axios;
