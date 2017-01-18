## SPFx Demo - Add a type declaration reference

This demo is based off the SPFx RC0 Code Drop.

In this demo, we are loading the jQuery library from a CDN, not from a module. @types/jquery is installed via npm and then imported in the webpart source.

Updates include:
Included @types/jquery
Updated config/config.json by including the external reference for how to load our external component (in this case jQuery).

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