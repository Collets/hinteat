import BaseComponent from 'core/base/base.component';
import {MDCToolbar} from '@material/toolbar';

import RestaurantFilters from 'app/restaurant/restaurant-filters';
import ResultsComponent from 'app/results/results.component';
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
    this._model.cuisine = 'all-cuisines';
    this._model.neighboorhood = 'all-neighborhoods';

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

      let filters = new RestaurantFilters(this.model.cuisine, this.model.neighboorhood);
      this._model.filter(filters);
      // ResultsComponent.filter(filters);
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
   */
  count() {
    let filters = new RestaurantFilters(this.model.cuisine, this.model.neighboorhood);
    RestaurantService.retrieveCount(filters)
    .then((total)=>{
      this._wrapper.querySelector('#total-results').innerHTML = total;

      if (this._model.isBig)
        this._model.filter(filters);
    })
    .catch((error)=>{
      if (!(error instanceof AppError)) 
        console.error(error);
       else 
        Notification.error(error);
      
    });
  }

  /**
   * Set the current cuisine filter
   *
   * @param {string} filter
   */
  setCuisine(filter) {
    this.model.cuisine = filter.trim();
    this.count();
  }

  /**
   * Set the current neighboorhood filter
   *
   * @param {string} filter
   */
  setNeighborhood(filter) {
    this.model.neighboorhood = filter.trim();
    this.count();
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
}

export default FiltersComponent;
