import BaseComponent from '../base/base.component';
import {MDCTemporaryDrawer, MDCTemporaryDrawerFoundation, util} from '@material/drawer';

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
      menuVoices:[
        {
          url: '/',
          label: 'Discover'
        }
      ]
    };
  }

  /**
   * Make an action after render of the component
   *
   * @memberof FiltersComponent
   */
  afterRender() {
    this.model.drawer = MDCTemporaryDrawer.attachTo(document.querySelector('#filters-drawer'));
  }
}

export default new FiltersComponent();
