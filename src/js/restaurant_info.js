// APP MODULES
import DBHelper from './db/dbhelper';
import {Notification, Utils} from './utils/utils';
import * as Restaurant from './restaurant/restaurant';
import * as Map from './map/map';

// EXTERNAL MODULES
import loadGoogleMapsApi from 'load-google-maps-api';

// DATA
import '../data/restaurants.json';
import '../styles/diana.scss';

let restaurant;

/**
 * @callback fetchCallback
 * @param {object} error
 * @param {object} entity
 */

/**
 * Initialize Google map, called from HTML.
 */
let initMap = () => {
  Restaurant.fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      Notification.error(error);
    } else {
      Map.setMap(new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false,
      }));
      Utils.fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, Map.map);
    }
  });
};

loadGoogleMapsApi({
  key: 'AIzaSyAOkAj3CSayTd27Md2c1rRi3m_t5aqDm4w',
  libraries: ['places'],
}).then(initMap);
