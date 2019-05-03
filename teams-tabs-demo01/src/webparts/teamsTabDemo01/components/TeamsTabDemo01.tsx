import * as React from 'react';
import styles from './TeamsTabDemo01.module.scss';
import { ITeamsTabDemo01Props } from './ITeamsTabDemo01Props';
import { ITeamsTabDemo01State } from './ITeamsTabDemo01State';
import { escape } from '@microsoft/sp-lodash-subset';

import { MSGraphClient } from '@microsoft/sp-http';

export default class TeamsTabDemo01 extends React.Component<ITeamsTabDemo01Props, ITeamsTabDemo01State> {
  constructor(props: ITeamsTabDemo01Props) {
    super(props);

    this.state = {
      displayName: ""
    };

    this.props.context.msGraphClientFactory
    .getClient()
    .then((client: MSGraphClient): void => {
       // get information about the current user from the Microsoft Graph
       client
       .api('/me')
       .get((error, response: any, rawResponse?: any) => {
         // handle the response|
         console.log("got me");
         console.log(response);

         this.setState({
           displayName: response.displayName
         });
     });
    });
  }

  public render(): React.ReactElement<ITeamsTabDemo01Props> {
    return (
      <div className={ styles.teamsTabDemo01 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>{escape(this.props.title)}</span>
              <p className={ styles.subTitle }>{escape(this.props.subTitle)}</p>
              <p className={ styles.description }>{escape(this.props.siteTabTitle)}</p>
              {this.state.displayName && (
                <p className={ styles.description }>Hello: {escape(this.state.displayName)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
