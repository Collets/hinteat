
/** Map "global" class */
class Map {
  /**
   * Constructor of Map
  */
  constructor() {
    this._entity = null;
    this._markers = [];
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

  /**
   * markers getter
  */
  get markers() {
    return this._markers;
  }

  /**
   * markers setter
   * @param {object[]} values
  */
  set markers(values) {
    this._markers = values;
  }
};

export default new Map();
