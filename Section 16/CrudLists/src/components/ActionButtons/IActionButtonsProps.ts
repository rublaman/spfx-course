import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IActionButtonsProps {
    context: WebPartContext;
    listName: string;
    listElement: {};
    checked: boolean;
}