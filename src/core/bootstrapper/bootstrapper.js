import {ComponentFactory} from '../component-factory/component-factory';
import AppComponent from '../../app/app.component';
import CuisineFilterComponent from '../../app/cuisine/cuisine-filter.component';
import NeighborhoodFilterComponent from '../../app/neighborhood/neighborhood-filter.component';
import HeaderComponent from '../../app/header/header.component';
import NavigationComponent from '../../app/navigation/navigation.component';
import FiltersComponent from '../../app/filters/filters.component';

// Import of components

/**
 * Bootsrapper of the application
 * @param {string} entrypoint
*/
export default function bootstrap(entrypoint) {
    ComponentFactory.components = [
        AppComponent,
        HeaderComponent,
        NavigationComponent,
        FiltersComponent,
        CuisineFilterComponent,
        NeighborhoodFilterComponent,
    ];

    let starterComponent = ComponentFactory.instantiate(entrypoint);
    starterComponent.render();
}
