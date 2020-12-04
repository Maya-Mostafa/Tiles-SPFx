import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TilesSpFxWebPartStrings';
import TilesSPFx from './components/TilesSPFx';
import { ITilesSPFxProps } from './components/ITilesSPFxProps';

export interface ITilesSpFxWebPartProps {
  description: string;
  orderBy: string;
}

export default class TilesSpFxWebPart extends BaseClientSideWebPart<ITilesSpFxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITilesSPFxProps> = React.createElement(
      TilesSPFx,
      {
        description: this.properties.description,
        context: this.context,
        orderBy: this.properties.orderBy,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Settings'
          },
          groups: [
            {
              //groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Tiles Title'
                }),
                PropertyPaneChoiceGroup('orderBy', {
                  label: 'Order By',
                  options: [
                   { key: 'Title', text: 'Title', checked: true },
                   { key: 'Order', text: 'Order' },
                 ]
               }),
              ]
            }
          ]
        }
      ]
    };
  }
}
