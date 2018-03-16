import DbService from 'app/db/db.service';

/**
 * Fetch all neighborhoods and set their HTML.
 * @return {promise}
 */
export function get() {
  return DbService.fetchNeighborhoods();
};
