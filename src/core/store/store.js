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
            
            upgradeDB.createObjectStore('lastupdate');
        },
    },
    sync(restaurants) {
        this.syncRestaurants(restaurants)
        .then(() => {
            this.syncDBupdateDate();
        })
        .catch((err) => {
            Notification.error(err.message);
        });
    },
    syncRestaurants(restaurants) {
        return this.instance.then((db) => {
            const tx = db.transaction(['restaurants', 'lastupdate'], 'readwrite');
            tx.objectStore('lastupdate')
            .get(0)
            .then((lastupdate) => {
                restaurants.forEach((restaurant) => {
                    let updatedAt = Date.parse(restaurant.updatedAt);
                    if (!lastupdate || lastupdate < updatedAt)
                        tx.objectStore('restaurants').put(restaurant);
                });
            });

            return tx;
        });
    },
    syncDBupdateDate() {
        return this.instance.then((db) => {
            const tx = db.transaction('lastupdate', 'readwrite');
            tx.objectStore('lastupdate').put(Date.now(), 0);

            return tx.complete;
        });
    },
};
