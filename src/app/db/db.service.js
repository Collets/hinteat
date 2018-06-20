import {AppError} from 'core/models/errors';
/**
 * Common database helper functions.
 */
export default class DbService {
  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get APIBASEURL() {
    return process.env.APIBASEURL; // '/assets/data/restaurants.json';
  }

  /**
   * Fetch all restaurants.
   * @return {promise}
   */
  static fetchRestaurants() {
    let promise = new Promise((resolve, reject)=>{
      let url = `${DbService.APIBASEURL}/restaurants/`;

      fetch(url, {
        method: 'GET',
      }).then((response)=>{
        if (response.ok) {
          response.json().then((restaurants) => {
            resolve(restaurants);
          });
        } else { // Oops!. Got an error from server.
          const error = new AppError(`Request failed. Returned status of ${response.status}`);
          reject(error);
        }
      });
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
      let url = `${DbService.APIBASEURL}/restaurants/${id}`;

      fetch(url, {
        method: 'GET',
      }).then((response)=>{
        if (response.ok) {
          response.json().then((json) => {
            const restaurant = json;
            resolve(restaurant);
          });
        } else { // Oops!. Got an error from server.
          const error = new AppError(`Request failed. Returned status of ${response.status}`);
          reject(error);
        }
      });
    });

    return promise;
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with
   * proper error handling.
   * @param {object} cuisine
   * @param {object} neighborhood
   * @return {promise}
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    let promise = new Promise((resolve, reject)=>{
      // fetch all restaurants with proper error handling.
      DbService.fetchRestaurants()
      .then((restaurants)=>{
        let results = restaurants;
        if (cuisine != 'all-cuisines') // filter by cuisine
          results = results.filter((r) => r.cuisine_type == cuisine);

        if (neighborhood != 'all-neighborhoods') // filter by neighborhood
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
   * Fetch restaurants by a cuisine and a neighborhood with
   * proper error handling.
   * @param {object} cuisine
   * @param {object} neighborhood
   * @return {promise}
   */
  static fetchRestaurantByCuisineAndNeighborhoodCount(cuisine, neighborhood) {
    let promise = new Promise((resolve, reject)=>{
      // fetch all restaurants with proper error handling.
      DbService.fetchRestaurants()
      .then((restaurants)=>{
        let results = restaurants;
        if (cuisine != 'all-cuisines') // filter by cuisine
          results = results.filter((r) => r.cuisine_type == cuisine);

        if (neighborhood != 'all-neighborhoods') // filter by neighborhood
          results = results.filter((r) => r.neighborhood == neighborhood);

        resolve(results.length);
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
      DbService.fetchRestaurants()
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
      DbService.fetchRestaurants()
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
   * @param {object} restaurant
   * @return {string}
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   * @param {object} restaurant
   * @return {string}
   */
  static imageUrlForRestaurant(restaurant) {
    return (`assets/img/${restaurant.photograph}`);
  }

  /**
   * Map marker for a restaurant.
   * @param {object} restaurant
   * @param {object} map
   * @return {object}
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DbService.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP,
    });
    return marker;
  }
}
