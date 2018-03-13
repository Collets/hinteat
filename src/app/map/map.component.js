import BaseComponent from 'core/base/base.component';
import loadGoogleMapsApi from 'load-google-maps-api';

import './map.scss';

/** Map Class */
class MapComponent extends BaseComponent {
  /**
   * Constructor
   */
  constructor() {
    super();

    this._model = {
      map: null,
    };
  }

  /**
   * Make an action after render of the component
   *
   * @memberof MapComponent
   */
  afterRender() {
    loadGoogleMapsApi({
      key: 'AIzaSyAOkAj3CSayTd27Md2c1rRi3m_t5aqDm4w',
      libraries: ['places'],
    }).then(()=>{
      this.initMap();
    });
  }

  /**
   * Initialize Google map.
   *
   * @memberof MapComponent
   */
  initMap() {
    let loc = {
      lat: 40.722216,
      lng: -73.987501,
    };
    this.model.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: loc,
      scrollwheel: false,
    });
  };
}

export default new MapComponent();
