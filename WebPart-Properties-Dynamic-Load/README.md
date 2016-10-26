## demo-wp-dynamic-properties

A SharePoint Framework #SPFx demo that includes dynamically building webpart properties based on another selected webpart property.

This documentaion is based on your initial understanding of the SharePoint Framework. This folder does contain all you need to build the demo solution though assuming you have NodeJS, Gulp and other prerequisites installed.

The sample is based on the Framework Developer Preview Release - Drop 5 - Oct 17, 2016. As the framework is subject to change, this may change, although the concept is based on a finding documented here: https://github.com/SharePoint/sp-dev-docs/wiki/Async-data-fetch-in-the-property-pane.

### Building the code

```bash
git clone the repo
npm install
gulp serve
```

What is of interest is changes made to the following files:

src/webparts/demoWPDynamicProperties/IDemoWpDynamicPropertiesWebPartProps.ts
src/webparts/demoWPDynamicProperties/DemoWpDynamicPropertiesWebPart.manifest.json
src/webparts/demoWPDynamicProperties/DemoWpDynamicPropertiesWebPart.ts

Added:
src/webparts/demoWPDynamicProperties/ListService.ts


## What is of interest

###src/webparts/demoWPDynamicProperties/IDemoWpDynamicPropertiesWebPartProps.ts

Added three new properties, in particular the ListName and ListColumn to store the selected list and column

###src/webparts/demoWPDynamicProperties/DemoWpDynamicPropertiesWebPart.manifest.json

Provided default values for our new properties. If you change this manifest, you will need to restart gulp.

###src/webparts/demoWPDynamicProperties/DemoWpDynamicPropertiesWebPart.ts

The heart of modifications are found here.

We import a new interface:
import * as ListService from './ListService';

ListService is used to pull both mock and SharePoint Data

We are using onInit:

###public onInit<T>(): Promise<T> {}

to pre-load a list of lists in assist with editing performance.

The #onPropertyChange method is added so we can override what happens when the list name is changed. We want to clear the selected column

###public onPropertyChange(propertyPath: string, newValue: any): void {}


The real magic is in the method: propertyPaneSettings.

###protected get propertyPaneSettings(): IPropertyPaneSettings {}

We are using

###this.configureStart()

Which allows us to reload the property pane once a list is dynamicly loaded after a Promise.

##Caveats

As currently documented at https://github.com/SharePoint/sp-dev-docs/wiki/Async-data-fetch-in-the-property-pane, there are known issues with this.configureStart() that the Framework team is addressing.
