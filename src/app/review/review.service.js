import {SYSPARAMS} from 'core/utils/system.params';
import {Store} from 'core/store/store';
import {AppError} from 'core/models/errors';

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
    if (response.ok)
      return response.json();

    throw response;
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
    if (response.ok)
      return response.json();

    throw response;
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
    if (response.ok)
      return response.json();

    throw response;
  });
};
