import LogInHandler from './log-in-handler.class.js';
const SHA256 = require('crypto-js/sha256');

export default class User {
  constructor (id, password) {
    this.id = id;
    this.password = password;
  }

  set password (password) {
    this.passwordHash = User.encrypt(password);
  }

  get password () {
    return this.passwordHash;
  }

  async save () {
    const users = await JSON._load('users.json');
    users.push(this);
    return JSON._save('users.json', users);
  }

  getBookings () {
    //ladda in booknongar från json o kolla om man finns med
  }



  static async createAndSaveNewUser (id, password) {
    let exists = await User.checkIfUserExists(id);
    if (!exists) {
      const user = new User(id, password);
      await user.save();
      return user;
    } else {
      throw new Error('Username taken');
    }
  }

  static async checkIfUserExists (id, userNames = null) {
    if (!userNames) {
      userNames = await JSON._load('users.json');
    }
    if (Array.isArray(userNames)) {
      return userNames.some((user) => user.id === id);
    } else {
      throw new Error('Not an array');
    }
  }

  static encrypt (str) {
    return SHA256(str);
  }
}

// @ts-ignore
window.User = User;
