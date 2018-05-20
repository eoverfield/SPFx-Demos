import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={ styles.helloWorld }>
       { this.props.reactConfig == 'config' &&
          <div>config</div>
        }
        { this.props.reactConfig != 'config' &&
          <div>not config</div>
        }
      </div>
    );
  }
}
