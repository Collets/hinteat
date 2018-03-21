import BaseComponent from 'core/base/base.component';
import {MDCRipple} from '@material/ripple';
import {MDCIconToggle} from '@material/icon-toggle';
import {RouteEngine} from 'core/routing/route';

import './restaurant-preview.scss';

/** RestaurantPreview Class */
class RestaurantPreviewComponent extends BaseComponent {
  /**
   * Constructor
   * @param {object} params
  */
  constructor(params) {
    super(params);
  }

  /**
   * Make an action after render of the component
   *
   * @memberof RestaurantPreviewComponent
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

        RouteEngine.router.navigate('/restaurant/1');
      });
    }
  }
}

export default RestaurantPreviewComponent;
