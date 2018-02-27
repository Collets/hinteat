import DBHelper from '../db/dbhelper';

/**
 * Fetch all cuisines and set their HTML.
 * @return {promise}
 */
export function fetchCuisines() {
  let promise = new Promise((resolve, reject) => {
    DBHelper.fetchCuisines()
      .then((cuisines) => {
        fillCuisinesHTML(cuisines);
        resolve(cuisines);
      })
      .catch((error) => {
        if (!(error instanceof AppError)) {
          console.log(error);
          error = new AppError('Unexpected error');
        }

        reject(error);
      });
  });

  return promise;
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
