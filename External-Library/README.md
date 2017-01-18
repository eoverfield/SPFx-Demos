## SPFx Demo - Including an external JavaScript library / project

This demo is based off the SPFx RCo Code Drop.

In this demo, we are loading the jQuery library from a CDN, but we are not loading it as a module. Normally it would be best practices to load an external library as a module if one exists, but often an external library you want to use might not be a module, may not have a typings definition, or it is simply your own custom JavaScript library that you want to include.

Updates include:

Included @types/jquery
Updated config/config.json by including the external reference for how to load our external component (in this case jQuery).
Updated src/webparts/externalLibrary/ExternalLibraryWebPart.ts to "require" our library, and then use the variable we declare.

Similar in scope to:
https://dev.office.com/sharepoint/docs/spfx/web-parts/basics/add-an-external-library

### Building the code

```bash
git clone the repo
cd External-Library
npm install
gulp serve
```

### Build options
