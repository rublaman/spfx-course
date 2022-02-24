import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TestmynewcustomlibrarydemoWebPart.module.scss';
import * as strings from 'TestmynewcustomlibrarydemoWebPartStrings';

import * as myLibrary from 'mynewcustomlibrary';

export interface ITestmynewcustomlibrarydemoWebPartProps {
  description: string;
}

export default class TestmynewcustomlibrarydemoWebPart extends BaseClientSideWebPart <ITestmynewcustomlibrarydemoWebPartProps> {

  public render(): void {

    const myInstance = new myLibrary.MynewcustomlibrarydemoLibrary();

    this.domElement.innerHTML = `
      <div class="${ styles.testmynewcustomlibrarydemo }">
        <p>Calling library function</p>
        <p>${myInstance.getCurrentTime()}</p>
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
