const Response = require('./Response.js');

module.exports = class ErrorResponse extends Response {
  constructor(message, status, stack) {
    super(message, status);
    this.success = false;
    this.stack = stack;
  }
};
