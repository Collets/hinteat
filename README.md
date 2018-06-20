## HintEat - The portal for restaurant and meal reviews
### Progressive Web App developed for Mobile Web Specialist Nanodegree

## Prerequisites

To run the application on development environment the project uses:
* node >=6.9.0
* gulp-cli installed globally

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

```bash
git clone https://github.com/Collets/hinteat.git
```

```bash
npm install -g gulp-cli

npm install
```

## Usage

HintEat uses the Better NPM Run package to run the scripts needed to launch the project or build it.

### Serve in a local server

To launch a local server and open the browser
```bash
bnr serve.dev
```

The command launch a webpack web server on port 9000 and open the browser to the main page.
Webpack recompile the changes immediately for scss and js files, not yet for templates.

**TODO** Fix autoreload on browser and autoprecompile of template on changes.

### Build a development version

To build the project in development mode and serve in other server

**BEFORE YOU RUN THE SCRIPT:** Change the BASEURL in package.json, build.dev env section

```bash
bnr build.dev
```

the build files will be generated in dist directory.

## Deployments

The projects is ready to deploy using GitHub, Firebase and Travis CI.

**TODO** Add instruction to deploy using same configuration but with others accounts.

## Functionality

* Component style structure
* Single page application like navigation ([navigo](https://github.com/krasimir/navigo))
* Templating ([nunjucks](https://mozilla.github.io/nunjucks/))
* Material style UI ([Material Components for the Web](https://material.io/components/web/))
* Offline capability ([Workbox](https://developers.google.com/web/tools/workbox/) for Webpack integration)
* Progressive Web App capability (tested on Android and Chrome)

## Compatibility

Android & Chrome

**TODO** Extend compatibility with all device and major browser

## TODOS

List of all planned improvements on [issue tracker page](https://github.com/Collets/hinteat/issues/18).