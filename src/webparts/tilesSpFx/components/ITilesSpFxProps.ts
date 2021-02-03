import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface ITilesSPFxProps {
  title: string;
  context: WebPartContext;
  orderBy: string;
  tilesList: string;
  themeVariant: IReadonlyTheme | undefined;
}
