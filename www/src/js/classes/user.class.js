import LogInHandler from './log-in-handler.class.js';
const SHA256 = require('crypto-js/sha256');

export default class User {
  constructor (id, password) {
    // kolla om användarnamnet finns redan i listan
    if (!this.checkIfUserExists(id)) {
      this.createUser(id, password);
    }
  }

  encrypt (password) {
    password = SHA256(password);
    return password;
  }

  async checkIfUserExists (id) {
    let userNames = await JSON._load('users.json');
    for (let user of userNames) {
      if (user.id === id) {
        return true;
      }
    }
    return false;
  }

  createUser (id, password) {
    this.id = id;
    this.passWord = this.encrypt(password);

    let user = {
      id: this.id,
      password: this.passWord
    };

    // @ts-ignore
    JSON._save('users.json', user).then(() => {
      console.log('Saved!');
    });

    // skicka in det i json filen
  }
}

window.User = User;
