import {SYSPARAMS} from 'core/utils/system.params';
import {Store} from 'core/store/store';
import uuidv4 from 'uuid/v4';

/**
 * Fetch the review by id.
 * @param {string} id - id of the review
 * @return {Promise}
 */
export function get(id) {
  let url = `${SYSPARAMS.APIBASEURL}/reviews/${id}`;

  return fetch(url, {
    method: 'GET',
  }).then((response) => {
    if (response.ok) {
      return response.json().then((review) => {
        if (Store.instance)
          Store.syncReview(review);

        return review;
      });
    }

    throw response;
  })
  .catch((error) => {
    if (!Store.instance) throw new Error(`Request failed. Returned status of ${error.status}`);

    return Store.instance.then((db) => {
      const tx = db.transaction('reviews');
      return tx.objectStore('reviews')
      .get(id);
    });
  });
};

/**
 * Fetch all the reviews
 * @return {Promise}
 */
export function getAll() {
  let url = `${SYSPARAMS.APIBASEURL}/reviews/`;

  return fetch(url, {
    method: 'GET',
  }).then((response) => {
    if (response.ok) {
      return response.json().then((reviews) => {
        if (Store.instance)
          Store.sync(null, reviews);

        return reviews;
      });
    }

    throw response;
  })
  .catch((error) => {
    if (!Store.instance) throw new Error(`Request failed. Returned status of ${error.status}`);

    return Store.instance.then((db) => {
      const tx = db.transaction('reviews');
      return tx.objectStore('reviews')
      .getAll();
    });
  });
};

/**
 * Fetch the reviews by restaurant id.
 * @param {string} id - id of the restaurant
 * @return {Promise}
 */
export function getByRestaurant(id) {
  let url = `${SYSPARAMS.APIBASEURL}/reviews/?restaurant_id=${id}`;

  return fetch(url, {
    method: 'GET',
  }).then((response) => {
    if (response.ok) {
      return response.json().then((reviews) => {
        if (Store.instance)
          Store.sync(null, reviews);

        return reviews;
      });
    }

    throw response;
  })
  .catch((error) => {
    if (!Store.instance) throw new Error(`Request failed. Returned status of ${error.status}`);

    return Store.instance.then((db) => {
      const tx = db.transaction('reviews');
      const objStore = tx.objectStore('reviews');
      return objStore.index('restaurant_id')
      .getAll(id);
    });
  });
};

/**
 * Create a new review
 * @param {Object} review
 * @return {Promise}
 */
export function create(review) {
  if (!review) return;

  review.id = uuidv4();
  let url = `${SYSPARAMS.APIBASEURL}/reviews/`;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(review),
  }).then((response) => {
    if (response.ok)
      return response.json();

    throw response;
  })
  .catch((error)=>{
    return Store.syncReview(review);
  });
}
