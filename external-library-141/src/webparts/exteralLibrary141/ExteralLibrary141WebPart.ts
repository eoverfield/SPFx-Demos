import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ExteralLibrary141WebPart.module.scss';
import * as strings from 'ExteralLibrary141WebPartStrings';


import * as $ from 'jquery';
import * as _ from 'lodash';

export interface IExteralLibrary141WebPartProps {
  description: string;
}

export default class ExteralLibrary141WebPart extends BaseClientSideWebPart<IExteralLibrary141WebPartProps> {

  public render(): void {
    //add lodash for bundle
    var first: any = [1];
    var second: any = _.concat(first, 2, [3], [4]);

    console.log(second);

    this.domElement.innerHTML = `
      <div class="${ styles.exteralLibrary141 }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
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
