import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,

  PropertyPaneDropdown,			//add reference to drop down
  IPropertyPaneDropdownOption	//add reference to drop down options

} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CustomPropertiesDynamic.module.scss';
import * as strings from 'customPropertiesDynamicStrings';
import { ICustomPropertiesDynamicWebPartProps } from './ICustomPropertiesDynamicWebPartProps';

//import in the ListService class we create
import * as ListService from './ListService';

//import Env type from sp-core-library to be able to determine env currently running in
import {
  Environment,
  EnvironmentType,
  DisplayMode
} from '@microsoft/sp-core-library';

export default class CustomPropertiesDynamicWebPart extends BaseClientSideWebPart<ICustomPropertiesDynamicWebPartProps> {

  //vars to hold a list of lists and a list of columns for a given list
  private _listOptions: IPropertyPaneDropdownOption[];
  private _columnOptions: IPropertyPaneDropdownOption[];

  //remember if a given list should be disabled or not
  private listDropdownDisabled: boolean = true;
  private columnDropdownDisabled: boolean = true;

  //triggered when the pane is starting to be configured
  protected onPropertyPaneConfigurationStart(): void {
    this.listDropdownDisabled = !this._listOptions;

    //if we already have lists loaded, then we can assume state set
    if (this._listOptions) {
      return;
    }

    //show loading data
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'Loading List Data');

    var dataService = (Environment.type === EnvironmentType.Test || Environment.type === EnvironmentType.Local) ?
        new ListService.MockListsService() :
        new ListService.ListsService(this.context);

    //go and load up dynamic list data
    dataService.getListNames().then(
      (lists : IPropertyPaneDropdownOption[]) => {
        this._listOptions = lists;
        
        this.listDropdownDisabled = false;
        
        //if the list was already selected, then get columns
        if (this.properties.listKey) {
          //go and load up dynamic column data
          dataService.getListColumnNames(this.properties.listKey).then(
            (columns : IPropertyPaneDropdownOption[]) => {
              this._columnOptions = columns;

              this.columnDropdownDisabled = false;
              
              this.context.propertyPane.refresh();
              this.context.statusRenderer.clearLoadingIndicator(this.domElement);
              this.render();
          });
        }
        else {
          //else no list pre selected, so we can continue
          this.context.propertyPane.refresh();
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
          this.render();
        }
      }
    );
  }

  //triggered whenever a property is changed
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    //if the list name was changed, then process that
    if (propertyPath === 'listKey') {
      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      
      // remember previous selected column
      const previousColumn: string = this.properties.columnKey;

      //reset header and body columns
      this._columnOptions = [];
      this.properties.columnKey = "";
      this.properties.columnName = "";
      
      
      // push new item value
      this.onPropertyPaneFieldChanged('itemName', previousColumn, this.properties.columnKey);

      //reset list name
      this.properties.listName = "";
      //set the listName property
      this._listOptions.some(list => {
        if (list.key == newValue) {
          this.properties.listName = list.text;
          return true;
        }
      });

      // disable column selector until ready
      this.columnDropdownDisabled = true;
      // need to refresh the properties panel
      this.context.propertyPane.refresh();
      
      //only need to reload column list if a list was selected
      if (newValue) {
        
        // Set loading message
        this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'items');

        var dataService = (Environment.type === EnvironmentType.Test || Environment.type === EnvironmentType.Local) ?
            new ListService.MockListsService() :
            new ListService.ListsService(this.context);

        //go and load up dynamic column data
        dataService.getListColumnNames(this.properties.listKey).then(
          (columns : IPropertyPaneDropdownOption[]) => {
            this._columnOptions = columns;

            this.columnDropdownDisabled = false;
            this.context.propertyPane.refresh();
            
            this.context.statusRenderer.clearLoadingIndicator(this.domElement);
            this.render();

        });
      }
    }
    else if (propertyPath === 'columnKey') {
      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      
      this.properties.columnName = "";
      
      //set the listName property
      this._columnOptions.some(list => {
        if (list.key == newValue) {
          this.properties.columnName = list.text;
          return true;
        }
      });

      this.render();
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    }
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.customPropertiesDynamic}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">Webpart Title: ${this.properties.title}</p>
              <p class="ms-font-l ms-fontColor-white">Webpart Description: ${this.properties.description}</p>
              <p class="ms-font-l ms-fontColor-white">Selected List Id: ${this.properties.listKey}</p>
              <p class="ms-font-l ms-fontColor-white">Selected List Name: ${this.properties.listName}</p>
              <p class="ms-font-l ms-fontColor-white">Selected Column Id: ${this.properties.columnKey}</p>
              <p class="ms-font-l ms-fontColor-white">Selected Column Name: ${this.properties.columnName}</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneDropdown('listKey', {
                  label: 'Select List',
                  options: this._listOptions,
                  disabled: this.listDropdownDisabled,
                  selectedKey: this.properties.listKey
                }),
                PropertyPaneDropdown('columnKey', {
                  label: 'Select Column',
                  options: this._columnOptions,
                  disabled: this.columnDropdownDisabled,
                  selectedKey: this.properties.columnKey
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
