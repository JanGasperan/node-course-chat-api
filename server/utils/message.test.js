var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Jan';
    var text = 'Some random text';
    var res = generateMessage(from, text);

    // expect(res.from).toBe(from);
    // expect(res.text).toBe(text);
    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, text});
  });
});
