import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

export interface IHelloWorldWebPartProps {
  description: string;
  title: string;
  config: string;
}

import HelloWorld from './components/Configure/ConfigurationView';
import { IConfigurationViewProps } from './components/Configure/IConfigurationViewProps';

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  protected onInit(): Promise<void> {
    this._openPropertyPane = this._openPropertyPane.bind(this);

    return super.onInit();
  }

  public render(): void {
    const reactElement: React.ReactElement<IConfigurationViewProps > = React.createElement(
      HelloWorld,
      {
        description: this.properties.description,
        onConfigure: this._openPropertyPane
      }
    );

    ReactDom.render(reactElement, this.domElement);
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
                PropertyPaneTextField('config', {
                  label: "set up config here"
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _openPropertyPane(): void {
    this.context.propertyPane.open();
  }
}
