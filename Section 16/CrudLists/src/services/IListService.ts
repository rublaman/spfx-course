export interface IListService {
    getListItems(nameList: string): Promise<any[]>;
    addListItem(nameList: string, fields: any): Promise<void>;
    updateListItem(nameList: string, id: number, fields: any): Promise<void>;
    removeListItem(nameList: string, id: number): Promise<void>;
}