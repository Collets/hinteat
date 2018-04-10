import BaseComponent from 'core/base/base.component';
import * as RestaurantService from 'app/restaurant/restaurant.service';
import {RouteEngine} from 'core/routing/route';
import {MDCToolbar} from '@material/toolbar';
import {MDCIconToggle} from '@material/icon-toggle';
import {MDCDialog} from '@material/dialog';

import './restaurant.scss';
import MarkerInfo from 'app/map/marker';

/** Restaurant Class */
class RestaurantComponent extends BaseComponent {
  /**
   * Constructor
   * @param {Object[]} params
  */
  constructor(params) {
    super(params);
  }

  /**
   * Make an action after render of the component
   *
   * @memberof RestaurantComponent
   */
  afterRender() {
    this._toolbar = MDCToolbar.attachTo(this._wrapper.querySelector('.mdc-toolbar'));
    this._toolbar.fixedAdjustElement = this._wrapper.querySelector('.mdc-toolbar-fixed-adjust');
    this._toolbar.listen('MDCToolbar:change', (evt) => {
      let flexibleExpansionRatio = evt.detail.flexibleExpansionRatio;

      if (this._wrapper) {
        if (flexibleExpansionRatio.toFixed(2) < 0.05)
          this._wrapper.querySelector('.restaurant-cover__wrapper').setAttribute('aria-hidden', true);
        else
          this._wrapper.querySelector('.restaurant-cover__wrapper').setAttribute('aria-hidden', false);
      }
    });

    this._wrapper.querySelector('#back-to-home').addEventListener('click', (e)=>{
      e.preventDefault();

      RouteEngine.router.navigate('/');
    });

    this._wrapper.querySelector('.see-all-hours').addEventListener('click', (e)=>{
      e.preventDefault();

      this._dialog.show();
    });

    this._wrapper.querySelector('#open-restaurant-map').addEventListener('click', (e)=>{
      e.preventDefault();
      
      this.openmap();
    });
    
    if (this._wrapper.querySelector('.add-favorites-button'))
      MDCIconToggle.attachTo(this._wrapper.querySelector('.add-favorites-button'));

    if (this._wrapper.querySelector('#opening-hours-dialog'))
      this._dialog = new MDCDialog(this._wrapper.querySelector('#opening-hours-dialog'));
  }

  /**
   * Initialize the component
   *
   * @return {promise}
   * @memberof RestaurantComponent
   */
  init() {
    let promise = new Promise((resolve, reject)=>{
      RestaurantService.get(this._model.id)
      .then((restaurant)=>{
        this._model.restaurant = restaurant;
        this._model.actualHours = this.getActualHours();
        this._model.markerInfos = [];
        this._model.markerInfos.push(new MarkerInfo(restaurant.name, restaurant.latlng, '/restaurant/' + restaurant.id));

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
   * Get the opening hours for today
   * @return {string}
   */
  getActualHours() {
    let weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    let date = new Date();
    let today = weekday[date.getDay()];

    return this._model.restaurant.operating_hours[today];
  }
}

export default RestaurantComponent;
