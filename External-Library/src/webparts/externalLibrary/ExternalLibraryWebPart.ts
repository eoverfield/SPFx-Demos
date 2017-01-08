import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

//import * as $ from 'jquery'; //"import" would have worked if we included the jquery module.

//instead we can "require" the external resource using the external "key" that references our external library source.
const $: JQueryStatic = require('jqueryCDN');  

import styles from './ExternalLibrary.module.scss';
import * as strings from 'externalLibraryStrings';
import { IExternalLibraryWebPartProps } from './IExternalLibraryWebPartProps';

export default class ExternalLibraryWebPart extends BaseClientSideWebPart<IExternalLibraryWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.externalLibrary}">
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

      //we can now use our external resource as expected, in our case $ which equals jQuery.
      $(this.domElement).children('DIV').append("<p>This paragraph was added by jQuery after the webpart container.<\p>");
      $(this.domElement).find('.ms-Grid-col').append("<p>This paragraph was added by jQuery inline with content.<\p>");
  }

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
}
