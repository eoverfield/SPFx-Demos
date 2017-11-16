import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'helloWorldNewStrings';
import HelloWorldNew from './components/HelloWorldNew';
import { IHelloWorldNewProps } from './components/IHelloWorldNewProps';
import { IHelloWorldNewWebPartProps } from './IHelloWorldNewWebPartProps';

export default class HelloWorldNewWebPart extends BaseClientSideWebPart<IHelloWorldNewWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHelloWorldNewProps > = React.createElement(
      HelloWorldNew,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
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
