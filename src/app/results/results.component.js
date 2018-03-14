import BaseComponent from 'core/base/base.component';
import RestaurantFilters from 'app/restaurant/restaurant-filters';

import * as RestaurantService from 'app/restaurant/restaurant.service';

import './results.scss';

/** Results Class */
class ResultsComponent extends BaseComponent {
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
   * Filter the results
   *
   * @param {RestaurantFilters} filters
   * @return {Promise}
  */
  filter(filters) {
    let promise = new Promise((resolve, reject)=>{
      RestaurantService.retrieve(filters)
      .then((restaurants)=>{
        this.model.restaurants = restaurants;

        this.renderComponentContent();
        resolve();
      })
      .catch((error)=>{
        if (!(error instanceof AppError))
          console.error(error);
        else
          Notification.error(error);
      });
    });
  
    return promise;
  }

  /**
   * Initialize the component
   *
   * @return {promise}
   * @memberof RestaurantComponent
   */
  init() {
    return this.filter(new RestaurantFilters('all', 'all'));
  }

  /**
   * Make an action after render of the component
   *
   * @memberof ResultsComponent
   */
  afterRender() {
    this.renderDescendants();
  }
}

export default new ResultsComponent();
