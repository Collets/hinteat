import BaseComponent from '../base/base.component';
import {MDCToolbar} from '@material/toolbar';

import './filters.scss';

/** Filters Class */
class FiltersComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model = {
      drawer: null,
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
}

export default new FiltersComponent();
