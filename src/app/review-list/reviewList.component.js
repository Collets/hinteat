import BaseComponent from 'core/base/base.component';
import * as ReviewService from 'app/review/review.service';
import {MDCRipple} from '@material/ripple';
import PerfectScrollbar from 'perfect-scrollbar';
import {MDCDialog} from '@material/dialog';
import {MDCTextField} from '@material/textfield';
import Notification from 'core/ui/notification';

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

    if (this._wrapper.querySelector('.name-wrapper'))
      this._nameField = new MDCTextField(this._wrapper.querySelector('.name-wrapper'));

    if (this._wrapper.querySelector('.message-wrapper'))
      this._messageField = new MDCTextField(this._wrapper.querySelector('.message-wrapper'));

    if (this._wrapper.querySelector('.reviews-list'))
      this._scrollbar = new PerfectScrollbar(this._wrapper.querySelector('.reviews-list'));

    if (this._wrapper.querySelector('.add-review__rate-button'))
      this._rateButtonRipple = new MDCRipple(this._wrapper.querySelector('.add-review__rate-button'));

    if (this._wrapper.querySelector('#add-review-modal'))
      this._dialog = new MDCDialog(this._wrapper.querySelector('#add-review-modal'));

    this._wrapper.querySelector('.add-review__rate-button').addEventListener('click', (e)=>{
      e.preventDefault();

      this._dialog.lastFocusedTarget = e.target;
      this._dialog.show();
    });

    this._wrapper.querySelector('#add-review-button').addEventListener('click', (e) => {
      e.preventDefault();

      let validation = this.validateReview(this._nameField, this._messageField);
      if (validation) {
        validation.forEach((error) => {
          Notification.error(error);
        });
        return;
      }

      this.sendReview(this._nameField, this._messageField)
      .then((result) => {
        this._nameField.value = '';
        this._messageField.value = '';
        this.setStars(-1);
        this._wrapper.querySelector('.add-review__rate-button').setAttribute('disabled', '');

        this._dialog.close();

        Notification.info('Your review is been submitted successfully');
      })
      .catch((error) => {
        Notification.error(error);
      });
    });
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
      if (i < index) {
        this._stars[i].innerHTML = 'star';
        this._stars[i].setAttribute('aria-pressed', true);
      } else {
        this._stars[i].innerHTML = 'star_border';
        this._stars[i].setAttribute('aria-pressed', false);
      }
    }
  }

  /**
   * Get the current rating
   * @return {number}
   */
  getRating() {
    let rating = 0;
    this._stars.forEach((star) => {
      if (star.getAttribute('aria-pressed') === 'true')
        rating++;
    });
    return rating;
  }

  /**
   * Validate the entry
   * @param {string} name The name filled
   * @param {string} comment The comment filled
   * @return {string[]}
   */
  validateReview(name, comment) {
    let errors = [];

    if (!name.valid) errors.push('The name is required');
    if (!comment.valid) errors.push('The comment is required');

    return errors.length > 0 ? errors : null;
  }

  /**
   * Send the review to the db
   * @param {MDCTextField} name
   * @param {MDCTextField} message
   * @return {Promise}
   */
  sendReview(name, message) {
    let review = {
      restaurant_id: this._model.restaurantid,
      name: name.value,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      rating: this.getRating(),
      comments: message.value,
    };

    return ReviewService.create(review);
  }
}

export default ReviewListComponent;
