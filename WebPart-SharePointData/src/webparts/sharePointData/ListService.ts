'use strict';

import {
  IWebPartContext
} from '@microsoft/sp-client-preview';

import { HttpClient } from '@microsoft/sp-client-base';

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
  private _httpClient: HttpClient;
  private _webAbsoluteUrl: string;

  public constructor(webPartContext: IWebPartContext) {
    this._httpClient = webPartContext.httpClient as any; // tslint:disable-line:no-any
    this._webAbsoluteUrl = webPartContext.pageContext.web.absoluteUrl;
  }

  public getListNames(): Promise<ISPLists> {
    return this._httpClient.get(this._webAbsoluteUrl + `/_api/Lists/?$select=Id,Title&$filter=Hidden ne true&$orderby Title`)
      .then((response: Response) => {
        return response.json();
      });
  }
}