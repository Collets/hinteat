import {AppError} from '../utils/utils';
import * as CuisineService from './cuisine.service';
import * as RestaurantService from '../restaurant/restaurant.service';
import BaseComponent from '../base/base.component';

/** CuisineFilter Class */
class CuisineFilterComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model = {
      cuisines: [],
    };
  }

  /**
   * Initialize the component
   *
   * @return {promise}
   * @memberof CuisineFilterComponent
   */
  init() {
    let promise = new Promise((resolve, reject)=>{
      CuisineService.fetchCuisines()
      .then((results)=>{
        this.model.cuisines = results;

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

  /**
   * Make an action after render of the component
   *
   * @memberof CuisineFilterComponent
   */
  afterRender() {
    let element = document.querySelector('#cuisines-select');

    if (element && element.addEventListener) {
      element.addEventListener('change', () => {
        RestaurantService.updateRestaurants();
      });
    }
  }
}

export default new CuisineFilterComponent();
