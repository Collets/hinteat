// APP MODULES
import DBHelper from './db/dbhelper';
import {Notification} from './utils/utils';
import * as Restaurant from './restaurant/restaurant';
import * as Map from './map/map';
import * as Neighborhood from './neighborhood/neighborhood';
import * as Cuisine from './cuisine/cuisine';

// EXTERNAL MODULES
import loadGoogleMapsApi from 'load-google-maps-api';

// DATA
import '../data/restaurants.json';
import '../styles/diana.scss';

let restaurants;
let cuisines;
let neighborhoods;

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  Neighborhood.fetchNeighborhoods()
  .then((result)=>{
    neighborhoods = result;
  })
  .catch((error)=>{
    Notification.error(error);
  });

  Cuisine.fetchCuisines()
  .then((result)=>{
    cuisines = result;
  })
  .catch((error)=>{
    Notification.error(error);
  });
});

/**
 * Initialize Google map, called from HTML.
 */
let initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501,
  };
  Map.setMap(new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false,
  }));
  Restaurant.updateRestaurants();
};

loadGoogleMapsApi({
  key: 'AIzaSyAOkAj3CSayTd27Md2c1rRi3m_t5aqDm4w',
  libraries: ['places'],
}).then(initMap);
