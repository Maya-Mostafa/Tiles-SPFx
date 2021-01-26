import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITileFormProps{
    formField:any;
    onChangeFormField: any;
    errorMsgField: any;
    
    context: WebPartContext;

    selectedIconKey: any;
    onRadioChange: any;
    selectedIcon: any;
    onSaveIcon: any;
    onSaveImg: any;

    siteLists: any;
}