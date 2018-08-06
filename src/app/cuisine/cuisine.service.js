import * as RestaurantService from 'app/restaurant/restaurant.service';

/**
 * Fetch all cuisines and set their HTML.
 * @return {promise}
 */
export function getAll() {
  return RestaurantService.getAll()
  .then((restaurants) => {
    const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
    // Remove duplicates from cuisines
    const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);

    return uniqueCuisines;
  }).catch((error)=>{
    if (!(error instanceof AppError)) {
      console.error(error);
      error = new AppError('Unexpected error');
    }

    throw error;
  });
};
