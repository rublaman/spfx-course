import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CrudListsWpWebPartStrings';
import CrudListsWp from './components/CrudListsWp';
import { ICrudListsWpProps } from './components/ICrudListsWpProps';

import {
  IPropertyFieldList,
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import {
  IColumnReturnProperty,
  IPropertyFieldRenderOption,
  PropertyFieldColumnPicker,
  PropertyFieldColumnPickerOrderBy
} from '@pnp/spfx-property-controls';
export interface ICrudListsWpWebPartProps {
  lists: IPropertyFieldList;
  multiColumn: string;
}

export default class CrudListsWpWebPart extends BaseClientSideWebPart<ICrudListsWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICrudListsWpProps> = React.createElement(
      CrudListsWp,
      {
        context: this.context,
        list: this.properties.lists
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  includeListTitleAndUrl: true
                }),
                PropertyFieldColumnPicker('multiColumn', {
                  label: 'Select columns',
                  context: this.context,
                  selectedColumn: this.properties.multiColumn,
                  listId: this.properties.lists.id,
                  disabled: false,
                  orderBy: PropertyFieldColumnPickerOrderBy.Title,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'multiColumnPickerFieldId',
                  displayHiddenColumns: false,
                  columnReturnProperty: IColumnReturnProperty.Title,
                  multiSelect: true,
                  renderFieldAs: IPropertyFieldRenderOption["Multiselect Dropdown"]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
