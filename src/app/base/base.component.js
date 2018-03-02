import {Utils} from '../utils/utils';
import * as nunjucks from '../../../node_modules/nunjucks/browser/nunjucks';

/** Base class for every components */
export default class BaseComponent {
  /** Constructor of base component */
  constructor() {
    this.ENV = nunjucks.configure({web: {async: true}});
    this._model = {};
  }


  /**
   * Render the template of the component'content
   *
   * @return {promise}
   * @memberof BaseComponent
   */
  renderComponentContent() {
    let promise = new Promise((resolve, reject)=>{
      this.ENV.renderString('{% include "/assets/templates/' + this.id + '.tpl.njk" ignore missing %}', this.model, (err, res) =>{
        if (err)
          reject(new AppError(err));

        if (res)
          resolve(res);
      });
    });

    return promise;
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
   * Render the template of the component
   *
   * @return {promise}
   * @memberof BaseComponent
   */
  render() {
    let promise = new Promise((resolve, reject)=>{
      this.ENV.renderString('<' + this.id + '> {% include "/assets/templates/' + this.id + '.tpl.njk" ignore missing %} </' + this.id + '>', this.model, (err, res) =>{
        if (err)
          reject(new AppError(err));

        if (res)
          resolve(res);
      });
    });

    return promise;
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
