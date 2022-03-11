import { IColumn } from "office-ui-fabric-react";

export interface IDetailListState {
    listItems: any[];
    seletedItem: {};
    columns: IColumn[]; 
    checked: boolean;
}