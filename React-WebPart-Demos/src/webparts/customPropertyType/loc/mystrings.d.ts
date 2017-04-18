declare interface ICustomPropertyTypeStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListFieldLabel: string;
  ItemFieldLabel: string;
}

declare module 'customPropertyTypeStrings' {
  const strings: ICustomPropertyTypeStrings;
  export = strings;
}