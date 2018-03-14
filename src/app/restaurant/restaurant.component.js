import BaseComponent from 'core/base/base.component';

import './restaurant.scss';

/** Restaurant Class */
class RestaurantComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model = {
      restaurants: [],
    };
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
