import * as React from 'react';
import {
  TextField,
  Button,
  ButtonType
} from 'office-ui-fabric-react';
import { IConfigurationViewProps } from './IConfigurationViewProps';

export default class ConfigurationView extends React.Component<IConfigurationViewProps, {}>{

  private _placeHolderText: string = 'Enter your todo';

  constructor(props: IConfigurationViewProps) {
    super(props);

    this._handleConfigureButtonClick = this._handleConfigureButtonClick.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="Placeholder">
          <div className="Placeholder-container ms-Grid">
              <div className="Placeholder-head ms-Grid-row">
                  <div className="ms-Grid-col ms-u-hiddenSm ms-u-md3"></div>
                  <div className="Placeholder-headContainer ms-Grid-col ms-u-sm12 ms-u-md6">
                    <i className={"Placeholder-icon ms-fontSize-su ms-Icon "}></i><span className="Placeholder-text ms-fontWeight-light ms-fontSize-xxl">Configure now</span></div>

                    
                  <div className="ms-Grid-col ms-u-hiddenSm ms-u-md3"></div>
              </div>
              <div className="Placeholder-description ms-Grid-row"><span className="Placeholder-descriptionText">{this.props.description}</span></div>
              <div className="Placeholder-description ms-Grid-row">
                  <Button
                    buttonType={ ButtonType.primary }
                    ariaLabel="some aria label"
                    onClick={this._handleConfigureButtonClick}>
                    This is our custom button
                  </Button>
              </div>
          </div>
      </div>
    );
  }

  private _handleConfigureButtonClick(event?: React.MouseEvent<HTMLButtonElement>) {
    this.props.onConfigure();
  }
}
