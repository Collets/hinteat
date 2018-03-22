import BaseComponent from 'core/base/base.component';
import RestaurantFilters from 'app/restaurant/restaurant-filters';

import {AppError} from 'core/models/errors';
import * as RestaurantService from 'app/restaurant/restaurant.service';

import './results.scss';
import MarkerInfo from 'app/map/marker';

/** Results Class */
class ResultsComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model.restaurants = [];
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
        this.setMarkers();

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
   * @memberof RestaurantPreviewComponent
   */
  init() {
    let filters = new RestaurantFilters('all-cuisines', 'all-neighborhoods');
    let promise = new Promise((resolve, reject)=>{
      RestaurantService.retrieve(filters)
      .then((restaurants)=>{
        this.model.restaurants = restaurants;
        this.setMarkers();

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
   * Make an action after render of the component
   *
   * @memberof ResultsComponent
   */
  afterRender() {
  }

  /**
   * Set the markers of the results
   */
  setMarkers() {
    this._model.markerInfos = [];

    this._model.restaurants.forEach((restaurant) => {
      this._model.markerInfos.push(new MarkerInfo(restaurant.name, restaurant.latlng, '/restaurant/' + restaurant.id));
    });

    this._model.setmarkers(this._model.markerInfos);
  }
}

export default new ResultsComponent();
