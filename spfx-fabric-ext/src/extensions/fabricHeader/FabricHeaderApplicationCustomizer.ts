import * as React from 'react';
import * as ReactDom from 'react-dom';

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'FabricHeaderApplicationCustomizerStrings';

import { GlobalNavBar, IGlobalNavBarProps } from './components/GlobalNavBar';
import { MockNavProvider } from './services/MockNavProvider';

import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

const LOG_SOURCE: string = 'FabricHeaderApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFabricHeaderApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class FabricHeaderApplicationCustomizer
  extends BaseApplicationCustomizer<IFabricHeaderApplicationCustomizerProperties> {

    private _topPlaceholder: PlaceholderContent | undefined;
    private _topMenuItems: IContextualMenuItem[];
    private _topMenuItemsFar: IContextualMenuItem[];

    @override
    public async onInit(): Promise<void> {
      Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

      //load up navigation items
      this._topMenuItems = MockNavProvider.loadNavigation();
      this._topMenuItemsFar = MockNavProvider.loadNavigationFar();

      //render the header
      this._renderPlaceHolders();

      return Promise.resolve<void>();
    }

    private _renderPlaceHolders(): void {
      // Handling the top placeholder
      if (!this._topPlaceholder) {
        this._topPlaceholder =
          this.context.placeholderProvider.tryCreateContent(
            PlaceholderName.Top,
            { onDispose: this._onDispose });

        // The extension should not assume that the expected placeholder is available.
        if (!this._topPlaceholder) {
          console.error('The expected placeholder (Top) was not found.');
          return;
        }

        if (this._topMenuItems != null && this._topMenuItems.length > 0) {
          const element: React.ReactElement<IGlobalNavBarProps> = React.createElement(
            GlobalNavBar,
            {
              menuItems: this._topMenuItems,
              menuItemsFar: this._topMenuItemsFar
            }
          );

          ReactDom.render(element, this._topPlaceholder.domElement);
        }
      }
    }

    private _onDispose(): void {
      console.log('[FabricExtApplicationCustomizer._onDispose] Disposed custom header.');
    }
}
