import {Utils,AppError,Notification} from 'app/utils/utils';
import {ComponentFactory} from 'core/component-factory/component-factory';
import * as nunjucks from 'nunjucks/browser/nunjucks';
import ComponentInfo from 'core/component-factory/component-info';

/** Base class for every components */
export default class BaseComponent {
  /** Constructor of base component */
  constructor(params) {
    this.ENV = nunjucks.configure({web: {async: false}});
    this._model = {};

    if(params)
    {
      Object.keys(Object.getOwnPropertyDescriptors(params)).map((key)=>{
        Reflect.defineProperty(this, '_' + key, {value:params[key]});
      });
    }   
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
  renderComponentContent(parent = this._wrapper) {
    parent.innerHTML = this.ENV.renderString('{% include "/assets/templates/' + this._name + '.tpl.njk" ignore missing %}', this.model);
    
    this.renderDescendants();
    this.afterRender();
  }

  /**
   * Render the template of the component
   *
   * @memberof BaseComponent
   */
  render() {
    this.init()
    .then(()=>{
      this._wrapper.innerHTML = this.ENV.renderString('{% include "/assets/templates/' + this._name + '.tpl.njk" ignore missing %}', this.model);
      
      this.renderDescendants();
      this.afterRender();
    })
    .catch((error)=>{
      if (!(error instanceof AppError)) {
        console.error(error);
      }
      else{
        Notification.error(error);
      }
    });
  }

  /**
   * Render the descendants present in this templates
  */
  renderDescendants() {
    let html = this._wrapper.innerHTML;
    let componentNames = html.match(/(?<=\/)(.*?)(?=-component>)/ig);

    if(!componentNames) return;

    componentNames = componentNames.filter((v, i) => componentNames.indexOf(v) == i);

    componentNames.forEach((componentName)=> {

      this._wrapper.querySelectorAll(componentName + '-component').forEach((element)=>{

        let componentInfo = new ComponentInfo(Utils.getNameByTag(componentName) + 'Component', element);
  
        let component = ComponentFactory.instantiate(componentInfo, this);

        element.id = component._id;
  
        if(component)
          component.render();
      });
    });
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
   * Get name of component
   * @return {string}
   */
  get _name() {
    let componentName = this.constructor.name.replace('Component', '');
    return Utils.getTagByName(componentName);
  }

  /**
   * Get wrapper element of component
   * @return {string}
   */
  get _wrapper() {
    return document.querySelector('#'+ this._id);
  }
}
