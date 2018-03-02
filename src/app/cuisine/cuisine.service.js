import DbService from '../db/db.service';

/**
 * Fetch all cuisines and set their HTML.
 * @return {promise}
 */
export function fetchCuisines() {
  return DbService.fetchCuisines();
};

/**
 * Set cuisines HTML.
 * @param {any[]} cuisines
 */
export function fillCuisinesHTML(cuisines) {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach((cuisine) => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
};
