import loadGoogleMapsApi from 'load-google-maps-api';

/** Map "global" class */
class Map {
  /**
   * Constructor of Map
  */
  constructor() {
    this._entity = null;
    // this._markers = [];
  }

  /**
   * entity getter
  */
  get entity() {
    return this._entity;
  }

  /**
   * entity setter
   * @param {object} value
  */
  set entity(value) {
    this._entity = value;
  }

  // /**
  //  * markers getter
  // */
  // get markers() {
  //   return this._markers;
  // }

  // /**
  //  * markers setter
  //  * @param {object[]} values
  // */
  // set markers(values) {
  //   this._markers = values;
  // }

  /**
   * Load map from Google Maps API
   * @return {Promise}
   */
  loadMap() {
    let promise = new Promise((resolve, reject)=>{
      if (!this._entity) {
        loadGoogleMapsApi({
          key: process.env.MAPSAPIKEY,
          libraries: ['places'],
        }).then((googleMaps)=>{
          this._entity = googleMaps;
          resolve(this._entity);
        });
      }else{
        resolve(this._entity);
      }      
    });

    return promise;
  }
};

export default new Map();
