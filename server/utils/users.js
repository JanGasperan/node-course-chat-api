[{
  id: 'asdqwdioj',
  name: 'Jan',
  room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(is)
// getUserList(room)

// ES6 classes

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  getUser (id) {
    return this.users.filter((user) => user.id == id)[0];
  }
  removeUser (id) {
    // return user that was removed
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id != id);
    }
    return user;
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};




// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }
//
// var me = new Person('Jan', 34);
// console.log(me.getUserDescription());
