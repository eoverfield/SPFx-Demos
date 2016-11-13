import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
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
} from '@microsoft/sp-client-preview';

import styles from './WebPartProperties.module.scss';
import * as strings from 'webPartPropertiesStrings';
import { IWebPartPropertiesWebPartProps } from './IWebPartPropertiesWebPartProps';

export default class WebPartPropertiesWebPart extends BaseClientSideWebPart<IWebPartPropertiesWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.webPartProperties}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${this.properties.title}</p>


              <a href="https://github.com/SharePoint/sp-dev-docs/wiki" class="ms-Button ${styles.button}">
                <span class="ms-Button-label">Learn more</span>
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

  /*
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
  */

protected get propertyPaneSettings(): IPropertyPaneSettings {
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
                })
              ]
            }
          ]
        }
      ]
    };
  }

/*
  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
                    {key: "1", text: "Choice 1", isDisabled: false},
                    {key: "2", text: "Choice 2", isChecked: true, isDisabled: false},
                    {key: "3", text: "Choice 3", isDisabled: false}
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
                  options: [
                    {key: "1", text: "Dropdown 1"},
                    {key: "2", text: "Dropdown 2", isSelected: true},
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
