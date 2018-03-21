import BaseComponent from 'core/base/base.component';

import './restaurant.scss';

/** Restaurant Class */
class RestaurantComponent extends BaseComponent {
  /**
   * Constructor
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
  }
}

export default new RestaurantComponent();
