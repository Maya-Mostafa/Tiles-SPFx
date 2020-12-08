import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITileControlsProps{
  context: WebPartContext;
  
  formField:any;
  colorField:any;
  iconField:any;
  openNewWin:any;

  onChangeFormField: any;
  onChangeColorField: any;
  onChangeIconField: any;
  onChangeOpenNewWin: any;

  hideDialog: any;
  toggleHideDialog: any;

  errorMsgTitle : string;
  errorMsgLink : string;

  addTileItem: any;

  handleEditChange: any;
}