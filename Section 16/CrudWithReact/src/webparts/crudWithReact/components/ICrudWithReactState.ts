import { ISoftwareListItem  } from "./ISoftwareListItem";

export interface ICrudWithReactState {
    status: string;
    softwareListItems: ISoftwareListItem[];
    softwareListItem: ISoftwareListItem;
}