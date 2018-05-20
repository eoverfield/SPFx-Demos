//Inspired by: https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-youtube
//Thanks to: 	Giuliano De Luca (@giuleon , www.delucagiuliano.com)
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactYoutubeWebPartStrings';
import ReactYoutube from './components/ReactYoutube';
import { IReactYoutubeProps } from './components/IReactYoutubeProps';

export interface IReactYoutubeWebPartProps {
  description: string;
  apiKey: string;
  channelId: string;
  maxResults: number;
}

export default class ReactYoutubeWebPart extends BaseClientSideWebPart<IReactYoutubeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactYoutubeProps > = React.createElement(
      ReactYoutube,
      {
        description: this.properties.description,
        apiKey: this.properties.apiKey,
        channelId: this.properties.channelId,
        maxResults: this.properties.maxResults
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
                }),
                PropertyPaneTextField('apiKey', {
                  label: strings.ApiKeyFieldLabel
                }),
                PropertyPaneTextField('channelId', {
                  label: strings.ChannelIdFieldLabel
                }),
                PropertyPaneSlider('maxResults', {
                  label: strings.MaxResults,
                  min: 1,
                  max: 10,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}