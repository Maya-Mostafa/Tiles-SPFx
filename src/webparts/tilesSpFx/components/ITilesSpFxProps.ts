import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITilesSPFxProps {
  title: string;
  context: WebPartContext;
  orderBy: string;
  tilesList: string;
  myDepts: string;
  mySuper: string;
  myHR: string;
}
