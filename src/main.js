// APP MODULES
import {Notification} from './app/utils/utils';
import Map from './app/map/map';
import * as RestaurantService from './app/restaurant/restaurant.service';
import * as NeighborhoodService from './app/neighborhood/neighborhood.service';
import * as CuisineService from './app/cuisine/cuisine.service';

// EXTERNAL MODULES
import loadGoogleMapsApi from 'load-google-maps-api';

// DATA
import './assets/data/restaurants.json';
import './app/diana.scss';

let restaurants;
let cuisines;
let neighborhoods;

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  NeighborhoodService.fetchNeighborhoods()
  .then((result)=>{
    neighborhoods = result;
  })
  .catch((error)=>{
    Notification.error(error);
  });

  CuisineService.fetchCuisines()
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
  Map.entity = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false,
  });

  RestaurantService.updateRestaurants().then((results)=>{
    restaurants = results;
  })
  .catch((error)=>{
    Notification.error(error);
  });
};

loadGoogleMapsApi({
  key: 'AIzaSyAOkAj3CSayTd27Md2c1rRi3m_t5aqDm4w',
  libraries: ['places'],
}).then(initMap);
