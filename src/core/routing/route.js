import Navigo from 'navigo';
import {ComponentFactory} from 'core/component-factory/component-factory';
import {SYSPARAMS} from 'core/utils/system.params';

export const RouteEngine = {
  routes: [
    {
      url: 'restaurant/:id',
      component: 'RestaurantComponent',
    },
    {
      url: '/',
      component: 'HomeComponent',
    },
  ],
  router: null,
  /**
   * Initialize the router engine
   * @param {string} root
   */
  initialize(root) {
    this.router = new Navigo(root);
    
    if (this.routes) {
      this.routes.forEach((route)=>{
        if (!route.url) {
          this.router.notFound((query) => {
            console.log('NOT FOUND');
          });

          this.router.on(()=>{
            ComponentFactory.setRouterComponent(route.component)
            .then(()=>{
              if (JSON.parse(SYSPARAMS.FIRSTLOAD)) {
                setTimeout(()=>{
                  document.querySelector('.loader').classList.add('hidden');
                }, 2000);
                
                SYSPARAMS.FIRSTLOAD = false;
              }
            });
          });
        } else {
          let routeObj = {};
          routeObj[route.url] = (params)=>{
            ComponentFactory.setRouterComponent(route.component, params)
            .then(()=>{
              if (JSON.parse(SYSPARAMS.FIRSTLOAD)) {
                setTimeout(()=>{
                  document.querySelector('.loader').classList.add('hidden');
                }, 1000);

                SYSPARAMS.FIRSTLOAD = false;
              }
            });
          };

          this.router.on(routeObj);
        }
      });
    }
    this.router.resolve();
  },
};
