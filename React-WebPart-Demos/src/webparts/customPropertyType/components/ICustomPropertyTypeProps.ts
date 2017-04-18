import { DisplayMode } from '@microsoft/sp-core-library';

export interface ICustomPropertyTypeProps {
  list: string;
  item: string;
  needsConfiguration: boolean;
  configureWebPart: () => void;
  displayMode: DisplayMode;
}
