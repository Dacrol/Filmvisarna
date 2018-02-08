import LogInHandler from './log-in-handler.class.js';
const SHA256 = require('crypto-js/sha256');

export default class User {
  // constructor (id, password) {
  //   // kolla om användarnamnet finns redan i listan
  //   this.checkIfUserExists(id).then(userExists => {
  //     if (!userExists) {
  //       this.createUser(id, password);
  //     }
  //   });
  // }

  encrypt (password) {
    password = SHA256(password);
    return password;
  }

  async checkIfUserExists (id) {
    let userNames = await JSON._load('users.json');
    for (let user in userNames) {
      if (user.id === id) {
        return true;
      }
    }
    return false;
  }

  async createUser (id, password) {
    this.id = id;
    this.passWord = this.encrypt(password);

    let user = {
      id: this.id,
      password: this.passWord
    };
    await JSON._load('users.json').then(users => {
      users.push(user);
      // @ts-ignore
      JSON._save('users.json', users).then(() => {
        console.log('hej', user);
        // return user;
      });
    });
    return user;
    // skicka in det i json filen
  }
  static async createNewUser (id, passWord) {
    const user = new User();
    let exists = await user.checkIfUserExists(id);

    return user.createUser(id, passWord);
  }
}

window.User = User;
