import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CruddemoWebPart.module.scss';
import * as strings from 'CruddemoWebPartStrings';

export interface ICruddemoWebPartProps {
  description: string;
}

export default class CruddemoWebPart extends BaseClientSideWebPart <ICruddemoWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.cruddemo }">
      </div>`;
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
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              })
            ]
          }
        ]
      }
    ]
  };
}
}
