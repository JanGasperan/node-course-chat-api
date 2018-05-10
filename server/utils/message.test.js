var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () =>{
  it('should generate correct location object', () => {
    var from = 'Jan';
    var lat = 48.1485965;
    var long = 17.1077477;
    var message = generateLocationMessage(from, lat, long);

    expect(message.createdAt).toBeA('number');
    expect(message.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
    expect(message).toInclude({from});
    });
});
