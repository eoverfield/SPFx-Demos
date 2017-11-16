declare interface IHelloWorldNewStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'helloWorldNewStrings' {
  const strings: IHelloWorldNewStrings;
  export = strings;
}
