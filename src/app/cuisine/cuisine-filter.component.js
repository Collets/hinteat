import {AppError} from '../utils/utils';
import * as CuisineService from './cuisine.service';
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
   * @memberof CuisineComponent
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
}

export default new CuisineFilterComponent();
