import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IActionButtonsProps {
    context: WebPartContext;
    listName: string;
    itemId: number;
    disabled: boolean;
    bindList: () => Promise<void>;
}