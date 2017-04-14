import {
  IWebPartContext 
} from '@microsoft/sp-webpart-base';

import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

import { MockHttpClient } from './MockHttpClient';

export interface ISPLists {
    value: ISPList[];
}

export interface ISPList {
    Title: string;
    Id: string;
}

export interface IListsService {
  getListNames(): Promise<ISPLists>;
}

//get mock data
export class MockListsService implements IListsService {
  constructor() {
  }

  public getListNames(): Promise<ISPLists> {
    return new Promise<ISPLists>(resolve => {
      setTimeout(() => {
        var listData: ISPLists = { value: MockHttpClient._items };

        resolve(listData);
      }, 1000);
    });
  }
}

//get live data
export class ListsService implements IListsService {
  private context: IWebPartContext;

  public constructor(webPartContext: IWebPartContext) {
    this.context = webPartContext as any; 
  }

  public getListNames(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/Lists/?$select=Id,Title&$filter=Hidden ne true&$orderby Title`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }
}
