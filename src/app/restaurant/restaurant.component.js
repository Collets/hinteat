import BaseComponent from 'core/base/base.component';
import {RouteEngine} from 'core/routing/route';

import './restaurant.scss';

/** Restaurant Class */
class RestaurantComponent extends BaseComponent {
  /**
   * Constructor
   * @param {Object[]} params
  */
  constructor(params) {
    super(params);
  }

  /**
   * Make an action after render of the component
   *
   * @memberof RestaurantComponent
   */
  afterRender() {
    this._wrapper.querySelector('#back-to-home').addEventListener('click', (e)=>{
      e.preventDefault();

      RouteEngine.router.navigate('/');
    });
  }
}

export default new RestaurantComponent();
