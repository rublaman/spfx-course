import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPropertyFieldList } from "@pnp/spfx-property-controls";

export interface IDetailListProps {
    context: WebPartContext;
    list: IPropertyFieldList;
}