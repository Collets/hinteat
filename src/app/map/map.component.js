import BaseComponent from 'core/base/base.component';
import loadGoogleMapsApi from 'load-google-maps-api';

import {MDCRipple} from '@material/ripple';

import './map.scss';

/** Map Class */
class MapComponent extends BaseComponent {
  /**
   * Constructor
   * @param {Object[]} params
   */
  constructor(params) {
    super(params);

    this._model.map = null;
    this._model.markers = [];
    this._model.hideMap = document.body.clientWidth < 641;

    if (this._model.showplaceholder === undefined)
      this._model.showplaceholder = 'true';
  }

  /**
   * Make an action after render of the component
   *
   * @memberof MapComponent
   */
  afterRender() {
    if (this._model.showplaceholder === 'true')
      MDCRipple.attachTo(document.querySelector('#open-map'));


    document.querySelectorAll('#open-map, #close-map').forEach((element) => {
      element.addEventListener('click', (e)=>{
        e.preventDefault();

        let mapOpened = document.querySelector('#map-container').getAttribute('aria-hidden') || 'true';

        document.querySelector('#map-container').setAttribute('aria-hidden', mapOpened != 'true');
      });
    });

    if (!this._googleMaps) {
      loadGoogleMapsApi({
        key: 'AIzaSyAOkAj3CSayTd27Md2c1rRi3m_t5aqDm4w',
        libraries: ['places'],
      }).then((googleMaps)=>{
        this._googleMaps = googleMaps;
        this.initMap();
      });
    } else {
      this.initMap();
    }
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
    this.model.map = new this._googleMaps.Map(document.getElementById('map'), {
      zoom: 12,
      center: loc,
      scrollwheel: false,
    });

    this.addMarkers();
  };

  /**
   * Add markers to map if passed down to this component
   */
  addMarkers() {
    if (this._model.markerinfos && this._model.markerinfos.length > 0) {
      this._model.markerinfos.forEach((markerInfo)=>{
        this.addMarker(markerInfo);
      });
    }
  }

  /**
   * Add a marker to current map
   * @param {MarkerInfo} markerInfo
   */
  addMarker(markerInfo) {
    let marker = new this._googleMaps.Marker({
      position: markerInfo.position,
      title: markerInfo.title,
      url: markerInfo.url,
      map: this.model.map,
      animation: google.maps.Animation.DROP,
    });

    this._googleMaps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url;
    });
    this.model.markers.push(marker);
  }
}

export default new MapComponent();
