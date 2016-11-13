import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown,			//add reference to drop down
  IPropertyPaneDropdownOption	//add reference to drop down options
} from '@microsoft/sp-client-preview';

import styles from './WebPartPropertiesDynamic.module.scss';
import * as strings from 'webPartPropertiesDynamicStrings';
import { IWebPartPropertiesDynamicWebPartProps } from './IWebPartPropertiesDynamicWebPartProps';

/*
//import in the ListService class we create
import * as ListService from './ListService';

//import Env type from sp-client-base to be able to determine env currently running in
import { EnvironmentType, DisplayMode,  } from '@microsoft/sp-client-base';
*/

export default class WebPartPropertiesDynamicWebPart extends BaseClientSideWebPart<IWebPartPropertiesDynamicWebPartProps> {

  /*
  //vars to hold a list of lists and a list of columns for a given list
  private _listOptions: IPropertyPaneDropdownOption[];
  private _columnOptions: IPropertyPaneDropdownOption[];

  public constructor(context: IWebPartContext) {
    super(context);
  }

   //on the webpart initialization, process
  public onInit<T>(): Promise<T> {
    this._listOptions = [];
    this._columnOptions = [];

    //only execute when in edit mode
    if (DisplayMode.Edit === 2) {
      //go and load the dropdown list of SharePoint lists upon init so as to speed up process
      //inspiration from http://www.wictorwilen.se/sharepoint-framework-how-to-properly-dynamically-populate-dropdown-property-pane-fields
      var dataService = (this.context.environment.type === EnvironmentType.Test || this.context.environment.type === EnvironmentType.Local) ?
        new ListService.MockListsService() :
        new ListService.ListsService(this.context);

      return new Promise<T>((resolve: (args: T) => void, reject: (error: Error) => void) => {
        dataService.getListNames().then(
          (lists : IPropertyPaneDropdownOption[]) => {
            this._listOptions = lists;
          }
        );

        resolve(undefined);
      });

    }
  }

  //override property change method so that when new list selected, we can update other columns
  public onPropertyChange(propertyPath: string, newValue: any): void {

    this.properties[propertyPath] = newValue;

    //if the list was changed, we need to go and get columns for that list
    if (propertyPath === 'listName') {
      //reset header and body columns
      this._columnOptions = [];
      this.properties.listColumn = '';
    }

    //and now complete normaly property change
    super.onPropertyChange(propertyPath, newValue);
  }

  */

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.webPartPropertiesDynamic}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${this.properties.description}</p>
              <a href="https://github.com/SharePoint/sp-dev-docs/wiki" class="ms-Button ${styles.button}">
                <span class="ms-Button-label">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  /*
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.webPartPropertiesDynamic}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">Webpart Title: ${this.properties.title}</p>
              <p class="ms-font-l ms-fontColor-white">Webpart Description: ${this.properties.description}</p>
              <p class="ms-font-l ms-fontColor-white">Selected List: ${this.properties.listName}</p>
              <p class="ms-font-l ms-fontColor-white">Selected Column: ${this.properties.listColumn}</p>
            </div>
          </div>
        </div>
      </div>`;
  }
  */

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  /*
  protected get propertyPaneSettings(): IPropertyPaneSettings {
    //set up additional dropdown properties for column selection based on list selection
    let templatePropertyColumn: any;

    //set up the column dropdown property with default settings
    templatePropertyColumn = PropertyPaneDropdown('listColumn', {
      label: 'Select Column',
      isDisabled: true,
      options: [{key: "", text: "Select List First"}]
    });

    //check to see if the list has been selected
    if (this.properties.listName && this.properties.listName.length > 0) {

      //if we have a list, check to see if columns are loaded. If they are not, then go and get them and after promise, kick off configureStart to reload
      if ((this._columnOptions.length < 1)) {
        templatePropertyColumn.properties.label = 'Loading Column List';

        var dataService = (this.context.environment.type === EnvironmentType.Test || this.context.environment.type === EnvironmentType.Local) ?
          new ListService.MockListsService() :
          new ListService.ListsService(this.context);

        dataService.getListColumnNames(this.properties.listName).then(
          (columns : IPropertyPaneDropdownOption[]) => {
            this._columnOptions = columns;

            //we now have the columns, so kick off reload
            //based on suggestion: https://github.com/SharePoint/sp-dev-docs/wiki/Async-data-fetch-in-the-property-pane
            //note, bugs may exist as documented on GitHub
            this.configureStart();
        });
      }
      else {
        //since we have the columns, go and and load them up now.
        templatePropertyColumn.properties.options = this._columnOptions;
        templatePropertyColumn.properties.selectedKey = this.properties.listColumn;
        templatePropertyColumn.properties.isDisabled = false;
      }
    }

    return {
      pages: [
        {
          header: {
            description: strings.BasicGroupName
          },
          groups: [
            {
              groupName: 'Web Part Options',
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Title'
                }),
                PropertyPaneTextField('description', {
                  label: 'Description'
                }),
                PropertyPaneDropdown('listName', {
                  label: 'Select List',
                  options: this._listOptions
                }),
                templatePropertyColumn
              ]
            }
          ]
        }
      ]
    };
  }
  */
}
