import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-webpart-base';

import * as strings from 'GraphDemoWebPartStrings';
import GraphDemo from './components/GraphDemo';
import { IGraphDemoProps } from './components/IGraphDemoProps';
import { ClientMode } from './components/ClientMode';

export interface IGraphDemoWebPartProps {
  clientMode: ClientMode;
}

export default class GraphDemoWebPart extends BaseClientSideWebPart<IGraphDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGraphDemoProps > = React.createElement(
      GraphDemo,
      {
        clientMode: this.properties.clientMode,
        context: this.context,
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
                PropertyPaneChoiceGroup('clientMode', {
                  label: strings.ClientModeLabel,
                  options: [
                    { key: ClientMode.aad, text: "AadHttpClient"},
                    { key: ClientMode.graph, text: "MSGraphClient"},
                  ]
                }),              
              ]
            }
          ]
        }
      ]
    };
  }
}
