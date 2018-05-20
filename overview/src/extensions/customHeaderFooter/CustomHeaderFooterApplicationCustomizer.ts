//Inspired by: https://github.com/SharePoint/sp-dev-fx-extensions/tree/master/samples/react-menu-footer-classic-modern/SPFx
//Thanks to: Bob German, Microsoft @Bob1German
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import { escape } from '@microsoft/sp-lodash-subset';

import HeaderFooterDataService from './common/services/HeaderFooterDataService';
import IHeaderFooterData from './common/model/IHeaderFooterData';
import ComponentManager from './common/components/ComponentManager';

const LOG_SOURCE: string = 'CustomHeaderFooterApplicationCustomizer';

export interface ICustomHeaderFooterApplicationCustomizerProperties {
  Top: string;
  Bottom: string;
}


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomHeaderFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CustomHeaderFooterApplicationCustomizer
  extends BaseApplicationCustomizer<ICustomHeaderFooterApplicationCustomizerProperties> {
  
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;


  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized CustomHeaderFooterApplicationCustomizer`);

    // New promise to give back to SPFx and resolve
    // or reject when we're done
    const promise = new Promise<void>((resolve, reject) => {

      // For now this is hard-coded
      // -- UPLOAD JSON WITH MENU CONTENTS AND PUT THE URL HERE --
      //const url = 'https://<tenant>.sharepoint.com/sites/scripts/Style%20Library/HeaderFooterData.json.txt';
      const url = 'https://pixelmilldev1.sharepoint.com/sites/spfx-webparts/Style%20Library/HeaderFooterData.json.txt';      

      // Read JSON containing the header and footer data
        HeaderFooterDataService.get(url)
          .then ((data: IHeaderFooterData) => {
  
            // Get the elements from SPFx
            const header: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(
              PlaceholderName.Top,
              { onDispose : this._onDispose }
            );
            const footer: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(
              PlaceholderName.Bottom,
              { onDispose : this._onDispose }
            );
  
            if (header || footer) {
              // If we have at least one placeholder, render into it
              ComponentManager.render(header ? header.domElement : null,
                footer ? footer.domElement : null, data);
            }
  
            // Tell SPFx we are done
            resolve();
          })
          .catch ((error: string) => {
            console.log(`Error in CustomHeaderFooterApplicationCustomizer: ${error}`);
            reject();
          });
      });

      return promise;
  }

  private _onDispose(): void { }
}
