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
   */
  initialize(root) {
    this.router = new Navigo(`${location.protocol}//${root}`);
    
    if (this.routes) {
      this.routes.forEach((route)=>{
        if (!route.url) {
          this.router.notFound((query) => {
            console.log('NOT FOUND');
          });

          this.router.on(()=>{
            ComponentFactory.setRouterComponent(route.component);
          });
        } else {
          let routeObj = {};
          routeObj[route.url] = (params)=>{
            ComponentFactory.setRouterComponent(route.component, params);
          };

          this.router.on(routeObj);
        }
      });
    }
    this.router.resolve();
  },
};
