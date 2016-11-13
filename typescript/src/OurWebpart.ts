import * as ListService from './ListService';
		
let dataService: ListService.MockListsService = new ListService.MockListsService();
		
let y: string[] = dataService.getListNames();

console.log("Modules: " + y);