import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPropertyFieldList } from "@pnp/spfx-property-controls";

export interface ICrudListsWpProps {
  context: WebPartContext;
  list: IPropertyFieldList;
  multiColumn: string;
}
