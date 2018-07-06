import idb from 'idb';
import Notification from '../ui/notification';

export const Store = {
    instance: null,
    open() {
        if (!navigator.serviceWorker) {
            console.error('Browser too old for offline feature.');
            return;
        }

        let version = Object.keys(this.versions).length;

        this.instance = idb.open('hinteat', version, (upgradeDB) => {
            Object.keys(this.versions).sort((a, b) => {
                return a > b;
            }).slice(upgradeDB.oldVersion).forEach((key) => {
                this.versions[key](upgradeDB);
            });
        });

        return this.instance;
    },
    versions: {
        v1: (upgradeDB)=>{
            upgradeDB.createObjectStore('restaurants', {keyPath: 'id'});
            let restaurantsStore = upgradeDB.transaction.objectStore('restaurants');
            restaurantsStore.createIndex('name', 'name');
            restaurantsStore.createIndex('creationDate', 'createdAt');
            restaurantsStore.createIndex('updatingDate', 'updatedAt');
        },
        v2: (upgradeDB) => {
            upgradeDB.createObjectStore('reviews', {keyPath: 'id'});
            let reviewsStore = upgradeDB.transaction.objectStore('reviews');
            reviewsStore.createIndex('name', 'name');
            reviewsStore.createIndex('creationDate', 'createdAt');
            reviewsStore.createIndex('updatingDate', 'updatedAt');
            reviewsStore.createIndex('rating', 'rating');
            reviewsStore.createIndex('restaurant_id', 'restaurant_id');
        },
    },
    updateRestaurant(restaurant) {
        if (!restaurant) return null;

        return this.instance.then((db)=>{
            const tx = db.transaction('restaurants', 'readwrite');

            tx.objectStore('restaurants')
            .put(restaurant);

            return tx.complete;
        });
    },
    sync(restaurants, reviews) {
        if (restaurants) {
            this.syncRestaurants(restaurants)
            .catch((err) => {
                Notification.error(err.message);
            });
        }

        if (reviews) {
            this.syncReviews(reviews)
            .catch((err) => {
                Notification.error(err.message);
            });
        }
    },
    syncRestaurants(restaurants) {
        let toSyncs = [...restaurants];

        return this.instance.then((db) => {
            const tx = db.transaction('restaurants', 'readwrite');
            tx.objectStore('restaurants')
            .iterateCursor((cursor) => {
                if (!cursor) return;
                let toUpdate = restaurants.find((restaurant) => restaurant.id === cursor.value.id && restaurant.updatedAt > cursor.value.updatedAt );
                toSyncs = toSyncs.filter((restaurant) => restaurant.id != cursor.value.id);
                if (toUpdate) {
                    let updateResponse = cursor.update(toUpdate);

                    updateResponse.onerror = function() {
                        Notification.error(updateResponse.error);
                    };
                }
                cursor.continue();
            });

            tx.complete.then(() => {
                const txAdd = db.transaction('restaurants', 'readwrite');
                toSyncs.forEach((restaurant) => {
                    txAdd.objectStore('restaurants').put(restaurant);
                });
            });
        });
    },
    syncRestaurant(restaurant) {
        return this.instance.then((db) => {
            const tx = db.transaction('restaurants', 'readwrite');
            tx.objectStore('restaurants')
            .get(restaurant.id)
            .then((stored) => {
                if (!stored || stored.updatedAt < restaurant.updatedAt)
                    tx.objectStore('restaurants').put(restaurant);
            });
        });
    },
    syncReviews(reviews) {
        let toSyncs = [...reviews];

        return this.instance.then((db) => {
            const tx = db.transaction('reviews', 'readwrite');
            tx.objectStore('reviews')
            .iterateCursor((cursor) => {
                if (!cursor) return;
                let toUpdate = reviews.find((review) => review.id === cursor.value.id && review.updatedAt > cursor.value.updatedAt );
                toSyncs = toSyncs.filter((review) => review.id != cursor.value.id);
                if (toUpdate) {
                    let updateResponse = cursor.update(toUpdate);

                    updateResponse.onerror = function() {
                        Notification.error(updateResponse.error);
                    };
                }
                cursor.continue();
            });

            tx.complete.then(() => {
                const txAdd = db.transaction('reviews', 'readwrite');
                toSyncs.forEach((review) => {
                    txAdd.objectStore('reviews').put(review);
                });
            });
        });
    },
    syncReview(review) {
        return this.instance.then((db) => {
            const tx = db.transaction('reviews', 'readwrite');
            tx.objectStore('reviews')
            .get(review.id)
            .then((stored) => {
                if (!stored || stored.updatedAt < review.updatedAt)
                    tx.objectStore('reviews').put(review);
            });
        });
    },
};
