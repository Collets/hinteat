import {AppError} from '../utils/utils';
import BaseComponent from '../base/base.component';
import {MDCToolbar, MDCToolbarFoundation} from '@material/toolbar';

import './header.scss';

/** Header Class */
class HeaderComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model = {
      cuisines: [],
    };
  }

  /**
   * Initialize the component
   *
   * @return {promise}
   * @memberof HeaderComponent
   */
  init() {
    return;
  }

  /**
   * Make an action after render of the component
   *
   * @memberof HeaderComponent
   */
  afterRender() {
    mdc.toolbar.MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'));
  }
}

export default new HeaderComponent();
