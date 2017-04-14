declare interface ICustomPropertiesDynamicStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'customPropertiesDynamicStrings' {
  const strings: ICustomPropertiesDynamicStrings;
  export = strings;
}
