import DBHelper from '../db/dbhelper';

export let map;
export let markers;

/**
 * Set the map.
 * @param {object[]} markers
 */
export function setMarkers(markers) {
  Map.markers = markers;
}

/**
 * Set the map.
 * @param {*} map
 */
export function setMap(map) {
  Map.map = map;
}

/**
 * Add markers for current restaurants to the map.
 * @param {any[]} restaurants
 */
export function addMarkersToMap(restaurants = self.restaurants) {
  restaurants.forEach((restaurant) => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, Map.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url;
    });
    Map.markers.push(marker);
  });
};

export default {map, markers, addMarkersToMap, setMap, setMarkers};
