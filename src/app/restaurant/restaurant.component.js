import BaseComponent from 'core/base/base.component';
import {MDCRipple} from '@material/ripple';
import {MDCIconToggle} from '@material/icon-toggle';
import {AppError} from 'app/utils/utils';
import * as RestaurantService from 'app/restaurant/restaurant.service';

import './restaurant.scss';

/** Restaurant Class */
class RestaurantComponent extends BaseComponent {
  /**
   * Constructor
   * @param {object} params
  */
  constructor(params) {
    super(params);

    this._model = {
      restaurant: this._restaurant,
    };
  }

  /**
   * Make an action after render of the component
   *
   * @memberof RestaurantComponent
   */
  afterRender() {
    document.querySelectorAll('#' + this._id + ' .mdc-card__primary-action').forEach((element) => {
      MDCRipple.attachTo(element);
    });

    document.querySelectorAll('#' + this._id + ' .add-favorites-button').forEach((element) => {
      MDCRipple.attachTo(element);
    });

    document.querySelectorAll('#' + this._id + ' .open-detail-restaurant').forEach((element) => {
      MDCRipple.attachTo(element);
    });

    if (document.querySelector('#' + this._id + ' .mdc-icon-toggle'))
      MDCIconToggle.attachTo(document.querySelector('#' + this._id + ' .mdc-icon-toggle'));

    if (document.querySelector('#' + this._id + ' .open-detail-restaurant')) {
      document.querySelector('#' + this._id + ' .open-detail-restaurant').addEventListener('click', (e)=>{
        e.preventDefault();

        window.location.href = e.currentTarget.getAttribute('data-url');
      });
    }
  }

  // /**
  //  * Initialize the component
  //  *
  //  * @return {promise}
  //  * @memberof RestaurantComponent
  //  */
  // init() {
  //   let promise = new Promise((resolve, reject)=>{
  //     RestaurantService.get(this._restaurantid)
  //     .then((result)=>{
  //       this.model.restaurant = result;

  //       resolve();
  //     })
  //     .catch((error)=>{
  //       if (!(error instanceof AppError)) {
  //         console.error(error);
  //         error = new AppError('Unexpected error');
  //       }

  //       reject(error);
  //     });
  //   });

  //   return promise;
  // }
}

export default RestaurantComponent;
