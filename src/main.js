// DATA
import './assets/data/restaurants.json';
import './app/diana.scss';

import bootstrap from './core/bootstrapper/bootstrapper';

/**
 * Load the application
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
