import BaseComponent from 'core/base/base.component';

import './app.scss';

/** App Class */
class AppComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model = {
      test: 1,
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
