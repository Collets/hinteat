import BaseComponent from 'core/base/base.component';
import {MDCToolbar} from '@material/toolbar';

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
    };
  }

  /**
   * Make an action after render of the component
   *
   * @memberof FiltersComponent
   */
  afterRender() {
    this._toolbar = MDCToolbar.attachTo(document.querySelector('.filters-toolbar'));
    this._toolbar.fixedAdjustElement = document.querySelector('#filters');

    document.querySelector('#close-filters').addEventListener('click', (e)=>{
      e.preventDefault();

      this.toggle();
    });

    document.querySelectorAll('.cards-view-button').forEach((element)=>{
      element.addEventListener('click', (e)=>{
        e.preventDefault();
  
        this.toggleView();
      });
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
