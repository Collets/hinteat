import {Utils} from 'app/utils/utils';
import ComponentInfo from 'core/component-factory/component-info';

export const ComponentFactory = {
  components: [],
  /**
   * Instantiate the entrypoint
   * @param {string} entrypoint
   * @return {object}
   */
  startup(entrypoint) {
    let startupComponent = this.instantiate(new ComponentInfo(entrypoint, null));

    let startupElement = document.querySelector(Utils.getTagByName(entrypoint));
    startupElement.id = startupComponent._id;

    return startupComponent;
  },
  /**
   *
   * @param {ComponentInfo} componentInfo
   * @return {object}
   */
  instantiate(componentInfo) {
    let cls = this.components.filter(
      (element) => {
        return (element.name && element.name === componentInfo.Name) ||
          (element.constructor && element.constructor.name && element.constructor.name === componentInfo.Name);
      })[0];

    let generatedId = 'comp-' + Utils.guid();

    if (cls && cls.name) {
      let inputs = this.getInputParams(componentInfo.Element);
      let instance = new cls(inputs);
      Reflect.defineProperty(instance, '_id', {value: generatedId});
      return instance;
    }
    else {
      Reflect.defineProperty(cls, '_id', {value: generatedId});

      return cls;
    }
  },
  /**
   * Given a component element return input parameters
   * @param {HTMLElement} element
   * @return {object}
   */
  getInputParams(element) {
    if (!element) return null;

    let params = {};

    Object.keys(element.dataset).filter((key)=>{
      return key.startsWith('in');
    }).forEach((key) => {
      Reflect.defineProperty(params, key.replace('in', '').toLowerCase(), {value: element.dataset[key]});
    });

    return params;
  },
};
