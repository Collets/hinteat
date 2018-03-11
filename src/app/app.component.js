import BaseComponent from './base/base.component';
import CuisineFilterComponent from './cuisine/cuisine-filter.component';

import './app.scss';

/** App Class */
class AppComponent extends BaseComponent {
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
   * @memberof AppComponent
   */
  afterRender() {
  }
}

export default new AppComponent();
