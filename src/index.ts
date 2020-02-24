import { Collection } from './models/Collection';
import { UserList } from './views/UserList';
import { User, UserProps } from './models/User';

const users = new Collection('http://localhost:4000/users', (json: UserProps) => {
  return User.buildBuild(json)
})
users.on('change', () => {
  const root = document.getElementById('root')

  if(root){
    new UserList(root, users).render();
  }
})
users.fetch();
