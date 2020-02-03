import { User } from "./models/User";

const user = new User({name: 'itunu', age: 20});

user.set({name: 'notmyname'})
user.on('click', () => {});
user.on('click', () => {});
user.on('click', () => {});

console.log(user)