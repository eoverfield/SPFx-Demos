export interface IListsService {
	getListNames(): string[];
}

export class MockListsService implements IListsService {
	constructor() {
	}
	public getListNames(): string[] {
		return ["list 1", "list 2"];
	}
}
