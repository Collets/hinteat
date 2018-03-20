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
  
      this.startupComponent.render();
      
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
   */
  setRouterComponent(componentName) {
    let componentTag = Utils.getTagByName(componentName);

    document.querySelector('router-component').innerHTML = '<' + componentTag + '></' + componentTag + '>';
    RouterComponent.render();
  },
};
