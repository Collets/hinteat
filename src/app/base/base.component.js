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
        wrapper.innerHTML = this.renderComponentContent();
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
   * @return {string}
   * @memberof BaseComponent
   */
  renderComponentContent() {
    return this.ENV.renderString('{% include "/assets/templates/' + this.id + '.tpl.njk" ignore missing %}', this.model);
  }

  /**
   * Render the template of the component
   *
   * @return {string}
   * @memberof BaseComponent
   */
  render() {
    return this.ENV.renderString('<' + this.id + '> {% include "/assets/templates/' + this.id + '.tpl.njk" ignore missing %} </' + this.id + '>', this.model);
  }

  /**
   * Initialize the component
   *
   * @return {promise}
   * @memberof CuisineComponent
   */
  init() {
    throw new Error('You have to implement the method doSomething!');
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
