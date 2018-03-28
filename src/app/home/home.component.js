import BaseComponent from 'core/base/base.component';

import './home.scss';
import MapComponent from 'app/map/map.component';

/** Home Class */
class HomeComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model.setMarkers = this.setMarkers;
    this._model.openFilters = this.openFilters;
    this._model.filter = this.filter;
  }

  /**
   * Make an action after render of the component
   *
   * @memberof HomeComponent
   */
  afterRender() {
  }

  /**
   * Set the current markers information
   * @param {MarkerInfos[]} markerInfos
   */
  setMarkers(markerInfos) {
    this._model.markerInfos = markerInfos;

    this.updatemarkers(markerInfos);
  }

  /**
   * Open filters
   */
  openFilters(){

    this.openfilters();
  }

  /**
   * Call result filter function
   */
  filter(filters){

    this.filter(filters);
  }
}

export default HomeComponent;
