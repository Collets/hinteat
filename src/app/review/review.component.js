import BaseComponent from 'core/base/base.component';
import * as ReviewService from 'app/review/review.service';
import {MDCToolbar} from '@material/toolbar';
import {MDCIconToggle} from '@material/icon-toggle';
import {MDCDialog} from '@material/dialog';

import './review.scss';
import Utils from 'core/utils/utils';

/** Review Class */
class ReviewComponent extends BaseComponent {
  /**
   * Constructor
   * @param {Object[]} params
  */
  constructor(params) {
    super(params);

    this.model.id = Utils.guid();
  }

  /**
   * Make an action after render of the component
   *
   * @memberof ReviewComponent
   */
  afterRender() {
    if (this._wrapper.querySelector('#review-detail-' + this.model.id))
      this._dialog = new MDCDialog(this._wrapper.querySelector('#review-detail-' + this.model.id));
    
    this._wrapper.querySelector('.reviews-list-item').addEventListener('click', (e)=>{
      e.preventDefault();

      this._dialog.show();
    });
  }
}

export default ReviewComponent;
