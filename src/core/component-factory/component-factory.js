import Utils from 'core/utils/utils';
import ComponentInfo from 'core/component-factory/component-info';
import RouterComponent from 'core/routing/router.component';

export const ComponentFactory = {
  components: [],
  startupComponent: null,
  /**
   * Instantiate the entrypoint
   * @param {string} entrypoint
   * @return {Promise}
   */
  startup(entrypoint) {
    let promise = new Promise((resolve, reject) => {
      this.startupComponent = this.instantiate(new ComponentInfo(entrypoint, null));

      let startupElement = document.querySelector(Utils.getTagByName(entrypoint));
      startupElement.id = this.startupComponent._id;

      this.startupComponent.renderComponentContent(undefined, false)
      .then(()=>{
        resolve();
      });
    });

    return promise;
  },
  /**
   *
   * @param {ComponentInfo} componentInfo
   * @param {object} context
   * @return {object}
   */
  instantiate(componentInfo, context) {
    let cls = this.components.filter(
      (element) => {
        return (element.name && element.name === componentInfo.Name) ||
          (element.constructor && element.constructor.name && element.constructor.name === componentInfo.Name);
      })[0];

    let generatedId = 'comp-' + Utils.guid();

    let inputs = this.getInputParams(componentInfo.Element, context);

    if (cls && cls.name) {
      let instance = new cls(inputs);
      Reflect.defineProperty(instance, '_id', {value: generatedId});
      this.setInputFunction(componentInfo.Element, instance, context);
      return instance;
    } else {
      Reflect.defineProperty(cls, '_id', {value: generatedId});

      this._setModelByParams(cls, inputs);
      this.setInputFunction(componentInfo.Element, cls, context);

      return cls;
    }
  },
  /**
   * Given a component element return input parameters
   * @param {HTMLElement} element
   * @param {object} context
   * @return {object}
   */
  getInputParams(element, context) {
    if (!element) return null;

    let params = {};

    Object.keys(element.dataset).forEach((key) => {
      if (key.startsWith('injs') && !key.startsWith('injsfn')) {
        let expr = 'model.' + element.dataset[key];
        let value = Utils.get(expr, context);

        if (value instanceof Function) return;

        Reflect.defineProperty(params, key.replace('injs', '').toLowerCase(), {value: value, writable: true, configurable: true, enumerable: true});
      } else if (key.startsWith('in') && !key.startsWith('injsfn')) {
        Reflect.defineProperty(params, key.replace('in', '').toLowerCase(), {
          value: element.dataset[key],
          writable: true,
          configurable: true,
        });
      } else if (key.startsWith('outjs')) {
        let expr = 'model.' + element.dataset[key];
        let value = Utils.get(expr, context);

        if (value instanceof Function)
          value = value.bind(context);

        Reflect.defineProperty(params, key.replace('outjs', '').toLowerCase(), {value: value, writable: true, configurable: true, enumerable: true});
      }
    });

    return params;
  },
  /**
   * Set the functions of current component to be exposed
   *
   * @param {HTMLElement} element element of the instance component
   * @param {Object} context instance of the current component
   * @param {Object} parentContext instance of the parent component
   */
  setInputFunction(element, context, parentContext) {
    if (!element) return;

    Object.keys(element.dataset).forEach((key) => {
      if (!key.startsWith('injsfn')) return;

      let fnName = element.dataset[key];
      let fn = context[fnName];

      if (fn instanceof Function) {
        fn = fn.bind(context);
        Reflect.defineProperty(parentContext, key.replace('injsfn', '').toLowerCase(), {value: fn});
      }
    });
  },
  /**
   * Set the starter component of the current page
   * @param {string} componentName
   * @param {Array} params
   * @return {Promise}
   */
  setRouterComponent(componentName, params) {
    let promise = new Promise((resolve, reject)=>{
      let componentTag = Utils.getTagByName(componentName);

      let routerComponentElement = document.querySelector('router-component');
      routerComponentElement.innerHTML = '<' + componentTag + '></' + componentTag + '>';
  
      if (params)
        this._setParams(params, componentTag, routerComponentElement);
  
      let routerComponent = this._instantiateRouting();
  
      routerComponent.renderDescendants()
      .then(()=>{
        resolve();
      });
    });
    
    return promise;
  },
  /**
   * Called when the render engine ended
   */
  endRender() {
    console.log('ENDED');
  },
  /**
   * Helper to instantiate router component
   * @return {Object}
   */
  _instantiateRouting() {
    let routerComponentElement = document.querySelector('router-component');

    let componentInfo = new ComponentInfo('RouterComponent', routerComponentElement);
    let routerComponent = this.instantiate(componentInfo);
    routerComponentElement.id = routerComponent._id;

    return routerComponent;
  },
  /**
   * Set params to HTML node
   * @param {Array} params
   * @param {string} tagName
   * @param {HTMLElement} context
   */
  _setParams(params, tagName, context = document) {
    let element = context.querySelector(tagName);

    Object.keys(params).forEach((key)=>{
      element.setAttribute('data-in-' + key, params[key]);
    });
  },
  /**
   * Set model of component by element data input
   * @param {Object} component
   * @param {Object[]} inputs
   */
  _setModelByParams(component, inputs) {
    if (inputs) {
      Object.keys(Object.getOwnPropertyDescriptors(inputs)).map((key)=>{
        Reflect.defineProperty(component._model, key,
          {
            value: inputs[key],
            enumerable: true,
          });
      });
    }
  },
};
