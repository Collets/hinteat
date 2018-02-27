import DBHelper from '../db/dbhelper';

/**
 * Fetch all neighborhoods and set their HTML.
 * @return {promise}
 */
export function fetchNeighborhoods() {
  let promise = new Promise((resolve, reject)=>{
    DBHelper.fetchNeighborhoods()
    .then((neighborhoods)=>{
      fillNeighborhoodsHTML(neighborhoods);
      resolve(neighborhoods);
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
 * Set neighborhoods HTML.
 * @param {object[]} neighborhoods
 */
export function fillNeighborhoodsHTML(neighborhoods) {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach((neighborhood) => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
};

export default {fetchNeighborhoods, fillNeighborhoodsHTML};
