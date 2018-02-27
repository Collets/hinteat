import {AppError} from '../utils/utils';
/**
 * Common database helper functions.
 */
export default class DBHelper {
  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 9000; // Change this to your server port
    return `http://localhost:${port}/assets/data/restaurants.json`;
  }

  /**
   * Fetch all restaurants.
   * @return {promise}
   */
  static fetchRestaurants() {
    let promise = new Promise((resolve, reject)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET', DBHelper.DATABASE_URL);
      xhr.onload = () => {
        if (xhr.status === 200) { // Got a success response from server!
          const json = JSON.parse(xhr.responseText);
          const restaurants = json.restaurants;
          resolve(restaurants);
        } else { // Oops!. Got an error from server.
          const error = new AppError(`Request failed. Returned status of ${xhr.status}`);
          reject(error);
        }
      };
      xhr.send();
    });

    return promise;
  }

  /**
   * Fetch a restaurant by its ID.
   * @param {string} id
   * @return {promise}
   */
  static fetchRestaurantById(id) {
    let promise = new Promise((resolve, reject)=>{
      // fetch all restaurants with proper error handling.
      DBHelper.fetchRestaurants()
      .then((restaurants)=>{
        const restaurant = restaurants.find((r) => r.id == id);
        if (restaurant) { // Got the restaurant
          resolve(restaurant);
        } else { // Restaurant does not exist in the database
          reject('Restaurant does not exist');
        }
      }).catch((error)=>{
        if (!(error instanceof AppError)) {
          console.error(error);
          error = new AppError('Unexpected error');
        }

        reject(error);
      });
    });

    return promise;
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   * @param {any} cuisine
   * @param {fetchCallback} callback
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants()
    .then((restaurants)=>{
      // Filter restaurants to have only given cuisine type
      const results = restaurants.filter((r) => r.cuisine_type == cuisine);
      callback(null, results);
    }).catch((error)=>{
      callback(error, null);
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   * @param {any} neighborhood
   * @param {fetchCallback} callback
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants()
    .then((restaurants)=>{
      // Filter restaurants to have only given neighborhood
      const results = restaurants.filter((r) => r.neighborhood == neighborhood);
      callback(null, results);
    }).catch((error)=>{
      callback(error, null);
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with
   * proper error handling.
   * @param {any} cuisine
   * @param {any} neighborhood
   * @return {promise}
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    let promise = new Promise((resolve, reject)=>{
      // fetch all restaurants with proper error handling.
      DBHelper.fetchRestaurants()
      .then((restaurants)=>{
        let results = restaurants;
        if (cuisine != 'all') // filter by cuisine
          results = results.filter((r) => r.cuisine_type == cuisine);

        if (neighborhood != 'all') // filter by neighborhood
          results = results.filter((r) => r.neighborhood == neighborhood);

        resolve(results);
      }).catch((error)=>{
        if (!(error instanceof AppError)) {
          console.error(error);
          error = new AppError('Unexpected error');
        }

        reject(error);
      });
    });

    return promise;
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   * @return {promise}
   */
  static fetchNeighborhoods() {
    let promise = new Promise((resolve, reject)=>{
      // fetch all restaurants with proper error handling.
      DBHelper.fetchRestaurants()
      .then((restaurants)=>{
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);

        resolve(uniqueNeighborhoods);
      }).catch((error)=>{
        if (!(error instanceof AppError)) {
          console.error(error);
          error = new AppError('Unexpected error');
        }

        reject(error);
      });
    });

    return promise;
  }

  /**
   * Fetch all cuisines with proper error handling.
   * @return {promise}
   */
  static fetchCuisines() {
    let promise = new Promise((resolve, reject)=>{
      // fetch all restaurants with proper error handling.
      DBHelper.fetchRestaurants()
      .then((restaurants)=>{
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);

        resolve(uniqueCuisines);
      }).catch((error)=>{
        if (!(error instanceof AppError)) {
          console.error(error);
          error = new AppError('Unexpected error');
        }

        reject(error);
      });
    });

    return promise;
  }

  /**
   * Restaurant page URL.
   * @param {any} restaurant
   * @return {string}
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   * @param {any} restaurant
   * @return {string}
   */
  static imageUrlForRestaurant(restaurant) {
    return (`assets/img/${restaurant.photograph}`);
  }

  /**
   * Map marker for a restaurant.
   * @param {any} restaurant
   * @param {any} map
   * @return {any}
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP,
    });
    return marker;
  }
}
