import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITileFormProps{
    formField:any;
    onChangeFormField: any;
    errorMsgField: any;
    context: WebPartContext;
}