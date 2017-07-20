import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import { DisplayMode } from '@microsoft/sp-core-library';
import ConfigurationView from '../ConfigurationView/ConfigurationView';
import { IConfigProps } from './IConfigProps';

export class Config extends React.Component<IConfigProps, {}> {
  public render(): JSX.Element {
    console.log("Config props");
    console.log(this.props);
    
    return (
      <Fabric>
        { this.props.displayMode === DisplayMode.Edit &&
          <ConfigurationView
            icon="ms-Icon--CheckboxComposite"
            iconText="Poll"
            description="Find out what others think."
            buttonLabel="Configure"
            onConfigure={ this.props.configure } />
        }
        { this.props.displayMode === DisplayMode.Read &&
          <ConfigurationView
            icon="ms-ICon--CheckboxComposite"
            iconText="Poll"
            description="Find out what others think." />
        }
      </Fabric>
    );
  }
}