import BaseComponent from 'core/base/base.component';
import {RestaurantService} from 'app/restaurant/restaurant.service';

import './restaurant.scss';

/** Restaurant Class */
class RestaurantComponent extends BaseComponent {
  /**
   * Constructor
   * @param {number} id
  */
  constructor(id) {
    super();

    this._id = id;
    this._model = {
      restaurant: null,
    };
  }

  /**
   * Make an action after render of the component
   *
   * @memberof RestaurantComponent
   */
  afterRender() {
  }

  /**
   * Initialize the component
   *
   * @return {promise}
   * @memberof RestaurantComponent
   */
  init() {
    let promise = new Promise((resolve, reject)=>{
      RestaurantService.getRestaurant(this._id)
      .then((result)=>{
        this.model.restaurant = result;

        resolve();
      })
      .catch((err)=>{
        if (!(error instanceof AppError)) {
          console.error(error);
          error = new AppError('Unexpected error');
        }

        reject(error);
      });
    });

    return promise;
  }
}

export default new RestaurantComponent();
