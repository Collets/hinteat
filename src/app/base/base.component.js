import {Utils} from '../utils/utils';
import * as nunjucks from '../../../node_modules/nunjucks/browser/nunjucks';

/** Base class for every components */
export default class BaseComponent {
  /** Constructor of base component */
  constructor() {
    this.ENV = nunjucks.configure({web: {async: false}});
    this._model = {};

    this.init()
    .then(()=>{
      let wrapper = document.querySelector(this.id);

      if (wrapper)
        this.renderComponentContent(wrapper);
    });
  }

  /**
   *
   * @return {object} model
   * @memberof CuisineComponent
   */
  get model() {
    return this._model;
  }

  /**
   * @param  {object} value
   * @memberof CuisineComponent
   */
  set model(value) {
    this._model = value;
  }

  /**
   * Render the template of the component'content
   *
   * @param {HTMLElement} parent
   * @memberof BaseComponent
   */
  renderComponentContent(parent) {
    parent.innerHTML = this.ENV.renderString('{% include "/assets/templates/' + this.id + '.tpl.njk" ignore missing %}', this.model);
    this.afterRender();
  }

  /**
   * Render the template of the component
   *
   * @param {HTMLElement} parent
   * @param {boolean} ontop True if the component must be rendered on top
   * @memberof BaseComponent
   */
  render(parent, ontop) {
    let wrapper = document.createElement('div');
    wrapper.innerHTML = this.ENV.renderString('<' + this.id + 'Component> {% include "/assets/templates/' + this.id + '.tpl.njk" ignore missing %} </' + this.id + 'Component>', this.model);

    if(ontop)
      parent.insertBefore(wrapper.firstChild, parent.firstChild);
    else
      parent.appendChild(wrapper.firstChild);
    this.afterRender();
  }

  /**
   * Initialize the component
   *
   * @return {promise}
   * @memberof BaseComponent
   */
  init() {
    let promise = new Promise((resolve, reject)=>{
      resolve();
    });

    return promise;
  }

  /**
   * Make an action after render of the component
   *
   * @memberof BaseComponent
   */
  afterRender() {
    return;
  }

  /**
   * Get id of component
   * @return {string}
   */
  get id() {
    let name = this.constructor.name.replace('Component', '');
    return Utils.getIdByName(name);
  }
}
