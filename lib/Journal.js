/**
 * Custom debuggers tool that can be utilized to document Promise processes
 * header: {string} input a string detailing the process being documented
 * entries: {array} document the steps in the promise chain by attaching entries in sequence
 * body: {null} the data relevant for the client. utilize attach method to modify
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
   * @param {void} data payload to send to the client
   */
  attach(data) {
    this.body = data;
  }
};
