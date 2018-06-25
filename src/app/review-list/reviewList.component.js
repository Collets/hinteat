import BaseComponent from 'core/base/base.component';
import * as ReviewService from 'app/review/review.service';

import './reviewList.scss';

/** Review Class */
class ReviewListComponent extends BaseComponent {
  /**
   * Constructor
   * @param {Object[]} params
  */
  constructor(params) {
    super(params);
  }

  /**
   * Make an action after render of the component
   *
   * @memberof ReviewListComponent
   */
  afterRender() { }

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
}

export default ReviewListComponent;
