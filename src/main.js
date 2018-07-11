// DATA
import './assets/data/restaurants.json';

import bootstrap from './core/bootstrapper/bootstrapper';
import {UI} from 'core/ui/ui';

/**
 * Load the application
 */
document.addEventListener('DOMContentLoaded', (event) => {
  bootstrap('AppComponent').then(()=> {
    UI.LazyLoading.init();

    if (document.querySelector('#fonts')) {
      let link = document.createElement('link');
      link.href = document.querySelector('#fonts').href;
      link.rel = 'stylesheet';
      document.querySelector('#fonts').parentElement.appendChild(link);
    }
  });
});
