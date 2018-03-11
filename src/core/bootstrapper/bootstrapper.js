import {ComponentFactory} from '../component-factory/component-factory';
import AppComponent from '../../app/app.component';
import CuisineFilterComponent from '../../app/cuisine/cuisine-filter.component';

// Import of components

/** 
 * Bootsrapper of the application
*/
export default function bootstrap(entrypoint) {
    ComponentFactory.components = [
        AppComponent,
        CuisineFilterComponent,
    ];

		let starterComponent = ComponentFactory.instantiate(entrypoint);
    starterComponent.render();
}
