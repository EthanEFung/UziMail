/**
 * Custom debuggers tool that can be utilized to document Promise processes
 * @constructor
 * @param {string} header: input a string detailing the process being documented
 * @param {string[]} entries: document the steps in the promise chain by attaching entries in sequence
 * @param {null} body: the data relevant for the client. utilize attach method to modify
 */
module.exports = class Journal {
  constructor(header) {
    this._header = header;
    this._entries = [];
    this.body = null;
  }
  /**
   * @param {string} messages recommended to use temporal literals for each message
   */
  entry(...messages) {
    this._entries.push(...messages);
  }
  /**
   * @param {null} data payload to send to the client
   */
  attach(data) {
    this.body = data;
  }
};
