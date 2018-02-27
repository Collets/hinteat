export let neighborhoods;

/**
 * Set neighborhoods HTML.
 * @param {object[]} neighborhoods
 */
export function setNeighborhoods(neighborhoods) {
  Neighborhoods.neighborhoods = neighborhoods;
}

/**
 * Fetch all neighborhoods and set their HTML.
 */
export function fetchNeighborhoods() {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      Notification.error(error);
    } else {
      Neighborhoods.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
};

/**
 * Set neighborhoods HTML.
 * @param {object[]} neighborhoods
 */
export function fillNeighborhoodsHTML(neighborhoods = Neighborhoods.neighborhoods) {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach((neighborhood) => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
};

export default {neighborhoods, setNeighborhoods, fetchNeighborhoods, fillNeighborhoodsHTML};
