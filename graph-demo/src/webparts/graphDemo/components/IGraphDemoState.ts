import { IUserItem } from './IUserItem';

export interface IGraphDemoState {
    users: Array<IUserItem>;
    searchFor: string;
}
