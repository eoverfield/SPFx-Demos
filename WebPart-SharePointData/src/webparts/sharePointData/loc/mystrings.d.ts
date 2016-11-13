declare interface ISharePointDataStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'sharePointDataStrings' {
  const strings: ISharePointDataStrings;
  export = strings;
}
