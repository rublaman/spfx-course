export interface IListService {
    getListItems(nameList: string): Promise<any[]>;
    addListItem(nameList: string, fields: any): Promise<any[]>
}