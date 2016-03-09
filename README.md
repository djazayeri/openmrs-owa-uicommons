<img src="https://cloud.githubusercontent.com/assets/668093/12567089/0ac42774-c372-11e5-97eb-00baf0fccc37.jpg" alt="OpenMRS"/>

# uicommons

This repository contains the uicommons OpenMRS Open Web App.

It contains common CSS styling and page decoration elements that can be used in other OWAs.

For further documentation about OpenMRS Open Web Apps see [the wiki page](https://wiki.openmrs.org/display/docs/Open+Web+Apps+Module).

## Development

### Production Build

Build the distributable using [Gulp](http://gulpjs.com/) as follows:

````
gulp
````

This will create a file called `uicommons.zip` file in the `dist` directory, which can be uploaded to the OpenMRS Open Web Apps module.

### Local Deploy

To deploy directly to your local Open Web Apps directory, set the value of `LOCAL_OWA_FOLDER` in gulpfile.js and run:

````
gulp deploy-local
````

### Extending

Install [Bower](http://bower.io/) packages dependencies as follows:

````
bower install --save <package>
````

Be sure to include the following in your `html` files at the position you want the Bower dependencies injected:

````
<!-- bower:js -->
<!-- endbower -->
````
Do the same for your Bower stylesheet dependencies, but replace `js` with `css`.

Any files that you add manually must be added in the `app` directory.

## License

[MPL 2.0 w/ HD](http://openmrs.org/license/) © [OpenMRS Inc.](http://www.openmrs.org/)


## WHAT I DID TO PULL THINGS IN FROM THE UICOMMONS MODULE

1. Copy openmrs-module-uicommons/scss/src/main/resources to openmrs-owa-uicommons/src/scss
* Move everything from sass/reference up one directory
* Create customVariables.scss and uicommons.scss
* Set up gulpfile with gulp-compass
* Copy openmrs-module-uicommons/omod/src/main/webapp/resources/fonts to openmrs-owa-uicommons/app/fonts
* Add eot, ttf, woff to gulpfile.js resourcesGlob
* Rename openmrs-owa-uicommons/app/img to openmrs-owa-uicommons/app/images
* Copy from openmrs-module-uicommons/omod/src/main/webapp/resources/images