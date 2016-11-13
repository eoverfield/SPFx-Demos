import { ISPList } from './ListService';

export class MockHttpClient {

    public static _items: ISPList[] = [
      {
        Id: '1',
        Title: 'List 1'
      },
      {
        Id: '2',
        Title: 'List 2'
      },
      {
        Id: '3',
        Title: 'List 3',
      }
    ];
}