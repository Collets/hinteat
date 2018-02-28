import DbService from '../db/db.service';
import Map from '../map/map';

/**
 * Add markers for current restaurants to the map.
 * @param {any[]} restaurants
 */
export function addMarkersToMap(restaurants) {
  restaurants.forEach((restaurant) => {
    // Add marker to the map
    const marker = DbService.mapMarkerForRestaurant(restaurant, Map.entity);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url;
    });
    Map.markers.push(marker);
  });
};

export default {addMarkersToMap};
