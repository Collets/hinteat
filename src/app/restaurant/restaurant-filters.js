/**
 * Filters for restaurant search
 * @typedef {Object} RestaurantFilters
 * @property {string} Cuisine
 * @property {string} Neighboorhood
 */

/** RestaurantFilters Class */
export default class RestaurantFilters {
  /**
   * Constructor of RestaurantFilters
   *
   * @param {string} cuisine
   * @param {string} neighboorhood
   */
  constructor(cuisine, neighboorhood) {
    this.Cuisine = cuisine;
    this.Neighboorhood = neighboorhood;
  }
}