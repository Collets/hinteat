import {AppError} from 'core/models/errors';
import * as NeighborhoodService from 'app/neighborhood/neighborhood.service';
import BaseComponent from 'core/base/base.component';

import {MDCSelect} from '@material/select';
import FiltersComponent from 'app/filters/filters.component';

/** NeighboorhoodFilter Component Class */
class NeighborhoodFilterComponent extends BaseComponent {
  /**
   * Constructor
   * @param {Object} params
  */
  constructor(params) {
    super(params);

    this._model.neighborhoods = [];
  }

  /**
   * Initialize the component
   *
   * @return {promise}
   * @memberof NeighborhoodFilterComponent
   */
  init() {
    let promise = new Promise((resolve, reject)=>{
      NeighborhoodService.getAll()
      .then((results)=>{
        this.model.neighborhoods = results;

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
   * @memberof NeighborhoodFilterComponent
   */
  afterRender() {
    let select = new MDCSelect(document.querySelector('#neighborhoods-select'));

    select.listen('MDCSelect:change', () => {
      this.model.selected = select.value;
      
      this._model.setvalue(this.model.selected);
    });
  }
}

export default NeighborhoodFilterComponent;
