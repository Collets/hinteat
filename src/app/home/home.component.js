import BaseComponent from 'core/base/base.component';

import './home.scss';

/** Home Class */
class HomeComponent extends BaseComponent {
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
   * @memberof HomeComponent
   */
  afterRender() {
  }
}

export default new HomeComponent();
