import * as Toastr from 'toastr';
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

/** Notification helper class. */
class Notification {
  /**
   * Throw an error message in interface
   * @param {string} message
   * @param {number} duration
   */
  static error(message, duration) {
    this.callMessage(message, Severity.Error, duration);
  }

  /**
   * Throw an info message in interface
   * @param {string} message
   * @param {number} duration
   */
  static info(message, duration) {
    this.callMessage(message, Severity.Info, duration || 5000);
  }

  /**
   * Throw a warning message in interface
   * @param {string} message
   * @param {number} duration
   */
  static warning(message, duration) {
    this.callMessage(message, Severity.Warning, duration || 5000);
  }

  /**
   * Throw a success message in interface
   * @param {string} message
   * @param {number} duration
   */
  static success(message, duration) {
    this.callMessage(message, Severity.Success, duration || 5000);
  }

  /**
   * Throw a message in interface
   * @param {string} message
   * @param {Severity} severity
   * @param {number} duration
   */
  static callMessage(message, severity, duration) {
    this.message = message;
    this.duration = duration;
    this.severity = severity;

    this.renderMessage();
  }

  /**
   * Render a message in interface
   */
  static renderMessage() {
    let options = {
      timeOut: this.duration || 0,
      progressBar: true,
    };

    if(this.message instanceof AppError)
      this.message = this.message.message;

    switch (this.severity) {
      case Severity.Info:
        Toastr.info(this.message, '', options);
        break;
      case Severity.Warning:
        Toastr.warning(this.message, '', options);
        break;
      case Severity.Error:
        Toastr.error(this.message, '', options);
        break;
      case Severity.Success:
        Toastr.success(this.message, '', options);
        break;
    }
  }
}

/** Utils helper class. */
class Utils {
  /**
   * Get a parameter by name from page URL.
   * @param {string} name
   * @param {string} url
   * @return {string}
   */
  static getParameterByName(name, url) {
    if (!url)
      url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results)
      return null;
    if (!results[2])
      return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  /**
   * Add restaurant name to the breadcrumb navigation menu
   * @param {object} restaurant
   */
  static fillBreadcrumb(restaurant) {
    const breadcrumb = document.getElementById('breadcrumb');
    const li = document.createElement('li');
    li.innerHTML = restaurant.name;
    breadcrumb.appendChild(li);
  };
  /**
   * Convert camelcase to dash
   * @param  {string} name
   * @return {string}
   */
  static getIdByName(name) {
    return name.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
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

export {Severity, Notification, Utils, AppError};
