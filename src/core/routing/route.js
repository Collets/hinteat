import Navigo from 'navigo';
import {ComponentFactory} from 'core/component-factory/component-factory';

export const RouteEngine = {
  routes: [
    {
      url: 'restaurant/:id',
      component: 'RestaurantComponent',
    },
    {
      url: null,
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
            ComponentFactory.setRouterComponent(route.component);
          });
        } else {
          let routeObj = {};
          Reflect.defineProperty(routeObj, route.url, {value: (params)=>{
            ComponentFactory.setRouterComponent(route.component);
          }});

          this.router.on(routeObj);
        }
      });
    }
    this.router.on({
      'restaurant/:id': (params)=>{
        ComponentFactory.setRouterComponent('RestaurantComponent');
      }
    });
    this.router.resolve();
  },
};
