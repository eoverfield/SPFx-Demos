//Inspiration: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aadhttpclient-enterpriseapi
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';

import styles from './AadApiDemoWebPart.module.scss';
import * as strings from 'AadApiDemoWebPartStrings';

export interface IAadApiDemoWebPartProps {
  description: string;
}

export default class AadApiDemoWebPart extends BaseClientSideWebPart<IAadApiDemoWebPartProps> {
  private ordersClient: AadHttpClient;

  protected onInit(): Promise<void> {
    this.ordersClient = new AadHttpClient(this.context.serviceScope, 'ecac32fc-5d0a-41c3-bb39-8a728f48295a');

    return Promise.resolve();
  }

  public render(): void {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'aadApiDemo');

    this.ordersClient
      .get('https://pmdemoazurefunctionaad.azurewebsites.net/api/AADApi', AadHttpClient.configurations.v1)
      .then((res: HttpClientResponse): Promise<any> => {
        return res.json();
      })
      .then((products: any): void => {
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.domElement.innerHTML = `
          <div class="${ styles.aadApiDemo}">
            <div class="${ styles.container}">
              <div class="${ styles.row}">
                <div class="${ styles.column}">
                  <span class="${ styles.title}">Products</span>
                  <p class="${ styles.description}">
                    <ul>
                      ${products.map(o => `<li>${o.Name}: ${o.Type} - $${o.UnitPrice}</li>`).join('')}
                    </ul>
                  </p>
                  <a href="https://aka.ms/spfx" class="${ styles.button}">
                    <span class="${ styles.label}">Learn more</span>
                  </a>
                </div>
              </div>
            </div>
          </div>`;
      }, (err: any): void => {
        this.context.statusRenderer.renderError(this.domElement, err);
      });
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
