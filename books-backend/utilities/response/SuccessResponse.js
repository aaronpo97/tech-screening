const Response = require('./Response.js');
module.exports = class SuccessResponse extends Response {
  constructor(message, status, payload) {
    super(message, status);
    this.success = true;
    this.payload = payload;
  }
};
