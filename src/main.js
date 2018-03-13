// DATA
import './assets/data/restaurants.json';
import './app/diana.scss';

// UTILS
import {Notification} from './app/utils/utils';

// SERVICES

import * as RestaurantService from './app/restaurant/restaurant.service';
import * as NeighborhoodService from './app/neighborhood/neighborhood.service';
import * as CuisineService from './app/cuisine/cuisine.service';

// COMPONENTS
import Map from './app/map/map';
import CuisineFilterComponent from './app/cuisine/cuisine-filter.component';
import NeighborhoodFilterComponent from './app/neighborhood/neighborhood-filter.component';
import HeaderComponent from './app/header/header.component';
import NavigationComponent from './app/navigation/navigation.component';
import FiltersComponent from './app/filters/filters.component';
import AppComponent from './app/app.component';

import {ComponentFactory} from './core/component-factory/component-factory';
import bootstrap from './core/bootstrapper/bootstrapper';
// EXTERNAL MODULES
import loadGoogleMapsApi from 'load-google-maps-api';


let restaurants;
let cuisines;
let neighborhoods;

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  bootstrap('AppComponent');
});

// /**
//  * Initialize Google map, called from HTML.
//  */
// let initMap = () => {
//   let loc = {
//     lat: 40.722216,
//     lng: -73.987501,
//   };
//   Map.entity = new google.maps.Map(document.getElementById('map'), {
//     zoom: 12,
//     center: loc,
//     scrollwheel: false,
//   });

//   RestaurantService.updateRestaurants().then((results)=>{
//     restaurants = results;
//   })
//   .catch((error)=>{
//     Notification.error(error);
//   });
// };

// loadGoogleMapsApi({
//   key: 'AIzaSyAOkAj3CSayTd27Md2c1rRi3m_t5aqDm4w',
//   libraries: ['places'],
// }).then(initMap);
