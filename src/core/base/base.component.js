import {Utils} from 'utils/utils';
import {ComponentFactory} from 'core/component-factory/component-factory';
import * as nunjucks from 'node_modules/nunjucks/browser/nunjucks';

/** Base class for every components */
export default class BaseComponent {
  /** Constructor of base component */
  constructor() {
    this.ENV = nunjucks.configure({web: {async: false}});
    this._model = {};

    this.init()
    .then(()=>{
      let wrapper = document.querySelector(this.id + '-component');

      if (wrapper)
        this.renderComponentContent(wrapper);
    })
    .catch(()=>{});
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
    // let wrapper = document.createElement('div');
    // wrapper.innerHTML = this.ENV.renderString('<' + this.id + '-component> {% include "/assets/templates/' + this.id + '.tpl.njk" ignore missing %} </' + this.id + '-component>', this.model);

    // if (ontop)
    //   parent.insertBefore(wrapper.firstChild, parent.firstChild);
    // else
    //   parent.appendChild(wrapper.firstChild);
    // this.afterRender();
    this.wrapper.innerHTML = this.ENV.renderString('{% include "/assets/templates/' + this.id + '.tpl.njk" ignore missing %}', this.model);
    this.renderDescendants();
    this.afterRender();
  }

  /**
   * Render the descendants present in this templates
  */
  renderDescendants() {
    let html = this.wrapper.innerHTML;
    let components = html.match(/(?<=\/)(.*?)(?=-component>)/ig);
    
    if(!components) return;

    components = components.filter((v, i) => components.indexOf(v) == i);

    components.forEach((element) => {
      let componentName = Utils.getNameById(element) + 'Component';

      let component = ComponentFactory.instantiate(componentName);

      if(component)
        component.render();
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
      reject();
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

  /**
   * Get wrapper element of component
   * @return {string}
   */
  get wrapper() {
    return document.querySelector(Utils.getIdByName(this.constructor.name));
  }
}
