import { IColumn } from "office-ui-fabric-react";
import { IListItem } from "./IListItem";

export interface IDetailListState {
    listItems: any[];
    seletedItem: IListItem;
    columns: IColumn[]; 
    disabled: boolean;
}