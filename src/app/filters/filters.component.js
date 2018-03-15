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
  */
  constructor() {
    super();

    this._listView = true;

    this._model = {
      listView: this._listView,
      gridView: !this._listView,
      cuisine: 'all-cuisines',
      neighboorhood: 'all-neighborhoods',
    };
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
      ResultsComponent.filter(filters);
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
   * Count the results with current filters
   *
   * @memberof FiltersComponent
   */
  count() {
    let filters = new RestaurantFilters(this.model.cuisine, this.model.neighboorhood);
    RestaurantService.retrieveCount(filters)
    .then((total)=>{
      this._wrapper.querySelector('#total-results').innerHTML = total;
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
  setNeighboorhood(filter) {
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

export default new FiltersComponent();
