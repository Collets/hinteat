import {AppError} from 'app/utils/utils';
import * as NeighboorhoodService from 'app/neighborhood/neighborhood.service';
import BaseComponent from 'core/base/base.component';

import {MDCSelect} from '@material/select';
import FiltersComponent from 'app/filters/filters.component';

/** NeighboorhoodFilter Component Class */
class NeighborhoodFilterComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model = {
      neighborhoods: [],
    };
  }

  /**
   * Initialize the component
   *
   * @return {promise}
   * @memberof NeighborhoodFilterComponent
   */
  init() {
    let promise = new Promise((resolve, reject)=>{
      NeighboorhoodService.fetchNeighborhoods()
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
      
      FiltersComponent.setNeighboorhood(this.model.selected);
    });
  }
}

export default new NeighborhoodFilterComponent();
