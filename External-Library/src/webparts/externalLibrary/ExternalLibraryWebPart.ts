import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

//import * as $ from 'jquery1'; //"import" would have worked if we included the jquery module.
//import * as $ from 'jqueryCDN'; //"import" would have worked if we included the jquery module.
//import $ from 'jquery';

//instead we can "require" the external resource using the external "key" that references our external library source.
const $: any = require('jqueryCDN');

import styles from './ExternalLibrary.module.scss';
import * as strings from 'externalLibraryStrings';
import { IExternalLibraryWebPartProps } from './IExternalLibraryWebPartProps';

export default class ExternalLibraryWebPart extends BaseClientSideWebPart<IExternalLibraryWebPartProps> {

  public render(): void {

    this.domElement.innerHTML = `
      <div class="${styles.row}">
        <div class="${styles.column}">
          <span class="${styles.title}">
            Welcome to SharePoint!
          </span>
          <p class="${styles.subtitle}">
            Customize SharePoint experiences using Web Parts.
          </p>
          <p class="${styles.description}">
            ${escape(this.properties.description)}
          </p>
          <a class="ms-Button ${styles.button}" href="https://github.com/SharePoint/sp-dev-docs/wiki">
            <span class="ms-Button-label">
              Learn more
            </span>
          </a>
        </div>
      </div>`;

      //we can now use our external resource as expected, in our case $ which equals jQuery.
      $(this.domElement).children('DIV').append("<div>This paragraph was added by jQuery after the webpart container.<\div>");
      $(this.domElement).find('DIV[class^="col"]').append("<p>This paragraph was added by jQuery inline with content.<\p>");
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
}
