## HintEat - The portal for restaurant and meal reviews
### Progressive Web App developed for Mobile Web Specialist Nanodegree

## Prerequisites

To run the application on development environment the project uses:
* node >=8.11.3
* gulp-cli installed globally
* local-web-server installed globally for the best performance
* better-npm-run installed globally
* cross-env installed globally

In order to test locally the Stage 2 of the app, a server is needed. I forked the project provided by Udacity to fit some little difference in data structure.

So, the server side presequisites are:
* my repository intalled
* sails.js

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

### Client project

```bash
git clone https://github.com/Collets/hinteat-client.git
```

```bash
npm install -g gulp-cli
npm install -g local-web-server

npm install
```

### API Server project

```bash
git clone https://github.com/Collets/hinteat-api.git
```

```bash
npm install -g sails

npm install
```

## Usage

HintEat uses the Better NPM Run package to run the scripts needed to launch the project or build it.
There is some script to help the automation, in order to get the production ready version of the app with all the optimization use [optimized local version](#optimized-local-version).

### Optimized local version

This workflow build a production ready version of the app, and serve it on a local server with some optimization adopted.

The server has this functionality enabled:
* HTTPS
* gzip of the files
* single page application logic

In order to get the "green padlock" on the browser please follow this guide: [enable "green padlock"](https://github.com/lwsjs/local-web-server/wiki/How-to-get-the-%22green-padlock%22-using-the-built-in-certificate).

The script is

#### Linux version

```bash
bnr build.optimized.prod
```

**WARNING** If you already had run a project with node-sass, you could have to run the following script

```bash
npm rebuild node-sass
```

#### Windows version

```bash
bnr build.optimized.prod.windows
```

In order to fetch the data, run the API server previously installed (see [API Server project](#api-server-project)).

In another terminal, open the folder of the server side project and run the script:

```bash
node server
```

Some version of lighthouse is not able to give the full PWA score if the HTTPS trafic is not redirected to HTTPS.
If needed, there is an additiona command to make this possible:
* open another terminal, and open the same frontend folder
* after the build (see previous step), move in dist folder
* run the script

**On Linux environment**  launch as sudo

```bash
ws --port 80 --rewrite '/* -> https://127.0.0.1:443/$1'
```

## Deployments

The client side projects is ready to deploy using GitHub, Firebase and Travis CI.

**TODO** 

* Add instruction to deploy using same configuration but with others accounts.
* Add a server side API endpoints. Evaluate the use of firebase for this step too.

## Functionality

* Component style structure
* Single page application like navigation ([navigo](https://github.com/krasimir/navigo))
* Templating ([nunjucks](https://mozilla.github.io/nunjucks/))
* Material style UI ([Material Components for the Web](https://material.io/components/web/))
* Offline capability ([Workbox](https://developers.google.com/web/tools/workbox/) for Webpack integration and [idb](https://github.com/jakearchibald/idb) for IndexedDB)
* Progressive Web App capability (tested on Android and Chrome)

## Compatibility

Android & Chrome

**TODO** Extend compatibility with all device and major browser

## TODOS

List of all planned improvements on [issue tracker page](https://github.com/Collets/hinteat-client/issues/18).
