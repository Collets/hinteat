import DbService from '../db/db.service';
import {Utils, AppError} from '../utils/utils';
import * as MapService from '../map/map.service';
import Map from '../map/map';
import * as ReviewService from '../review/review.service';

/**
 * Update page and map for current restaurants.
 * @return {promise}
 */
export let updateRestaurants = () => {
  // const cSelect = document.getElementById('cuisines-select');
  // const nSelect = document.getElementById('neighborhoods-select');

  // const cIndex = cSelect.selectedIndex;
  // const nIndex = nSelect.selectedIndex;

  // const cuisine = cSelect[cIndex].value;
  // const neighborhood = nSelect[nIndex].value;

  let promise = new Promise((resolve, reject)=>{
    DbService.fetchRestaurantByCuisineAndNeighborhood('', '')
    .then((restaurants)=>{
      resetRestaurants(restaurants);
      fillRestaurantsHTML(restaurants);

      resolve(restaurants);
    })
    .catch((error)=>{
      if (!(error instanceof AppError)) {
        console.error(error);
        error = new AppError('Unexpected error');
      }

      reject(error);
    });
  });

  return promise;
};

/**
 * Clear current restaurants, their HTML and remove their map markers.
 * @param {any[]} restaurants
 */
export let resetRestaurants = (restaurants) => {
  // Remove all restaurants
  restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  if (Map.markers)
    Map.markers.forEach((m) => m.setMap(null));

  Map.markers = [];
};

/**
 * Get current restaurant from page URL.
 * @return {promise}
 */
export let fetchRestaurantFromURL = () => {
  let promise = new Promise((resolve, reject)=>{
    const id = Utils.getParameterByName('id');

    if (!id) 
      reject(new AppError('No restaurant id in URL'));
     else {
      DbService.fetchRestaurantById(id)
      .then((restaurant)=>{
        fillRestaurantHTML(restaurant);

        resolve(restaurant);
      })
      .catch((error)=>{
        if (!(error instanceof AppError)) {
          console.error(error);
          error = new AppError('Unexpected error');
        }

        reject(error);
      });
    }
  });

  return promise;
};

/**
 * Create restaurant HTML.
 * @param {any} restaurant
 * @return {string}
 */
export let createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');

  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.src = DbService.imageUrlForRestaurant(restaurant);
  li.append(image);

  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DbService.urlForRestaurant(restaurant);
  li.append(more);

  return li;
};

/**
 * Create all restaurants HTML and add them to the webpage.
 * @param {any[]} restaurants
 */
export let fillRestaurantsHTML = (restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach((restaurant) => {
    ul.append(createRestaurantHTML(restaurant));
  });
  MapService.addMarkersToMap(restaurants);
};

/**
 * Create restaurant HTML and add it to the webpage
 * @param {object} restaurant
 */
export let fillRestaurantHTML = (restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img';
  image.src = DbService.imageUrlForRestaurant(restaurant);

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours)
    fillRestaurantHoursHTML(restaurant.operating_hours);

  // fill reviews
  ReviewService.fillReviewsHTML(restaurant.reviews);
};

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 * @param {object} operatingHours
 */
export let fillRestaurantHoursHTML = (operatingHours) => {
  const hours = document.getElementById('restaurant-hours');

  for (let key in operatingHours) {
    if (Object.prototype.hasOwnProperty.call(operatingHours, key)) {
      const row = document.createElement('tr');

      const day = document.createElement('td');
      day.innerHTML = key;
      row.appendChild(day);

      const time = document.createElement('td');
      time.innerHTML = operatingHours[key];
      row.appendChild(time);

      hours.appendChild(row);
    }
  }
};
