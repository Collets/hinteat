import idb from 'idb';

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

            upgradeDB.createObjectStore('cuisines');
            upgradeDB.createObjectStore('neighborhoods');
        }
    },
};
