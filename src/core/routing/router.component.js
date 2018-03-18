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
    RouteEngine.initialize('http://localhost:9000/');
    this.renderDescendants();
  }
}

export default new RouterComponent();
