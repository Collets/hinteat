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
    },
    sync(restaurants) {
        this.syncRestaurants(restaurants)
        .catch((err) => {
            Notification.error(err.message);
        });
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
};
