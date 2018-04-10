/**
 * A number, or a string containing a number.
 * @typedef {Object} Severity
 * @property {string} Error
 * @property {string} Warning
 * @property {string} Info
 * @property {string} Success
 */

/** Severity enum class. */
class Severity {
  /**
   * @type {string}
   */
  static get Error() {
    return 'error';
  }

  /**
   * @type {string}
   */
  static get Warning() {
    return 'warning';
  }

  /**
   * @type {string}
   */
  static get Info() {
    return 'info';
  }

  /**
   * @type {string}
   */
  static get Success() {
    return 'success';
  }
}


/** Custom error class */
class AppError extends Error {
  /**
   * Constructor of AppError
   * @param {string} message
   */
  constructor(message) {
    super(message);

    this.name = 'appError';
    this.stack = (new Error()).stack;
  }
}

export {Severity, AppError};
