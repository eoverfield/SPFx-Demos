declare interface IExternalLibraryStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'externalLibraryStrings' {
  const strings: IExternalLibraryStrings;
  export = strings;
}
