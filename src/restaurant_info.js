// APP MODULES
import DbService from './app/db/db.service';
import Utils from './core/utils/utils';
import {AppError} from 'core/models/errors';
import Notification from 'core/ui/notification';
import * as RestaurantService from './app/restaurant/restaurant.service';

// EXTERNAL MODULES
import loadGoogleMapsApi from 'load-google-maps-api';

// DATA
import './assets/data/restaurants.json';

let restaurant;
let map;

/**
 * @callback fetchCallback
 * @param {object} error
 * @param {object} entity
 */

/**
 * Initialize Google map, called from HTML.
 */
let initMap = () => {
  RestaurantService.fetchRestaurantFromURL()
  .then((result)=>{
    restaurant = result;

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: restaurant.latlng,
      scrollwheel: false,
    });
    Utils.fillBreadcrumb(restaurant);
    DbService.mapMarkerForRestaurant(restaurant, map);
  })
  .catch((error)=>{
    if (!(error instanceof AppError)) {
      console.error(error);
      error = 'Unexpected error';
    }

    Notification.error(error);
  });
};

loadGoogleMapsApi({
  key: 'AIzaSyAOkAj3CSayTd27Md2c1rRi3m_t5aqDm4w',
  libraries: ['places'],
}).then(initMap);
