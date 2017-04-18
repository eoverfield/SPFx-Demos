#prep:
#https://"tenant".sharepoint.com/sites/spfx-demos 
#https://"tenant".sharepoint.com/sites/spfx-demos/_layouts/15/workbench.aspx

cd "\Git Projects\GitHub\SPFxDemos\React-WebPart-Demos"
code .

#Demo 1 - Create hello world React based webpart

yo @microsoft/sharepoint

.\src\webparts\helloworld
#load up workbench
gulp serve
# load in SPO workbench as well: https://"tenant".sharepoint.com/sites/spfx-demos/_layouts/15/workbench.aspx

#comment render function in HelloWorldWebPart.ts to link to weather instead


#demo 2 - More complex React demo - Task List
#pulled from: https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-todo-basic
.\src\webparts\todo
gulp serve

#https://"tenant".sharepoint.com/sites/spfx-demos/_layouts/15/workbench.aspx

#review code structure


#demo 3 - multi-page react
#based on Multi-page - poll webpart by Waldek Mastykarz (MVP, Rencore, @waldekm)
#https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-multipage

#add "Poll" webpart
.\src\webparts\poll
gulp serve
#https://"tenant".sharepoint.com/sites/spfx-demos/_layouts/15/workbench.aspx

#review code structure
#PollWebPart.ts
#which points to Main.tsx
#Which can switch between Poll.tsx or COnfig
#poll switches between Results (default) or Vote (with buttons to switch between two)



#Demo 4 - React in properties
#based on https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-custompropertypanecontrols

#add CustomProperty webpart
.\src\webparts\customPropertyType
.\src\controls\PropertyPaneAsyncDropdown

#review code structure
#CustomPropertyTypeWebPart
#pulls up custom property type
#controls/propertyPaneAsyncDropdown/propertyPaneAsyncDropdown.ts, which pulls up components/AsyncDropdown