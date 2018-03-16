/** Utils helper class. */
export default class Utils {
  /**
   * Get a parameter by name from page URL.
   * @param {string} name
   * @param {string} url
   * @return {string}
   */
  static getParameterByName(name, url) {
    if (!url)
      url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results)
      return null;
    if (!results[2])
      return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  /**
   * Add restaurant name to the breadcrumb navigation menu
   * @param {object} restaurant
   */
  static fillBreadcrumb(restaurant) {
    const breadcrumb = document.getElementById('breadcrumb');
    const li = document.createElement('li');
    li.innerHTML = restaurant.name;
    breadcrumb.appendChild(li);
  };
  /**
   * Convert camelcase to dash
   * @param  {string} name
   * @return {string}
   */
  static getTagByName(name) {
    return name.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
  }

  /**
   * Convert dash to camelcase
   * @param  {string} id
   * @return {string}
   */
  static getNameByTag(id) {
    return id.replace(/-([a-z])/g, function(g) {
      return g[1].toUpperCase();
    }).replace(/\b\w/g, (l) => l.toUpperCase());
  }


  /**
   * Get object related property by path
   * @param  {string} path
   * @param  {object} object
   * @return {object}
   */
  static get(path, object) {
    let tokens = path.split(/[\[\.]/g).map((token)=>{
      return token.replace(/[\[\]]/g, '');
    });

    return tokens.reduce((xs, x) => {
      return (xs && xs[x]) ? xs[x] : null;
    },
    object);
  }

  /**
   * Return a random generated guid
   * @return {string}
   */
  static guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
    this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  /**
   * Helper function for guid()
   * @return {string}
   */
  static s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
}
