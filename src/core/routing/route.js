import Navigo from 'navigo';
import {ComponentFactory} from 'core/component-factory/component-factory';

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
    this.router = new Navigo(`${location.protocol}//${root}`);
    
    if (this.routes) {
      this.routes.forEach((route)=>{
        if (!route.url) {
          this.router.notFound((query) => {
            console.log('NOT FOUND');
          });

          this.router.on(()=>{
            ComponentFactory.setRouterComponent(route.component).then(()=>{
              ComponentFactory.endRender();
            });
          });
        } else {
          let routeObj = {};
          routeObj[route.url] = (params)=>{
            ComponentFactory.setRouterComponent(route.component, params).then(()=>{
              ComponentFactory.endRender();
            });
          };

          this.router.on(routeObj);
        }
      });
    }
    this.router.resolve();
  },
};
