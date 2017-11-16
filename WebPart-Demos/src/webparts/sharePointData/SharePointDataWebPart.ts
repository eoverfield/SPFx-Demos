import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SharePointData.module.scss';
import * as strings from 'sharePointDataStrings';
import { ISharePointDataWebPartProps } from './ISharePointDataWebPartProps';

//import Env type from sp-core-library to be able to determine env currently running in
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import * as ListService from './ListService';


export default class SharePointDataWebPart extends BaseClientSideWebPart<ISharePointDataWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.sharePointData}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
            </div>
          </div>
        </div>
        <div id="spListContainer" />
        </div>
      </div>`;

      this._renderListAsync();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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

  //determine what type of request to make, to either mock or sp rest api
  private _renderListAsync(): void {
    const dataService = (Environment.type === EnvironmentType.Test || Environment.type === EnvironmentType.Local) ?
        new ListService.MockListsService() :
        new ListService.ListsService(this.context);

    dataService.getListNames().then((response) => {
        this._renderList(response.value);
    });
  }

  //actual render function
  private _renderList(items: ListService.ISPList[]): void {
    let html: string = '';
    items.forEach((item: ListService.ISPList) => {
        html += `
        <ul class="${styles.list}">
            <li class="${styles.listItem}">
                <span class="ms-font-l">${item.Title}</span>
            </li>
        </ul>`;
    });

    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }
}
