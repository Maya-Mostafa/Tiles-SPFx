import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITilesSPFxProps {
  description: string;
  context: WebPartContext;
  orderBy: string;
}
