(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["app.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<router-component></router-component>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["filters.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
if(runtime.contextOrFrameLookup(context, frame, "isBig")) {
output += "\r\n<div id=\"filters\" class=\"filters-wrapper\">\r\n\t<div class=\"mdc-toolbar mdc-toolbar--fixed filters-toolbar\">\r\n";
;
}
else {
output += "\r\n<div id=\"filters\" class=\"filters-wrapper\" aria-hidden=\"true\">\r\n\t<div class=\"mdc-toolbar mdc-toolbar--fixed filters-toolbar\">\r\n";
;
}
output += "\r\n\t\t<div class=\"mdc-toolbar__row\">\r\n\t\t\t<section class=\"mdc-toolbar__section mdc-toolbar__section--align-start\">\r\n\t\t\t\t\t<a id=\"close-filters\" href=\"#\" class=\"material-icons mdc-toolbar__icon filters-toolbar__icon mdc-ripple-surface\" aria-label=\"close filters\" tabindex=\"0\">clear</a>\r\n\t\t\t\t\t<span class=\"mdc-toolbar__title\">Be more specific</span>\r\n\t\t\t</section>\r\n\t\t\t<section class=\"mdc-toolbar__section mdc-toolbar__section--align-end mdc-toolbar__section--shrink-to-fit\">\r\n\t\t\t\t\t<a id=\"confirm-filters\" href=\"#\" class=\"material-icons mdc-toolbar__icon filters-toolbar__icon mdc-ripple-surface mdc-ripple-surface--primary\" aria-label=\"confirm filters\" tabindex=\"0\">done</a>\r\n\t\t\t</section>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"filters-content\">\r\n\t\t<cuisine-filter-component class=\"filter-select-wrapper\" data-outjs-set-value=\"setCuisine\" data-injs-value=\"cuisine\"></cuisine-filter-component>\r\n\t\t<neighborhood-filter-component class=\"filter-select-wrapper\" data-outjs-set-value=\"setNeighborhood\" data-injs-value=\"neighboorhood\"></neighborhood-filter-component>\r\n\t\t<!-- <button class=\"mdc-button cards-view-button\" id=\"list-view-button\" aria-pressed=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "listView"), env.opts.autoescape);
output += "\">\r\n\t\t\tList view\r\n\t\t</button>\r\n\t\t<button class=\"mdc-button cards-view-button\" id=\"grid-view-button\" aria-pressed=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "gridView"), env.opts.autoescape);
output += "\">\r\n\t\t\tGrid view\r\n\t\t</button> -->\r\n\t</div>\r\n\t<div class=\"filters-results\"><span id=\"total-results\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "totalResults"), env.opts.autoescape);
output += "</span><span> Results</span></div>\r\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["footer.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<footer>\r\n  <div class=\"footer-container mdc-theme--secondary-bg\">\r\n    <a class=\"logo\" href=\"/\" alt=\"Home page\">\r\n      <img class=\"logo__image\" src=\"/assets/img/logo/hinteat.png\" srcset=\"/assets/img/logo/hinteat.png 1x, /assets/img/logo/hinteat@2x.png 2x\" alt=\"HintEat\"> \r\n    </a>\r\n    <span class=\"version\">Version UI ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "version"), env.opts.autoescape);
output += "</span>\r\n  </div>\r\n</footer>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["header.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"mdc-toolbar mdc-toolbar--fixed\">\r\n  <div class=\"mdc-toolbar__row\">\r\n    <section class=\"mdc-toolbar__section mdc-toolbar__section--align-start\">\r\n      <span class=\"mdc-toolbar__title\">Discover</span>\r\n    </section>\r\n    <section class=\"mdc-toolbar__section mdc-toolbar__section--align-end\" role=\"toolbar\">\r\n      <a id=\"search\" href=\"#\" class=\"material-icons mdc-toolbar__icon\" aria-label=\"Search\" alt=\"Search\">search</a>\r\n      <a id=\"openFilters\" href=\"#\" class=\"material-icons mdc-toolbar__icon toggle\" aria-label=\"Open filters\" alt=\"Open filters\" role=\"button\">filter_list</a>\r\n    </section>\r\n  </div>\r\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["home.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<header-component data-outjs-open-filters=\"openFilters\"></header-component>\r\n<main id=\"maincontent\">\r\n\t<map-component data-in-show-placeholder=\"true\" data-injsfn-update-markers=\"updateMarkers\"></map-component>\r\n\t<filters-component data-injsfn-open-filters=\"open\" data-outjs-filter=\"filter\"></filters-component>\r\n\t<results-component data-outjs-set-markers=\"setMarkers\" data-injsfn-filter=\"filter\"></results-component>\r\n</main>\r\n<footer-component></footer-component>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["map.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
if(runtime.contextOrFrameLookup(context, frame, "showplaceholder") === "true") {
output += "\r\n  <div class=\"map-placeholder\">\r\n    <picture>\r\n      <source media=\"(min-width: 450px)\" \r\n        srcset=\"https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=15&size=640x400&format=JPEG&style=feature:all|element:label|visibility:off\">\r\n      <img class=\"map-placeholder__image\" alt=\"Map placeholde. Press following button to open the map.\"\r\n        src=\"https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=15&size=450x350&format=JPEG&style=feature:all|element:label|visibility:off\" \r\n        srcset=\"https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=15&size=450x350&format=JPEG&style=feature:all|element:label|visibility:off, \r\n              https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=15&size=450x350&scale=2&format=JPEG&style=feature:all|element:label|visibility:off 2x\"/>\r\n    </picture>  \r\n    <button class=\"mdc-button mdc-button--raised mdc-button--dense\" id=\"open-map\">\r\n      Open map\r\n    </button>\r\n  </div>\r\n";
;
}
output += "\r\n<div id=\"map-container\" class=\"map-wrapper\" aria-hidden=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "hideMap"), env.opts.autoescape);
output += "\">\r\n\t<div class=\"mdc-toolbar mdc-toolbar--fixed map-toolbar\">\r\n\t\t<div class=\"mdc-toolbar__row\">\r\n\t\t\t<section class=\"mdc-toolbar__section mdc-toolbar__section--align-start\">\r\n\t\t\t\t\t<a id=\"close-map\" href=\"#\" class=\"material-icons mdc-toolbar__icon\" aria-label=\"close map\">arrow_back</a>\r\n\t\t\t\t\t<!-- <span class=\"mdc-toolbar__title\">Be more specific</span> -->\r\n\t\t\t</section>\r\n\t\t</div>\r\n  </div>\r\n  <a class=\"skip-map\" aria-label=\"Skip map\" href=\"#\">Skip map</a>\r\n  <div id=\"map\"></div>\r\n  <div id=\"afterMap\"></div>\r\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["navigation.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<aside class=\"mdc-drawer mdc-drawer--temporary mdc-typography\">\r\n  <nav class=\"mdc-drawer__drawer\">\r\n\r\n    <span class=\"menu-logo mdc-theme--secondary-bg\">\r\n      <a class=\"menu-logo__link\" href=\"/\" alt=\"Home page\">\r\n        <img class=\"menu-logo__image\" src=\"assets/img/logo/hinteat.png\" srcset=\"assets/img/logo/hinteat.png 1x, assets/img/logo/hinteat@2x.png 2x\" alt=\"HintEat\"> \r\n      </a>\r\n    </span>\r\n    <nav id=\"icon-with-text-demo\" class=\"mdc-drawer__content mdc-list\">\r\n      ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "menuVoices");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("menuVoice", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n        <a class=\"mdc-list-item\" href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"url"), env.opts.autoescape);
output += "\">\r\n          <i class=\"material-icons mdc-list-item__graphic\" aria-hidden=\"true\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"icon"), env.opts.autoescape);
output += "</i>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"label"), env.opts.autoescape);
output += "\r\n          <!-- <i class=\"material-icons\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"icon"), env.opts.autoescape);
output += "</i> -->\r\n        </a>\r\n      ";
;
}
}
frame = frame.pop();
output += "\r\n    </nav>\r\n  </nav>\r\n</aside>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["neighborhood-filter.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"mdc-select filter-select\" role=\"listbox\" id=\"neighborhoods-select\">\r\n  <div class=\"mdc-select__surface\" tabindex=\"0\">\r\n    <div class=\"mdc-select__label ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "value") && runtime.contextOrFrameLookup(context, frame, "value") != "all-neighborhoods"?"mdc-select__label--float-above":""), env.opts.autoescape);
output += "\">Pick a Neighborhood</div>\r\n    <div class=\"mdc-select__selected-text\"></div>\r\n    <div class=\"mdc-select__bottom-line\"></div>\r\n  </div>\r\n  <div class=\"mdc-menu mdc-select__menu\">\r\n    <ul class=\"mdc-list mdc-menu__items\">\r\n      <li class=\"mdc-list-item\" role=\"option\" tabindex=\"0\" id=\"all-neighborhoods\">\r\n        All neighborhood\r\n      </li>\r\n      ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "neighborhoods");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("neighborhood", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n        <li class=\"mdc-list-item\" role=\"option\" tabindex=\"0\" id=\"";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\" ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "value") == t_4?"aria-selected":""), env.opts.autoescape);
output += ">\r\n          ";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\r\n        </li>\r\n      ";
;
}
}
frame = frame.pop();
output += "\r\n    </ul>\r\n  </div>\r\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["restaurant.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<header class=\"mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall mdc-toolbar--flexible mdc-toolbar--flexible-default-behavior mdc-toolbar--flexible-space-maximized restaurant\">\r\n  <div class=\"mdc-toolbar__row restaurant-header\">\r\n    <section class=\"mdc-toolbar__section mdc-toolbar__section--align-start\">\r\n      <a id=\"back-to-home\" href=\"#\" class=\"material-icons mdc-toolbar__icon\" aria-label=\"Back to home\">arrow_back</a>\r\n    </section>\r\n    <section class=\"mdc-toolbar__section mdc-toolbar__section--align-end\" role=\"toolbar\">      \r\n      <a href=\"#\" class=\"material-icons mdc-toolbar__icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded\" aria-label=\"Bookmark this page\" alt=\"Bookmark this page\">share</a>\r\n      <span class=\"material-icons mdc-toolbar__icon add-favorites-button\"\r\n        tabindex=\"0\" role=\"button\" aria-pressed=\"false\" aria-label=\"Add to favorites\" title=\"Add to favorites\"\r\n        data-toggle-on='{\"label\": \"Remove from favorites\", \"content\": \"favorite\"}'\r\n        data-toggle-off='{\"label\": \"Add to favorites\", \"content\": \"favorite_border\"}'>favorite_border</span>\r\n    </section>\r\n    <span class=\"mdc-toolbar__title\"></span>\r\n  </div>\r\n  <div class=\"restaurant-cover__wrapper\">\r\n    <span class=\"restaurant-cover__overlay\"></span>\r\n    <picture>\r\n      <source media=\"(max-width:599px)\"\r\n        srcset=\"/assets/img/headers/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += "@599.webp\"/>\r\n      <source media=\"(max-width:800px)\"\r\n        srcset=\"/assets/img/headers/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += "@800.webp\"/>\r\n      <source media=\"(max-width:1200px)\"\r\n        srcset=\"/assets/img/headers/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += "@1200.webp\"/>\r\n      <source media=\"(max-width:1600px)\"\r\n        srcset=\"/assets/img/headers/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += "@1600.webp\"/>\r\n      <source media=\"(min-width:1601px)\"\r\n        srcset=\"/assets/img/headers/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += ".webp\"/>\r\n      <img class=\"restaurant-cover__image\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"name"), env.opts.autoescape);
output += "\"\r\n        src=\"/assets/img/headers/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += ".jpg\"\r\n        srcset=\"/assets/img/headers/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += ".webp\"/>\r\n    </picture>  \r\n  </div>\r\n</header>\r\n<main class=\"mdc-toolbar-fixed-adjust restaurant-content\">\r\n  <div class=\"restaurant-intro\">\r\n    <h1 class=\"restaurant__title mdc-typography--headline\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"name"), env.opts.autoescape);
output += "</h1>\r\n    <h3 class=\"mdc-typography--body2 restaurant__cuisine\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"cuisine_type"), env.opts.autoescape);
output += "</h3>\r\n    <div class=\"restaurant-informations\">\r\n        <i class=\"material-icons\">near_me</i> <h3 class=\"mdc-typography--body1 restaurant-address\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"address"), env.opts.autoescape);
output += "</h3>\r\n    </div>\r\n    <div class=\"restaurant-informations\">\r\n      <i class=\"material-icons\">access_time</i> <h3 class=\"mdc-typography--body1 restaurant-now-open\">Today: ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "actualHours"), env.opts.autoescape);
output += "<br/> <a href=\"#\" role=\"link\" title=\"See all hours\" class=\"mdc-typography--caption see-all-hours\">See all</a></h3>\r\n    </div>    \r\n  </div>\r\n  <div class=\"restaurant-extra-informations\">\r\n    <div class=\"restaurant-map-wrapper\">\r\n      <hr class=\"mdc-list-divider\">\r\n      <div class=\"map-button-container\">\r\n        <button class=\"mdc-button mdc-button--raised map-button\" id=\"open-restaurant-map\">\r\n          OPEN MAP\r\n        </button>\r\n        <map-component data-in-show-placeholder=\"false\" data-injs-markerinfos=\"markerInfos\" data-injsfn-open-map=\"open\"></map-component>\r\n      </div>\r\n      <hr class=\"mdc-list-divider\">\r\n    </div>    \r\n    <div class=\"reviews\">\r\n      <h2 class=\"reviews__title mdc-typography--title\">Reviews <span class=\"reviews-number mdc-typography--caption\">(";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"reviews")), env.opts.autoescape);
output += ")</span></h2>\r\n      <ul class=\"mdc-list mdc-list--two-line reviews-list\">\r\n        ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"reviews");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("review", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n          <review-component data-injs-review=\"restaurant.reviews[";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0"), env.opts.autoescape);
output += "]\"></review-component>        \r\n        ";
;
}
}
frame = frame.pop();
output += "\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</main>\r\n<footer-component></footer-component>\r\n\r\n<aside id=\"opening-hours-dialog\"\r\n  class=\"mdc-dialog\"\r\n  role=\"alertdialog\"\r\n  aria-labelledby=\"my-mdc-dialog-label\"\r\n  aria-describedby=\"my-mdc-dialog-description\">\r\n  <div class=\"mdc-dialog__surface\">\r\n    <header class=\"mdc-dialog__header\">\r\n      <h2 id=\"my-mdc-dialog-label\" class=\"mdc-dialog__header__title\">\r\n        Opening hours\r\n      </h2>\r\n    </header>\r\n    <section id=\"my-mdc-dialog-description\" class=\"mdc-dialog__body\">\r\n      <ul class=\"mdc-list mdc-list--dense mdc-list--two-line\">\r\n        ";
frame = frame.push();
var t_7 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"operating_hours");
if(t_7) {t_7 = runtime.fromIterator(t_7);
var t_5;
if(runtime.isArray(t_7)) {
var t_6 = t_7.length;
for(t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5][0];
frame.set("[object Object]", t_7[t_5][0]);
var t_9 = t_7[t_5][1];
frame.set("[object Object]", t_7[t_5][1]);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\r\n          <li class=\"mdc-list-item\">\r\n            <span class=\"mdc-list-item__text\">\r\n              ";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "\r\n              <span class=\"mdc-list-item__secondary-text\">\r\n                ";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "\r\n              </span>\r\n            </span>\r\n          </li>          \r\n        ";
;
}
} else {
t_5 = -1;
var t_6 = runtime.keys(t_7).length;
for(var t_10 in t_7) {
t_5++;
var t_11 = t_7[t_10];
frame.set("key", t_10);
frame.set("value", t_11);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\r\n          <li class=\"mdc-list-item\">\r\n            <span class=\"mdc-list-item__text\">\r\n              ";
output += runtime.suppressValue(t_10, env.opts.autoescape);
output += "\r\n              <span class=\"mdc-list-item__secondary-text\">\r\n                ";
output += runtime.suppressValue(t_11, env.opts.autoescape);
output += "\r\n              </span>\r\n            </span>\r\n          </li>          \r\n        ";
;
}
}
}
frame = frame.pop();
output += "\r\n      </ul>\r\n    </section>\r\n    <footer class=\"mdc-dialog__footer\">\r\n      <button type=\"button\" class=\"mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel\">CLOSE</button>\r\n    </footer>\r\n  </div>\r\n  <div class=\"mdc-dialog__backdrop\"></div>\r\n</aside>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["results.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<section class=\"results\">\r\n  <div class=\"results-subtitle\">\r\n    <h1 class=\"results-subtitle__text\">The meal you are looking for is really close:</h1>\r\n  </div>\r\n  <ul class=\"results-list\">    \r\n    ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "restaurants");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("restaurant", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n      <li class=\"results-list__element\">\r\n        <restaurant-preview-component data-injs-restaurant=\"restaurants[";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0"), env.opts.autoescape);
output += "]\"></restaurant-preview-component>\r\n      </li>\r\n    ";
;
}
}
frame = frame.pop();
output += "    \r\n  </ul>\r\n</section>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["review.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<a class=\"mdc-list-item reviews-list-item\" role=\"link\" tabindex=\"0\" href=\"#\">\r\n  <span class=\"mdc-list-item__text\">\r\n      ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "review")),"name"), env.opts.autoescape);
output += "\r\n    <span class=\"mdc-list-item__secondary-text\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "review")),"comments"), env.opts.autoescape);
output += "</span>\r\n  </span>\r\n  <span class=\"mdc-list-item__meta reviews-list-item__rating\">\r\n      ";
frame = frame.push();
var t_3 = (lineno = 6, colno = 21, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [0,5]));
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("i", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
if(t_4 < runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "review")),"rating")) {
output += "\r\n          <i class=\"material-icons\">star</i>\r\n        ";
;
}
else {
output += "\r\n          <i class=\"material-icons\">star_border</i>\r\n        ";
;
}
;
}
}
frame = frame.pop();
output += "\r\n  </span>\r\n</a>\r\n\r\n<aside id=\"review-detail-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\"\r\n  class=\"mdc-dialog\"\r\n  role=\"alertdialog\"\r\n  aria-labelledby=\"my-mdc-dialog-label\"\r\n  aria-describedby=\"my-mdc-dialog-description\">\r\n  <div class=\"mdc-dialog__surface\">\r\n    <header class=\"mdc-dialog__header\">\r\n      <h2 id=\"my-mdc-dialog-label\" class=\"mdc-dialog__header__title\">\r\n        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "review")),"name"), env.opts.autoescape);
output += "\r\n      </h2>\r\n      <span class=\"reviews-list-item__rating\">\r\n          ";
frame = frame.push();
var t_7 = (lineno = 27, colno = 25, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [0,5]));
if(t_7) {t_7 = runtime.fromIterator(t_7);
var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("i", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
if(t_8 < runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "review")),"rating")) {
output += "\r\n              <i class=\"material-icons\">star</i>\r\n            ";
;
}
else {
output += "\r\n              <i class=\"material-icons\">star_border</i>\r\n            ";
;
}
;
}
}
frame = frame.pop();
output += "\r\n      </span>\r\n    </header>\r\n    <section id=\"my-mdc-dialog-description\" class=\"mdc-dialog__body\">\r\n      <span class=\"mdc-typography--caption\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "review")),"date"), env.opts.autoescape);
output += "</span>\r\n      <p>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "review")),"comments"), env.opts.autoescape);
output += "</p>\r\n    </section>\r\n    <footer class=\"mdc-dialog__footer\">\r\n      <button type=\"button\" class=\"mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel\">CLOSE</button>\r\n    </footer>\r\n  </div>\r\n  <div class=\"mdc-dialog__backdrop\"></div>\r\n</aside>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["cuisine-filter.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"mdc-select filter-select\" role=\"listbox\" id=\"cuisines-select\">\r\n  <div class=\"mdc-select__surface\" tabindex=\"0\">\r\n    <div class=\"mdc-select__label ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "value") && runtime.contextOrFrameLookup(context, frame, "value") != "all-cuisines"?"mdc-select__label--float-above":""), env.opts.autoescape);
output += "\">Pick a Cuisine</div>\r\n    <div class=\"mdc-select__selected-text\"></div>\r\n    <div class=\"mdc-select__bottom-line\"></div>\r\n  </div>\r\n  <div class=\"mdc-menu mdc-select__menu\">\r\n    <ul class=\"mdc-list mdc-menu__items\">\r\n      <li class=\"mdc-list-item\" role=\"option\" tabindex=\"0\" id=\"all-cuisines\">\r\n        All cuisines\r\n      </li>\r\n      ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "cuisines");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("cuisine", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n        <li class=\"mdc-list-item\" role=\"option\" tabindex=\"0\" id=\"";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\" ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "value") == t_4?"aria-selected":""), env.opts.autoescape);
output += ">\r\n          ";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\r\n        </li>\r\n      ";
;
}
}
frame = frame.pop();
output += "\r\n    </ul>\r\n  </div>\r\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["restaurant-preview.tpl.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"mdc-card restaurant-preview\">\r\n  <a class=\"mdc-card__primary-action open-detail-restaurant\" href=\"#\" data-url=\"/restaurant.html?id=";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"id"), env.opts.autoescape);
output += "\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"id"), env.opts.autoescape);
output += "\">\r\n    <div class=\"restaurant-preview-media\">\r\n      <div class=\"restaurant-preview-media__wrapper\">\r\n        <picture>\r\n          <source media=\"(max-width:388px)\"\r\n            srcset=\"assets/img/previews/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += "@340.webp\"/>\r\n          <source media=\"(min-width:576px) and (max-width:1069px)\"\r\n            srcset=\"assets/img/previews/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += "@340.webp\"/>\r\n          <source media=\"(min-width:1280px) and (max-width:1430px)\"\r\n            srcset=\"assets/img/previews/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += "@340.webp\"/>\r\n          <img class=\"restaurant-preview-media__image\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"name"), env.opts.autoescape);
output += "\"\r\n            src=\"assets/img/previews/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += ".jpg\"\r\n            srcset=\"/assets/img/previews/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"photograph"), env.opts.autoescape);
output += ".webp\"/>\r\n        </picture>  \r\n      </div>      \r\n    </div>\r\n    <div class=\"mdc-card__content\">\r\n      <h2 class=\"mdc-typography--title restaurant-preview__title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"name"), env.opts.autoescape);
output += "</h2>\r\n      <h3 class=\"mdc-typography--subheading1 restaurant-preview__subtitle\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"neighborhood"), env.opts.autoescape);
output += "</h3>\r\n    </div>\r\n    <div class=\"mdc-card__content mdc-card__content--secondary mdc-typography--body1\">\r\n      ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"address"), env.opts.autoescape);
output += "\r\n    </div>\r\n  </a>\r\n  <div class=\"mdc-card__actions\">\r\n    <div class=\"mdc-card__action-buttons\">\r\n      <button class=\"mdc-button mdc-card__action mdc-card__action--button open-detail-restaurant\" data-url=\"/restaurant.html?id=";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"id"), env.opts.autoescape);
output += "\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "restaurant")),"id"), env.opts.autoescape);
output += "\">DISCOVER</button>\r\n    </div>\r\n    <div class=\"mdc-card__action-icons\">\r\n      <i class=\"material-icons mdc-card__action mdc-card__action--icon mdc-icon-toggle add-favorites-button\"\r\n        tabindex=\"0\" role=\"button\" aria-pressed=\"false\" aria-label=\"Add to favorites\" title=\"Add to favorites\"\r\n        data-toggle-on='{\"label\": \"Remove from favorites\", \"content\": \"favorite\"}'\r\n        data-toggle-off='{\"label\": \"Add to favorites\", \"content\": \"favorite_border\"}'>favorite_border</i>\r\n    </div>\r\n  </div>\r\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
