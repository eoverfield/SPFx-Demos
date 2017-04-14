declare interface ICustomPropertiesStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'customPropertiesStrings' {
  const strings: ICustomPropertiesStrings;
  export = strings;
}
