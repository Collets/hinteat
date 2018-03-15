import {AppError} from 'app/utils/utils';
import * as CuisineService from 'app/cuisine/cuisine.service';
import BaseComponent from 'core/base/base.component';

import {MDCSelect} from '@material/select';
import FiltersComponent from 'app/filters/filters.component';

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
    let select = new MDCSelect(document.querySelector('#cuisines-select'));

    select.listen('MDCSelect:change', () => {
      this.model.selected = select.value;

      FiltersComponent.setCuisine(this.model.selected);
    });
  }
}

export default new CuisineFilterComponent();
