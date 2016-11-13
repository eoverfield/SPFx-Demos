declare interface IWebPartPropertiesDynamicStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'webPartPropertiesDynamicStrings' {
  const strings: IWebPartPropertiesDynamicStrings;
  export = strings;
}
