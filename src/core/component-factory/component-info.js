/**
 * Information for component's construction
 * @typedef {Object} ComponentInfo
 * @property {string} Name
 * @property {HTMLElement} Element
 */

/** ComponentInfo Class */
export default class ComponentInfo {
  /**
   * Constructor of ComponentInfo
   * @param {string} name
   * @param {HTMLElement} element
  */
  constructor(name, element) {
    this.Name = name;
    this.Element = element;
  }
}
