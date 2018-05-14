const expect = require('expect');
var {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jan',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Jojo',
      room: 'Node Course'
    }
  ]
  });

  it('should add new user', () => {
      var users = new Users();
      var user = {
        id: '123',
        name: 'Andrew',
        room: 'The Office Fans'
      };
      var res = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);

  });

  it('should remove a user', () => {
      var user = users.removeUser('2');
      var deletedUser = users.getUser('2');

      expect(user).toEqual( {
        id: '2',
        name: 'Jan',
        room: 'React Course'
      });

      expect(users.users.length).toBe(2);
      expect(deletedUser).toNotExist();
  });

  it('should not remove user', () => {
      // invalid id
      var user = users.removeUser('99');

      expect(user).toNotExist();
      expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
      // valid id
      var user = users.getUser('1');

      expect(user).toEqual(users.users[0]);
  });

  it('should NOT find user', () => {
      // invalid id
      var user = users.getUser('99');

      expect(user).toNotExist();
  });

  it('should return names for Node Course', () => {
      var userList = users.getUserList('Node Course');

      expect(userList).toEqual(['Mike','Jojo']);
  });

  it('should return names for React Course', () => {
      var userList = users.getUserList('React Course');

      expect(userList).toEqual(['Jan']);
  });
});
