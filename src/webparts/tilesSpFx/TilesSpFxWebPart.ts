import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
  PropertyPaneCheckbox
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {SPHttpClient} from '@microsoft/sp-http';

// import * as strings from 'TilesSpFxWebPartStrings';
import TilesSPFx from './components/TilesSPFx';
import { ITilesSPFxProps } from './components/ITilesSPFxProps';

/** Theming: Step 1: Add references to the theme provider and all related objects **/
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
  ISemanticColors
} from '@microsoft/sp-component-base';

export interface ITilesSpFxWebPartProps {
  title: string;
  orderBy: string;
  tilesList: string;
  filterText: string;
  isFilterEnabled: boolean;
}

export default class TilesSpFxWebPart extends BaseClientSideWebPart<ITilesSpFxWebPartProps> {

  public render(): void {
    const semanticColors: Readonly<ISemanticColors> | undefined = this._themeVariant && this._themeVariant.semanticColors;
    const element: React.ReactElement<ITilesSPFxProps> = React.createElement(
      TilesSPFx,
      {
        title: this.properties.title,
        context: this.context,
        orderBy: this.properties.orderBy,
        tilesList: this.properties.tilesList,
        themeVariant: this._themeVariant,
        filterText: this.properties.filterText,
        isFilterEnabled: this.properties.isFilterEnabled
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

  /*** Theming - Background color awareness ***/
  private _themeProvider: ThemeProvider; //allow access to the theming information of the current web part section
  private _themeVariant: IReadonlyTheme | undefined; //store all property that   relates to the current theme applied to the page section
  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();
    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
    return super.onInit();
  }
  /**Update the current theme variant reference and re-render.*/
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  /* Loading Dpd with list names - Start */
  private lists: IPropertyPaneDropdownOption[];
  private async loadLists(): Promise<IPropertyPaneDropdownOption[]> {    
    let listsTitle : any = [];
    try {
      let response = await this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$select=Title&$filter=BaseType eq 0 and BaseTemplate eq 100 and Hidden eq false`, SPHttpClient.configurations.v1);
      if (response.ok) {
        const results = await response.json();
        if(results){
          //console.log('results', results);
          results.value.map((result: any)=>{
            listsTitle.push({
              key: result.Title,
              text: result.Title
            });
          });
          return listsTitle;
        }
      }
    } catch (error) {
      return error.message;
    }
  }
  protected onPropertyPaneConfigurationStart(): void {
    if (this.lists) {
      this.render();  
      return;
    }
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');
    this.loadLists()
      .then((listOptions: IPropertyPaneDropdownOption[]): void => {
        this.lists = listOptions;
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);        
        this.render();       
      });
  } 
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'listName' && newValue) {
      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();
      // re-render the web part as clearing the loading indicator removes the web part body
      this.render();      
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, oldValue);
    }
  }
  /* Loading Dpd with list names - End */

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
                // PropertyPaneTextField('tilesList', {
                //   label: 'List name'
                // }),
                PropertyPaneDropdown('tilesList', {
                  label: 'List name',
                  options: this.lists,
                  selectedKey: 'Tiles'
                }),
                PropertyPaneChoiceGroup('orderBy', {
                  label: 'Order by',
                  options: [
                   { key: 'Title', text: 'Title'},
                   { key: 'Order', text: 'Order' },
                 ]
               }),
               PropertyPaneCheckbox('isFilterEnabled', {
                 text: 'Show Filter',
                 checked: true
               }),
               PropertyPaneTextField('filterText', {
                label: 'Filter text',
                value: 'Search...'
              }),
              ]
            }
          ]
        }
      ]
    };
  }
}
