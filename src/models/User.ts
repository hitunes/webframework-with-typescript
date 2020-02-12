import { Collection } from './Collection';
import { Model } from './Model';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';
import { Attributes } from './Attributes';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:4000/users';
export class User extends Model<UserProps> {
  static buildBuild(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootUrl,(json: UserProps) => User.buildBuild(json))
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100)
    this.set({age})
  }
  // get isAdminUser(): boolean {
  //   return this.get('id')=== 1;
  // }
}