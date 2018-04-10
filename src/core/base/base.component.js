import Utils from 'core/utils/utils';
import {AppError} from 'core/models/errors';
import Notification from 'core/ui/notification';
import {ComponentFactory} from 'core/component-factory/component-factory';
import * as nunjucks from 'nunjucks/browser/nunjucks';
import ComponentInfo from 'core/component-factory/component-info';

/** Base class for every components */
export default class BaseComponent {
  /** Constructor of base component */
  constructor(params) {
    this.ENV = nunjucks.configure({web: {async: true}});
    this._model = {};

    if(params)
    {
      Object.keys(Object.getOwnPropertyDescriptors(params)).map((key)=>{
        Reflect.defineProperty(this._model, key, 
          {
            value:params[key],
            enumerable: true,
          });
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
  renderComponentContent(parent = this._wrapper, nested = true) {
    let promise = new Promise((resolve, reject)=>{
      this.ENV.renderString('{% include "' + this._name + '.tpl.njk" ignore missing %}', 
        this.model,
        (err, res) => {

          parent.innerHTML = res;

          if(nested){
            this.renderDescendants()
            .then(()=>{
              this.afterRender();
              resolve();
            });
          }
          else{
            this.afterRender();
            resolve();
          }          
        }
      );
    });

    return promise;
  }

  /**
   * Render the template of the component
   *
   * @memberof BaseComponent
   */
  render() {
    let promise = new Promise((resolve, reject)=>{
      this.init()
      .then(()=>{
        this.ENV.renderString('{% include "' + this._name + '.tpl.njk" ignore missing %}', 
        this.model, 
        (err, res) =>{
          this._wrapper.innerHTML = res;
          this.renderDescendants()
          .then(()=>{
            this.afterRender();
            resolve();
          });          
        });
      })
      .catch((error)=>{
        if (!(error instanceof AppError)) {
          console.error(error);
          error = new AppError('Unexpected error');
        }

        reject(error);
      });
    });

    return promise;
  }

  /**
   * Render the descendants present in this templates
  */
  renderDescendants() {
    let promise = new Promise((resolve, reject)=>{
      let html = this._wrapper.innerHTML;
      let componentNames = html.match(/(?<=\/)(.*?)(?=-component>)/ig);
  
      if(!componentNames) {
        resolve();
      }
  
      componentNames = componentNames.filter((v, i) => componentNames.indexOf(v) == i);
  
      let promises = [];
      componentNames.forEach((componentName)=> {
  
        this._wrapper.querySelectorAll(componentName + '-component').forEach((element)=>{
  
          let componentInfo = new ComponentInfo(Utils.getNameByTag(componentName) + 'Component', element);
    
          let component = ComponentFactory.instantiate(componentInfo, this);
  
          element.id = component._id;
    
          if(component)
            promises.push(component.render());
        });
      });

      Promise.all(promises)
      .then((values)=>{
        resolve();
      });
    });

    return promise;    
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
   * @return {HTMLElement}
   */
  get _wrapper() {
    return document.querySelector('#'+ this._id);
  }
}
