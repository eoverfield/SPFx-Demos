import {
  IWebPartContext,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

//import the HttpClient to make calls to SharePoint
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

//create the exportable interface to different classes
export interface IListsService {
  getListNames(): Promise<IPropertyPaneDropdownOption[]>;
  getListColumnNames(listId: string): Promise<IPropertyPaneDropdownOption[]>;
}

//create an interface for array helpers. Should normally be in its own file, but for ease of use, added here
export interface IArrayHelper {
    sortByKey(array: Object[], key: string): Object[];
}
export class ArrayHelper implements IArrayHelper {
  constructor() {
  }

  //return a new array that is sorted by the object key of an array of objects
  public sortByKey(array: Object[], key: string) {
    return array.sort((a, b) => {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}

//Class for mock data - when not conntected to SharePoint - for testing
export class MockListsService implements IListsService {
  constructor() {
  }

  //get a list of list names
  public getListNames(): Promise<IPropertyPaneDropdownOption[]> {
    return new Promise<IPropertyPaneDropdownOption[]>(resolve => {
      //add a delay to simulate slow connection
      setTimeout(() => {
        var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
        options.push( { key: '', text: 'Select List' });
        options.push( { key: '1', text: 'List 1' });
        options.push( { key: '2', text: 'List 2' });

        resolve(options);
      }, 2500);
    });
  }

  //get a list of columns within a list
  public getListColumnNames(listId: string): Promise<IPropertyPaneDropdownOption[]> {
    return new Promise<IPropertyPaneDropdownOption[]>(resolve => {
      //add a delay to simulate slow connection
      setTimeout(() => {
        var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
        options.push( { key: '', text: 'Select Column' });
        options.push( { key: 'column1', text: 'Column 1' });
        options.push( { key: 'column2', text: 'Column 2' });
        options.push( { key: 'column3', text: 'Column 3' });
        options.push( { key: 'column4', text: 'Column 4' });

        resolve(options);
      }, 2500);
    });
  }
}

//Class for getting live SharePoint data
export class ListsService implements IListsService {
  //add class vars for use in methods
  private context: IWebPartContext;
  private _arrayHelper: ArrayHelper = new ArrayHelper();

  //constructor of class, set up values for our HttpClient and more
  public constructor(webPartContext: IWebPartContext) {
    this.context = webPartContext as any; 
  }

  //get the lists found in the current web
  public getListNames(): Promise<IPropertyPaneDropdownOption[]> {
    //using SharePoint API to get list of lists, ordered by Title. Select ID and Title of each list
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/Lists/?$select=Id,Title&$filter=Hidden ne true&$orderby Title`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();

        return response.json().then((data) => {
            options.push( { key: "", text: "Select List" });
            data.value.forEach(list => {
                options.push( { key: list.Id, text: list.Title });
            });
            //since the returned values are pre-ordered, just return the list of lists
            return options;
        });
      });
  }

  //get a list of columns within a list
  public getListColumnNames(listId: string): Promise<IPropertyPaneDropdownOption[]> {
    //based on the list id, get the fields for a given list. Unable to sort as orderBy does not work with field selection
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists(guid'` + listId + `')/fields?$select=Id,Title&$filter=Hidden ne true`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();

        return response.json().then((data) => {
            //sort the fields
            data.value = this._arrayHelper.sortByKey(data.value, 'Title');

            options.push( { key: "", text: "Select Column" });
            data.value.forEach(list => {
                options.push( { key: list.Id, text: list.Title });
            });
            return options;
        });
    });
  }
}