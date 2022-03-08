export interface IListService {
    getListItems(name: string): Promise<any[]>;
}