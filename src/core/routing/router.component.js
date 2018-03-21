import BaseComponent from 'core/base/base.component';
import {RouteEngine} from 'core/routing/route';

/** Router Class */
class RouterComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model = {
    };
  }

  /**
   * Make an action after render of the component
   *
   * @memberof RouterComponent
   */
  afterRender() {
  }
}

export default new RouterComponent();
