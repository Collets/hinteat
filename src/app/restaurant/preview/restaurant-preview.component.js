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
    this._wrapper.querySelectorAll('.mdc-card__primary-action').forEach((element) => {
      MDCRipple.attachTo(element);
    });

    this._wrapper.querySelectorAll('.add-favorites-button').forEach((element) => {
      MDCRipple.attachTo(element);
    });

    this._wrapper.querySelectorAll('.open-detail-restaurant').forEach((element) => {
      MDCRipple.attachTo(element);
    });

    if (this._wrapper.querySelector('.mdc-icon-toggle'))
      MDCIconToggle.attachTo(this._wrapper.querySelector('.mdc-icon-toggle'));

    if (this._wrapper.querySelectorAll('.open-detail-restaurant')) {
      this._wrapper.querySelectorAll('.open-detail-restaurant')
      .forEach((element)=>{
        element.addEventListener('click', (e)=>{
          e.preventDefault();

          let id = e.currentTarget.getAttribute('data-id');
          RouteEngine.router.navigate('/restaurant/' + id);
        });
      });
    }
  }
}

export default RestaurantPreviewComponent;
