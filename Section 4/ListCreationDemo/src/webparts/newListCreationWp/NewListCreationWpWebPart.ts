import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http'

import styles from './NewListCreationWpWebPart.module.scss';
import * as strings from 'NewListCreationWpWebPartStrings';

export interface INewListCreationWpWebPartProps {
  description: string;
}

export default class NewListCreationWpWebPart extends BaseClientSideWebPart<INewListCreationWpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.newListCreationWp}">

        <h3>Creating a new list dinamically</h3><br/><br/>
        
        <p>Please fill out the below details to create a new list programatically</p><br/><br/>

        New List Name: <br/><input type='text' id='txtNewListName'/><br/><br/>

        New List Description: <br/><input type='text' id='txtNewListDescription'/><br/><br/>

        <input type='button' id='btnCreateNewList' value='Create a new List'/><br/>

      </div>`;

    this.bindEvents();
  }

  private bindEvents(): void {
    this.domElement
      .querySelector('#btnCreateNewList')
      .addEventListener('click', () => { this.createNewList(); })
  }

  private createNewList(): void{

    let newListName = document.getElementById('txtNewListName')['value'];
    let txtNewListDescription = document.getElementById('txtNewListDescription')['value'];

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
