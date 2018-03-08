import DbService from '../db/db.service';

/**
 * Fetch all cuisines and set their HTML.
 * @return {promise}
 */
export function fetchCuisines() {
  return DbService.fetchCuisines();
};
