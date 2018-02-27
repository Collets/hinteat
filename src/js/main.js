// APP MODULES
import DBHelper from './db/dbhelper';
import {Notification} from './utils/utils';
import * as Restaurant from './restaurant/restaurant';
import * as Map from './map/map';
import * as Neighborhoods from './neighborhood/neighborhood';

// EXTERNAL MODULES
import loadGoogleMapsApi from 'load-google-maps-api';

// DATA
import '../data/restaurants.json';
import '../styles/diana.scss';

let restaurants;
let neighborhoods;
let cuisines;

/**
 * Fetch all cuisines and set their HTML.
 */
let fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      Notification.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
};

/**
 * Set cuisines HTML.
 * @param {any[]} cuisines
 */
let fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach((cuisine) => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
};

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  Neighborhoods.fetchNeighborhoods();
  fetchCuisines();
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
