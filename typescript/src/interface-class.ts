interface IListsService {
  getListNames(): string[];
  getListColumnNames(listId: string): string[];
}

class MockListsService implements IListsService {
	constructor() {
	}
	public getListNames(): string[] {
		return ["list 1", "list 2"];
	}

	public getListColumnNames(listId: string): string[] {
		if (listId === "one") {
			return ["column 1", "column 2"];
		}
		else {
			return ["column 3", "column 4"];
		}
	}
}

let listService: MockListsService = new MockListsService();

console.log(listService.getListNames()); // string array: [“list 1”, “list 2”]
console.log(listService.getListColumnNames("two")); //string array [“column 3”, “column 4”]
