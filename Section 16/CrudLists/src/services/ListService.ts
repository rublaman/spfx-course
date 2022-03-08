import {IListService} from "./IListService"

import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class ListService implements IListService {

    private _context: WebPartContext;
    private _url: string;
    private _sp: SPFI;

    constructor (context: WebPartContext ){
        this._context = context,
        this._url = context.pageContext.web.absoluteUrl,
        this._sp = spfi().using(SPFx(this._context));
    }

    public async getListItems(name: string): Promise<any> {
        return this._sp.web.lists.getByTitle(name).items();
    }
}