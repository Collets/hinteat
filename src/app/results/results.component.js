import BaseComponent from 'core/base/base.component';

import './results.scss';

/** Results Class */
class ResultsComponent extends BaseComponent {
  /**
   * Constructor
  */
  constructor() {
    super();

    this._model = {
      restaurants: [],
    };
  }

  /**
   * Make an action after render of the component
   *
   * @memberof ResultsComponent
   */
  afterRender() {
  }
}

export default new ResultsComponent();
