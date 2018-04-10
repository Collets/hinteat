import DbService from 'app/db/db.service';
import RestaurantFilters from 'app/restaurant//restaurant-filters';

import Utils from 'core/utils/utils';
import {AppError} from 'core/models/errors';
import * as ReviewService from 'app/review/review.service';

/**
 * Get Restaurant by id
 *
 * @param {number} id
 * @return {object}
 */
export function get(id) {
  return DbService.fetchRestaurantById(id);
};

/**
 * Retrieve restaurants
 *
 * @param {RestaurantFilters} filters
 * @return {Promise}
*/
export function retrieve(filters) {
  if (!filters) return;

  return DbService.fetchRestaurantByCuisineAndNeighborhood(filters.Cuisine, filters.Neighboorhood);
}

/**
 * Retrieve restaurants count
 *
 * @param {RestaurantFilters} filters
 * @return {Promise}
*/
export function retrieveCount(filters) {
  if (!filters) return;

  return DbService.fetchRestaurantByCuisineAndNeighborhoodCount(filters.Cuisine, filters.Neighboorhood);
}

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
