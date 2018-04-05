import BaseComponent from 'core/base/base.component';
import {MDCToolbar} from '@material/toolbar';

import './footer.scss';

/** Footer Class */
class FooterComponent extends BaseComponent {
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
   * @memberof FooterComponent
   */
  afterRender() {
  }
}

export default FooterComponent;
