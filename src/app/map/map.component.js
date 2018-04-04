import BaseComponent from 'core/base/base.component';
import Map from 'app/map/map';
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
    this._mapLoading = false;
    this._model.markers = [];
    this._model.hideMap = document.body.clientWidth < 640;

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
      MDCRipple.attachTo(this._wrapper.querySelector('#open-map'));


    this._wrapper.querySelectorAll('#open-map, #close-map').forEach((element) => {
      element.addEventListener('click', (e)=>{
        e.preventDefault();

        let mapOpened = document.querySelector('#map-container').getAttribute('aria-hidden') || 'true';

        document.querySelector('#map-container').setAttribute('aria-hidden', mapOpened != 'true');
      });
    });

    this._wrapper.querySelector('.skip-map').addEventListener('click', (e)=>{
      e.preventDefault();

      let element = document.querySelector('#afterMap');
      let yPosition = element.getBoundingClientRect().y;

      location.href = '#';
      location.href = '#afterMap';

      window.scrollTo(0, yPosition - 80);
      element.focus();
    });

    this.loadGoogleMapInstance()
    .then(()=>{
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
    this.model.map = new this._googleMaps.Map(document.getElementById('map'), {
      zoom: 12,
      center: loc,
      scrollwheel: false,
    });

    this.addMarkers();
  };

  /**
   * Load Google maps instance
   * @return {Promise}
   */
  loadGoogleMapInstance() {
    if (this._mapLoading) return this._loadingMapPromise;

    this._mapLoading = true;
    this._loadingMapPromise = new Promise((resolve, reject)=>{
      if (this._googleMaps) resolve();

      Map.loadMap()
      .then((googleMaps)=>{
        this._googleMaps = googleMaps;
        resolve();
      })
      .catch(()=>{
        reject();
      });
    });

    return this._loadingMapPromise;
  }

  /**
   * Add markers to map if passed down to this component
   */
  addMarkers() {
    if (this._model.markerinfos && this._model.markerinfos.length > 0) {
      this._model.markerinfos.forEach((markerInfo)=>{
        this.loadGoogleMapInstance()
        .then(()=>{
          if (this._model.markers) {
            this._model.markers.forEach((marker) => {
              marker.setMap(null);
            });
          }

          this.addMarker(markerInfo);
        });
      });
    }
  }

  /**
   * Add a marker to current map
   * @param {MarkerInfo} markerInfo
   */
  addMarker(markerInfo) {
    this.loadGoogleMapInstance()
    .then(()=>{
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
    });
  }

  /**
   * Set the current markers and update the map
   * @param {Object[]} markerinfos array of markers
   */
  updateMarkers(markerinfos) {
    if (!markerinfos || markerinfos.length === 0) return;

    this._model.markerinfos = [];
    this._model.markerinfos.push(...markerinfos);
    this.addMarkers();
  }
}

export default MapComponent;
