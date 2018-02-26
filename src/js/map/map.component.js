export default class MapComponent {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;

        this.render();
    }

    /**
     * Initialize Google map, called from HTML.
     */
    init(){

        let loc = {
            lat: 40.722216,
            lng: -73.987501,    
        };

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: loc,
            scrollwheel: false, 
        });
    }

    /**
     * Render Maps container
     */
    render(){
        
    }
}
