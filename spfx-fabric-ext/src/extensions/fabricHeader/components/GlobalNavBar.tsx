import * as React from 'react';
//import styles from '../AppCustomizer.module.scss';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

export interface IGlobalNavBarProps {
    menuItems: IContextualMenuItem[];
    menuItemsFar?: IContextualMenuItem[];
}

export interface IGlobalNavBarState {
}

export class GlobalNavBar extends React.Component<IGlobalNavBarProps, IGlobalNavBarState> {

   /**
   * Main constructor for the component
   */
  constructor(props:IGlobalNavBarProps) {
    super(props);

    this.state = {
    };
  }

  public render(): React.ReactElement<IGlobalNavBarProps> {

    return (
      <div className={`ms-bgColor-neutralLighter ms-fontColor-white`}>
        <div className={`ms-bgColor-neutralLighter ms-fontColor-white`}>
          <div style={{display: "none"}}>place command bar below</div>
        </div>
      </div>
    );
  }
}

/*
<CommandBar
  isSearchBoxVisible={ false }
  elipisisAriaLabel='More options'
  items={ this.props.menuItems }
  farItems={ this.props.menuItemsFar ? this.props.menuItemsFar : null }
/>
*/
