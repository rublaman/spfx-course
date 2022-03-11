import { IListService } from "./IListService"

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult, IItemUpdateResult } from "@pnp/sp/items";


export default class ListService implements IListService {

    private _context: WebPartContext;
    private _url: string;
    private _sp: SPFI;

    constructor(context: WebPartContext) {
        this._context = context;
        this._url = context.pageContext.site.absoluteUrl;
        this._sp = spfi().using(SPFx(this._context));
    }

    public getListItems(nameList: string): Promise<any> {
        return this._sp.web.lists.getByTitle(nameList).items();
    }

    public addListItem(nameList: string, fields: any): Promise<IItemAddResult> {
        return this._sp.web.lists.getByTitle(nameList).items.add(({
            fields
        }))
    }

    public updateListItem(nameList: string, id: number, fields: any): Promise<IItemUpdateResult> {
        return this._sp.web.lists.getByTitle(nameList).items.getById(id).update({
            fields
        })
    }

    public removeListItem(nameList: string, itemId: any): Promise<void> {
        return this._sp.web.lists.getByTitle(nameList).items.getById(itemId).delete();
    }
}