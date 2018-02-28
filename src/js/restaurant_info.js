// APP MODULES
import DbService from './db/db.service';
import {Notification, Utils, AppError} from './utils/utils';
import * as RestaurantService from './restaurant/restaurant.service';

// EXTERNAL MODULES
import loadGoogleMapsApi from 'load-google-maps-api';

// DATA
import '../data/restaurants.json';
import '../styles/diana.scss';

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
