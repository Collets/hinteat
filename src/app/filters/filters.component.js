import BaseComponent from 'core/base/base.component';
import {MDCToolbar} from '@material/toolbar';
let createFocusTrap = require('focus-trap');

import RestaurantFilters from 'app/restaurant/restaurant-filters';
import * as RestaurantService from 'app/restaurant/restaurant.service';

import './filters.scss';

/** Filters Class */
class FiltersComponent extends BaseComponent {
  /**
   * Constructor
   * @param {Object} params
  */
  constructor(params) {
    super(params);

    this._listView = true;

    this._model.listView = this._listView;
    this._model.gridView = !this._listView;
    this._model.cuisine = this._selectedFilters ? this._selectedFilters.Cuisine : 'all-cuisines';
    this._model.neighboorhood = this._selectedFilters ? this._selectedFilters.Neighboorhood : 'all-neighborhoods';

    this._model.setCuisine = this.setCuisine;
    this._model.setNeighborhood = this.setNeighborhood;

    this._model.isBig = document.body.clientWidth > 768;
  }

  /**
   * Make an action after render of the component
   *
   * @memberof FiltersComponent
   */
  afterRender() {
    this._toolbar = MDCToolbar.attachTo(document.querySelector('.filters-toolbar'));
    this._toolbar.fixedAdjustElement = document.querySelector('#maincontent');

    document.querySelector('#close-filters').addEventListener('click', (e)=>{
      e.preventDefault();

      this.toggle();
    });

    document.querySelector('#confirm-filters').addEventListener('click', (e)=>{
      e.preventDefault();

      this.filter();
      this.toggle();
    });

    document.querySelectorAll('.cards-view-button').forEach((element)=>{
      element.addEventListener('click', (e)=>{
        e.preventDefault();

        if (e.currentTarget.id != this._wrapper.querySelector('[aria-pressed=true]').id)
          this.toggleView();
      });
    });

    this.count();
  }

  /**
   * Open the filters
   */
  open() {
    this.toggle();
  }

  /**
   * Count the results with current filters
   *
   * @memberof FiltersComponent
   * @return {Promise}
   */
  count() {
    let filters = new RestaurantFilters(this.model.cuisine, this.model.neighboorhood);
    return RestaurantService.retrieveCount(filters)
    .then((total)=>{
      this._wrapper.querySelector('#total-results').innerHTML = total;
      return total;
    })
    .catch((error)=>{
      if (!(error instanceof AppError))
        console.error(error);
       else
        Notification.error(error);
    });
  }

  /**
   * Filter the results
   *
   * @memberof FiltersComponent
   */
  filter() {
    let filters = new RestaurantFilters(this.model.cuisine, this.model.neighboorhood);
    this._selectedFilters = filters;
    this._model.filter(filters);
  }

  /**
   * Set the current cuisine filter
   *
   * @param {string} filter
   */
  setCuisine(filter) {
    this.model.cuisine = filter.trim();
    this.count().then(()=> {
      if (this._model.isBig)
        this.filter();
    });
  }

  /**
   * Set the current neighboorhood filter
   *
   * @param {string} filter
   */
  setNeighborhood(filter) {
    this.model.neighboorhood = filter.trim();
    this.count().then(()=> {
      if (this._model.isBig)
        this.filter();
    });
  }

  /**
   * Toggle the opening state of filters
   *
   * @memberof FiltersComponent
   */
  toggle() {
    let wrapper = document.querySelector('#filters');
    let closed = wrapper.getAttribute('aria-hidden') === 'true';

    wrapper.setAttribute('aria-hidden', !closed);
    document.body.classList.toggle('noscroll', closed);

    if (closed) {
      setTimeout(() => {
        this._focusTrap = createFocusTrap(wrapper);
        this._focusTrap.activate();
      }, 350);
    } else {
      if (this._focusTrap)
        this._focusTrap.deactivate();
    }
  }

  /**
   * Toggle the list view style
   *
   * @memberof FiltersComponent
   */
  toggleView() {
    this._listView = !this._listView;

    document.querySelector('#list-view-button').setAttribute('aria-pressed', this._listView);
    document.querySelector('#grid-view-button').setAttribute('aria-pressed', !this._listView);
  }

  /**
   * Know if filters are visible
   * @return {boolean}
   */
  isOnPage() {
    return document.body.clientWidth > 768;
  }
}

export default FiltersComponent;
