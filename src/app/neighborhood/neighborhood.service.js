import * as RestaurantService from 'app/restaurant/restaurant.service';

/**
 * Fetch all neighborhoods and set their HTML.
 * @return {promise}
 */
export function getAll() {
  return RestaurantService.getAll()
  .then((restaurants) => {
    const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
    // Remove duplicates from neighborhoods
    const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);

    return uniqueNeighborhoods;
  }).catch((error)=>{
    if (!(error instanceof AppError)) {
      console.error(error);
      error = new AppError('Unexpected error');
    }

    return error;
  });
};
