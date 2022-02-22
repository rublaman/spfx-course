import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions
} from '@microsoft/sp-http';

import styles from './CruddemoWebPart.module.scss';
import * as strings from 'CruddemoWebPartStrings';
import { ISoftwareListItem } from './ISoftwareListItem';

export interface ICruddemoWebPartProps {
  description: string;
}

export default class CruddemoWebPart extends BaseClientSideWebPart<ICruddemoWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.cruddemo}">
        <div>
          <table border='5' bgcolor='aqua'>

            <tr>
              <td>Please Enter Software ID </td>
              <td><input type='text' id='txtID' />
              <td><input type='submit' id='btnRead' value='Read Details' />
              </td>
            </tr>
        
            <tr>
              <td>Software Title</td>
              <td><input type='text' id='txtSoftwareTitle' />
            </tr>
            
            <tr>
              <td>Software Name</td>
              <td><input type='text' id='txtSoftwareName' />
            </tr>
      
            <tr>
              <td>Software Vendor</td>
              <td>
                <select id="ddlSoftwareVendor">
                  <option value="Microsoft">Microsoft</option>
                  <option value="Sun">Sun</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Google">Google</option>
                </select>  
              </td>
            </tr>
        
            <tr>
              <td>Software Version</td>
              <td><input type='text' id='txtSoftwareVersion' />
            </tr>
      
            <tr>
              <td>Software Description</td>
              <td><textarea rows='5' cols='40' id='txtSoftwareDescription'> </textarea> </td>
            </tr>
      
            <tr>
              <td colspan='2' align='center'>
                <input type='submit'  value='Insert Item' id='btnSubmit' />
                <input type='submit'  value='Update' id='btnUpdate' />
                <input type='submit'  value='Delete' id='btnDelete' />      
              </td>
            </tr>

          </table>
        </div>
        <div id="divStatus"/>
      </div>`;

    this._bindEvents();
  }

  private _bindEvents(): void {
    this.domElement.querySelector('#btnSubmit').addEventListener('click', () => this.addListItem());
    this.domElement.querySelector('#btnRead').addEventListener('click', () => this.readListItem());
    this.domElement.querySelector('#btnUpdate').addEventListener('click', () => this.updateListItem());
  }

  private updateListItem(): void {
    let softwareTitle = document.getElementById('txtSoftwareTitle')['value'];
    let softwareName = document.getElementById('txtSoftwareName')['value'];
    let softwareVersion = document.getElementById('txtSoftwareVersion')['value'];
    let softwareVendor = document.getElementById('ddlSoftwareVendor')['value'];
    let softwareDescription = document.getElementById('txtSoftwareDescription')['value'];
    let id: string = document.getElementById('txtID')['value'];

    const url = this.context.pageContext.site.absoluteUrl + "/_api/web/lists/getbytitle('SoftwareCatalog')/items(" + id + ")";
    const itemBody: any = {
      "Title": softwareTitle,
      "SoftwareVendor": softwareVendor,
      "SoftwareDescription": softwareDescription,
      "SoftwareName": softwareName,
      "SoftwareVersion": softwareVersion
    }

    const headers: any = {
      "X-HTTP-Method": "MERGE",
      "IF-MATCH": "*",
    }

    const spHtpClientOptions: ISPHttpClientOptions = {
      "headers": headers,
      "body": JSON.stringify(itemBody)
    };

    let msg: Element = this.domElement.querySelector('#divStatus');
    this.context.spHttpClient.post(url, SPHttpClient.configurations.v1, spHtpClientOptions)
      .then(res => {
        if (res.status === 204) {
          msg.innerHTML = "List item has been updated successfully";
        } else {
          msg.innerHTML = "List item has been updation failed. " + res.status + " - " + res.statusText;
        }
      })

  }

  private readListItem(): void {
    this.domElement.querySelector('#divStatus').innerHTML = '';
    let id: string = document.getElementById("txtID")["value"];

    this._getListItemById(id).then(listItem => {
      document.getElementById('txtSoftwareTitle')['value'] = listItem.Title;
      document.getElementById('txtSoftwareName')['value'] = listItem.SoftwareName;
      document.getElementById('txtSoftwareVersion')['value'] = listItem.SoftwareVersion;
      document.getElementById('ddlSoftwareVendor')['value'] = listItem.SoftwareVendor;
      document.getElementById('txtSoftwareDescription')['value'] = listItem.SoftwareDescription;
    }).catch(e => {
      this.clear();
      let msg: Element = this.domElement.querySelector('#divStatus');
      msg.innerHTML = 'Read: Could not fetch details ...' + e.message;
    })
  }

  private _getListItemById(id: string): Promise<ISoftwareListItem> {
    const url: string = this.context.pageContext.site.absoluteUrl + "/_api/web/lists/getbytitle('SoftwareCatalog')/items?$filter=Id eq " + id;
    console.log(url);

    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then(res => res.json())
      .then(listItems => {
        const untypedItem: any = listItems.value[0];
        const listItem: ISoftwareListItem = untypedItem as ISoftwareListItem;
        return listItem;
      }) as Promise<ISoftwareListItem>
  }

  private addListItem(): void {
    let softwareTitle = document.getElementById('txtSoftwareTitle')['value'];
    let softwareName = document.getElementById('txtSoftwareName')['value'];
    let softwareVersion = document.getElementById('txtSoftwareVersion')['value'];
    let softwareVendor = document.getElementById('ddlSoftwareVendor')['value'];
    let softwareDescription = document.getElementById('txtSoftwareDescription')['value'];

    const url = this.context.pageContext.site.absoluteUrl + "/_api/web/lists/getbytitle('SoftwareCatalog')/items";
    const itemBody: any = {
      "Title": softwareTitle,
      "SoftwareVendor": softwareVendor,
      "SoftwareDescription": softwareDescription,
      "SoftwareName": softwareName,
      "SoftwareVersion": softwareVersion
    }

    const spHtpClientOptions: ISPHttpClientOptions = {
      "body": JSON.stringify(itemBody)
    };

    let msg: Element = this.domElement.querySelector('#divStatus');
    this.context.spHttpClient
      .post(url, SPHttpClient.configurations.v1, spHtpClientOptions)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 201) {
          msg.innerHTML = "List item has been created successfully."
          this.clear();
        } else {
          msg.innerHTML = "List item has ocurred i.e. " + response.status + " -" + response.statusText;
        }
      })
  }

  private clear(): void {
    document.getElementById('txtSoftwareTitle')['value'] = '';
    document.getElementById('txtSoftwareName')['value'] = 'Microsoft';
    document.getElementById('txtSoftwareVersion')['value'] = '';
    document.getElementById('ddlSoftwareVendor')['value'] = '';
    document.getElementById('txtSoftwareDescription')['value'] = '';
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
