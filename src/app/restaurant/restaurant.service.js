import {SYSPARAMS} from 'core/utils/system.params';
import {Store} from 'core/store/store';
import {AppError} from 'core/models/errors';

/**
 * Get Restaurant by id
 *
 * @param {number} id
 * @return {Promise}
 */
export function get(id) {
  let url = `${SYSPARAMS.APIBASEURL}/restaurants/${id}`;

  return fetch(url, {
    method: 'GET',
  }).then((response) => {
    if (response.ok) {
      return response.json().then((restaurant) => {
        if (Store.instance)
          Store.syncRestaurant(restaurant);

        return restaurant;
      });
    }

    throw response;
  })
  .catch((error) => {
    if (!Store.instance) throw new Error(`Request failed. Returned status of ${error.status}`);

    return Store.instance.then((db) => {
      const tx = db.transaction('restaurants');
      return tx.objectStore('restaurants')
      .get(id);
    });
  });
};

/**
 * Get all Restaurants
 *
 * @return {Promise}
 */
export function getAll() {
  let url = `${SYSPARAMS.APIBASEURL}/restaurants/`;

  return fetch(url, {
    method: 'GET',
  }).then((response) => {
    if (response.ok) {
      return response.json().then((restaurants) => {
        if (Store.instance)
          Store.sync(restaurants);

        return restaurants;
      });
    }

    throw response;
  })
  .catch((error) => {
    if (!Store.instance) throw new Error(`Request failed. Returned status of ${error.status}`);

    return Store.instance.then((db) => {
      const tx = db.transaction('restaurants');
      return tx.objectStore('restaurants')
      .getAll();
    });
  });
}

/**
 * Toggle the favorite state of a restaurant
 * @param {string} id Id of the restaurant
 * @return {Promise}
 */
export function toggleFavorite(id) {
  let url = `${SYSPARAMS.APIBASEURL}/restaurants/${id}/?is_favorite=`;

  return get(id).then((restaurant)=>{
    let favorite = !restaurant.is_favorite;
    restaurant.is_favorite = favorite;

    url += favorite;
    return fetch(url, {
      method: 'PUT',
    }).then((response) => {
      if (response.ok)
        return Store.updateRestaurant(restaurant);

      throw response;
    });
  });
}

/**
 * Retrieve restaurants
 *
 * @param {RestaurantFilters} filters
 * @return {Promise}
*/
export function retrieve(filters) {
  if (!filters) return;

  return getAll().
  then((restaurants) =>{
    let results = restaurants;
    if (filters.Cuisine != 'all-cuisines') // filter by cuisine
      results = results.filter((r) => r.cuisine_type == filters.Cuisine);

    if (filters.Neighboorhood != 'all-neighborhoods') // filter by neighborhood
      results = results.filter((r) => r.neighborhood == filters.Neighboorhood);

    return results;
  })
  .catch((error) => {
    if (!(error instanceof AppError)) {
      console.error(error);
      error = new AppError('Unexpected error');
    }

    throw error;
  });
}

/**
 * Retrieve restaurants count
 *
 * @param {RestaurantFilters} filters
 * @return {Promise}
*/
export function retrieveCount(filters) {
  if (!filters) return;

  return retrieve(filters)
  .then((restaurants) => {
    return restaurants.length;
  })
  .catch((error)=>{
    if (!(error instanceof AppError)) {
      console.error(error);
      error = new AppError('Unexpected error');
    }

    throw error;
  });
}
