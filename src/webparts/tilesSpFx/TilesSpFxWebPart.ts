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
  title: string;
  orderBy: string;
  tilesList: string;
}

export default class TilesSpFxWebPart extends BaseClientSideWebPart<ITilesSpFxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITilesSPFxProps> = React.createElement(
      TilesSPFx,
      {
        title: this.properties.title,
        context: this.context,
        orderBy: this.properties.orderBy,
        tilesList: this.properties.tilesList
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
                PropertyPaneTextField('title', {
                  label: 'Title'
                }),
                PropertyPaneTextField('tilesList', {
                  label: 'List name'
                }),
                PropertyPaneChoiceGroup('orderBy', {
                  label: 'Order by',
                  options: [
                   { key: 'Title', text: 'Title'},
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
