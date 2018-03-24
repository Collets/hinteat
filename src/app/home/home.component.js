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

    if(!MapComponent.model.markerinfos)
      MapComponent.model.markerinfos = markerInfos;
    MapComponent.addMarkers();
  }
}

export default new HomeComponent();
