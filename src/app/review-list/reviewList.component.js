import BaseComponent from 'core/base/base.component';
import * as ReviewService from 'app/review/review.service';
import {MDCRipple} from '@material/ripple';
import PerfectScrollbar from 'perfect-scrollbar';

import './reviewList.scss';

/** Review Class */
class ReviewListComponent extends BaseComponent {
  /**
   * Constructor
   * @param {Object[]} params
  */
  constructor(params) {
    super(params);

    this._stars = [];
    this._starsRipple = [];
  }

  /**
   * Make an action after render of the component
   *
   * @memberof ReviewListComponent
   */
  afterRender() {
    if (this._wrapper.querySelector('.add-review__rate-button'))
      this._rateButtonRipple = new MDCRipple(this._wrapper.querySelector('.add-review__rate-button'));

    if (this._wrapper.querySelectorAll('.add-review__star')) {
      this._wrapper.querySelectorAll('.add-review__star').forEach((element) => {
        let ripple = new MDCRipple(element);
        ripple.unbounded = true;
        this._starsRipple.push(ripple);

        element.addEventListener('click', (event)=> {
          event.preventDefault();

          this.setStars(event.currentTarget.getAttribute('data-index'));
          this._wrapper.querySelector('.add-review__rate-button').removeAttribute('disabled');
        });

        this._stars.push(element);

      });
    }

    if (this._wrapper.querySelector('.reviews-list'))
      this._scrollbar = new PerfectScrollbar(this._wrapper.querySelector('.reviews-list'));
  }

   /**
   * Initialize the component
   *
   * @return {promise}
   * @memberof RestaurantComponent
   */
  init() {
    let promise = new Promise((resolve) => {
      ReviewService.getByRestaurant(this._model.restaurantid)
      .then((reviews) => {
        this._model.reviews = reviews;

        resolve();
      })
      .catch((error)=>{
        if (!(error instanceof AppError))
          console.error(error);
        else
          Notification.error(error);
      });
    });

    return promise;
  }

  /**
   * Set the star as selected
   * @param {number} index The index of the last star selected
   */
  setStars(index) {
    for (let i = 0; i < this._stars.length; i++) {
      if (i < index)
        this._stars[i].innerHTML = 'star';
      else
        this._stars[i].innerHTML = 'star_border';
    }
  }
}

export default ReviewListComponent;
