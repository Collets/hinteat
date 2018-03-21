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

      this.startupComponent.renderComponentContent(undefined, false);

      resolve();
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
      return instance;
    } else {
      Reflect.defineProperty(cls, '_id', {value: generatedId});

      this._setModelByParams(cls, inputs);

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
      if (key.startsWith('injs')) {
        let expr = 'model.' + element.dataset[key];
        let value = Utils.get(expr, context);
        Reflect.defineProperty(params, key.replace('injs', '').toLowerCase(), {value: value});
      } else if (key.startsWith('in'))
        Reflect.defineProperty(params, key.replace('in', '').toLowerCase(), {value: element.dataset[key]});
    });

    return params;
  },
  /**
   * Set the starter component of the current page
   * @param {string} componentName
   * @param {Array} params
   */
  setRouterComponent(componentName, params) {
    let componentTag = Utils.getTagByName(componentName);

    let routerComponentElement = document.querySelector('router-component');
    routerComponentElement.innerHTML = '<' + componentTag + '></' + componentTag + '>';

    if (params)
      this._setParams(params, componentTag, routerComponentElement);

    let routerComponent = this._instantiateRouting();

    routerComponent.renderDescendants();
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
