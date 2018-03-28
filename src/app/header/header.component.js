import BaseComponent from 'core/base/base.component';
import NavigationComponent from 'app/navigation/navigation.component';
import FiltersComponent from 'app/filters/filters.component';
import {MDCToolbar} from '@material/toolbar';

import './header.scss';

/** Header Class */
class HeaderComponent extends BaseComponent {
  /**
   * Constructor
   * @param {Object} params
  */
  constructor(params) {
    super(params);
  }

  /**
   * Make an action after render of the component
   *
   * @memberof HeaderComponent
   */
  afterRender() {
    this._toolbar = MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'));
    this._toolbar.fixedAdjustElement = document.querySelector('#maincontent');

    document.querySelector('#menuHamburger').addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });

    document.querySelector('#openFilters').addEventListener('click', (e) => {
      e.preventDefault();
      this._model.openfilters();
      // FiltersComponent.toggle();
    });
  }
}

export default HeaderComponent;
