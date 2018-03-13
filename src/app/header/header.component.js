import BaseComponent from 'core/base/base.component';
import NavigationComponent from '../navigation/navigation.component';
import {MDCToolbar} from '@material/toolbar';

import './header.scss';
import FiltersComponent from '../filters/filters.component';

/** Header Class */
class HeaderComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model = {
    };
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
      NavigationComponent.model.drawer.open = true;
    });

    document.querySelector('#openFilters').addEventListener('click', (e) => {
      e.preventDefault();
      FiltersComponent.toggle();
    });
  }
}

export default new HeaderComponent();
