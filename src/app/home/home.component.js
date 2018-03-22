import BaseComponent from 'core/base/base.component';

import './home.scss';

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
  }
}

export default new HomeComponent();
