import BaseComponent from '../base/base.component';
import {MDCTemporaryDrawer} from '@material/drawer';

import './navigation.scss';

/** Navigation Class */
class NavigationComponent extends BaseComponent {
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
   * @memberof NavigationComponent
   */
  afterRender() {
    this.model.drawer = MDCTemporaryDrawer.attachTo(document.querySelector('.mdc-drawer--temporary'));
  }
}

export default new NavigationComponent();
