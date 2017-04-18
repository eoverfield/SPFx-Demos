#prep:
#https://"tenant".sharepoint.com/sites/spfx-demos 
#https://"tenant".sharepoint.com/sites/spfx-demos/_layouts/15/workbench.aspx

cd "\Git Projects\GitHub\SPFxDemos\"
#will open code during demo 1

#Demo 1 - Demo: Developer Environment

node -v
gulp -v
npm update –g @microsoft/generator-sharepoint
yo --generators
code .


#demo 2 - create hellow world webpart

#open in simple powershell
cd helloworld
yo @microsoft/sharepoint

#load up workbench
gulp serve
# load in SPO workbench as well: https://"tenant".sharepoint.com/sites/spfx-demos/_layouts/15/workbench.aspx



#demo 3 - SharePoint Data - properties

cd ..\WebPart-Demos
#look at "SharePointData" webpart
#added ListService.ts and MockHttpClient.ts
#uncomment code in SharePointDataWebPart.ts (was hello world)

gulp serve

#look at "CustomProperties" webpart
#review code in ICustomPropertiesWebPartProps.ts, CustomPropertiesWebPart.ts, .manifest,json (default) (was hello world)

gulp serve



#demo 4 - deployment

#update config/write-manifests.json with correct cdn location

gulp clean #cleans the build
gulp build #builds solution
gulp bundle #bundles the solution for testing / using
gulp package-solution #packages the solution for deployment

#look in \WebPart-Demos\sharepoint\solution\web-part-demos.sppkg zip package, drill into files and notice links to localhost with just "package-solution"

gulp --ship #minify assets and use CDN configuration
gulp package-solution --ship #recreate package for deployment

#copy .\sharepoint\solution\web-part-demos.sppkg to app catalog
#https://"tenant".sharepoint.com/sites/apps/

#demo webparts page after deployment:
#https://"tenant".sharepoint.com/sites/spfx-demos/SitePages/Demo%20SPFx%20Webparts.aspx

#to delete app, must switch to classic view, delete, then remove from both recycle bins