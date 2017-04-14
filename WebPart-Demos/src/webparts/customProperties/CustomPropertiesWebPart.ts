import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,

  /*
  PropertyPaneButton,
  PropertyPaneCheckbox,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneHorizontalRule,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneToggle
  */
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CustomProperties.module.scss';
import * as strings from 'customPropertiesStrings';
import { ICustomPropertiesWebPartProps } from './ICustomPropertiesWebPartProps';

export default class CustomPropertiesWebPart extends BaseClientSideWebPart<ICustomPropertiesWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.customProperties}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.title)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>



            </div>
          </div>
        </div>
      </div>`;

      /*
              <p class="ms-font-l ms-fontColor-white">${this.properties.dropdown}</p>
              <p class="ms-font-l ms-fontColor-white">${this.properties.slider}</p>
      */
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
  
  /*
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "Group 1",
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneButton('button', {
                  text: "custom button",
                  onClick: function() {}
                }),
                PropertyPaneChoiceGroup('choiceGroup', {
                  label: "Choice Group",
                  options: [
                    {key: "1", text: "Choice 1", disabled: false},
                    {key: "2", text: "Choice 2", checked: true, disabled: false},
                    {key: "3", text: "Choice 3", disabled: false}
                  ]
                }),
                PropertyPaneLabel("label", {
                  text: "A label property",
                  required: true
                })
              ]
            },
            {
              groupName: "Group 2",
              groupFields: [
                PropertyPaneDropdown('dropdown', {
                  label: "Dropdown Propertpy",
                  selectedKey: "2",
                  options: [
                    {key: "1", text: "Dropdown 1"},
                    {key: "2", text: "Dropdown 2"},
                    {key: "3", text: "Dropdown 3"}
                  ]
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneLink('link', {
                  text: "Link property",
                  href: ""
                })
              ]
            },
          ],
          displayGroupsAsAccordion: true
        },
        {
          header: {
            description: "Page 2"
          },
          groups: [
            {
              groupName: "Group 1",
              groupFields: [
                PropertyPaneSlider('slider', {
                  label: "Slider property",
                  disabled: false,
                  min: 1,
                  max: 100,
                  step: 5,
                  value: 25
                }),
                PropertyPaneToggle('toggle', {
                  label: "Toggle Property",
                  offText: "Property off",
                  onText: "Property On",
                  key: "ToggleSelected"
                })
              ]
            }
          ]
        }
      ]
    };
  }
  */
}
