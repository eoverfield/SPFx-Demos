import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ClientMode } from './ClientMode';

export interface IGraphDemoProps {
  clientMode: ClientMode;
  context: WebPartContext;
}
