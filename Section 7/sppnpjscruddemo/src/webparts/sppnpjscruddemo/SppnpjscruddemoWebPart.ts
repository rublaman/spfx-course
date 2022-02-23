import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SppnpjscruddemoWebPart.module.scss';
import * as strings from 'SppnpjscruddemoWebPartStrings';

import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/fields";
import "@pnp/sp/comments";
import "@pnp/sp/views";
import "@pnp/sp/content-types";
import "@pnp/sp/site-groups";
import "@pnp/sp/site-users";
import "@pnp/sp/security";
import "@pnp/sp/folders";
import "@pnp/sp/folders/list";
import "@pnp/sp/folders/item";
import "@pnp/sp/attachments";
import { sp } from "@pnp/sp";

export interface ISppnpjscruddemoWebPartProps {
  description: string;
}

export interface IListSoftwareCatalog {
  Title: string;
  SoftwareName: string;
  SoftwareVendor: string;
  SoftwareVersion: string;
  SoftwareDescription: string;
}

export default class SppnpjscruddemoWebPart extends BaseClientSideWebPart<ISppnpjscruddemoWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div>
      <div>
        <table border='5' bgcolor='aqua'>
          <tr>
            <td>Please Enter Software ID </td>
            <td><input type='text' id='txtID' />
            <td><input type='submit' id='btnRead' value='Read Details' /></td>
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
              <input type='submit'  value='Show All Records' id='btnReadAll' />
            </td>
          </tr>
        </table>
      </div>
      <div id="divStatus"/>
      <h2>Get All List Items</h2>
      <hr/>
    <div id="spListData" />


    </div>`;

    this._bindEvents();
  }

  private _bindEvents(): void {
    this.domElement.querySelector('#btnSubmit').addEventListener('click', () => this.addListItem());
    this.domElement.querySelector('#btnRead').addEventListener('click', () => this.readListItem());
    this.domElement.querySelector('#btnUpdate').addEventListener('click', () => this.updateListItem());
  }

  private async addListItem(): Promise<void> {
    console.log("ENTRO");

    var softwareTitle = document.getElementById("txtSoftwareTitle")["value"];
    var softwareName = document.getElementById("txtSoftwareName")["value"];
    var softwareVersion = document.getElementById("txtSoftwareVersion")["value"];
    var softwareVendor = document.getElementById("ddlSoftwareVendor")["value"];
    var softwareDescription = document.getElementById("txtSoftwareDescription")["value"];

    sp.setup(this.context)

    try {
      await sp.web.lists.getById("62dec856-08bc-4eb2-9287-0363b352d865").items.add({
        Title: softwareTitle,
        SoftwareName: softwareName,
        SoftwareVendor: softwareVendor,
        SoftwareVersion: softwareVersion,
        SoftwareDescription: softwareDescription
      })
      alert("Elemento creado!")
    } catch (error) {
      console.log("ERROR >>>>>>>>>>", error);
    }
  }

  private async readListItem(): Promise<void> {
    const id = document.getElementById('txtID')['value'];

    sp.setup(this.context);

    const item: IListSoftwareCatalog = await sp.web.lists.getById('62dec856-08bc-4eb2-9287-0363b352d865').items.getById(id).get();
    console.log(item);
    console.log(item.SoftwareDescription);

    document.getElementById('txtSoftwareTitle')['value'] = item.Title;
    document.getElementById('txtSoftwareName')['value'] = item.SoftwareName;
    document.getElementById('txtSoftwareVersion')['value'] = item.SoftwareVersion;
    document.getElementById('ddlSoftwareVendor')['value'] = item.SoftwareVendor;
    document.getElementById('txtSoftwareDescription')['value'] = item.SoftwareDescription;
  }

  private async updateListItem(): Promise<void> {
    
    let id: number = document.getElementById('txtID')['value'];

    debugger

    let item: IListSoftwareCatalog = {
      Title: '',
      SoftwareName: '',
      SoftwareVendor: '',
      SoftwareVersion: '',
      SoftwareDescription: ''
    };
    
    item.Title = document.getElementById('txtSoftwareTitle')['value'];    
    item.SoftwareName = document.getElementById('txtSoftwareName')['value'];
    item.SoftwareVersion = document.getElementById('txtSoftwareVersion')['value'];
    item.SoftwareVendor = document.getElementById('ddlSoftwareVendor')['value'];
    item.SoftwareDescription= document.getElementById('txtSoftwareDescription')['value'];

    sp.setup(this.context);

    try {
      sp.web.lists.getById('62dec856-08bc-4eb2-9287-0363b352d865').items.getById(id).update(item);
    } catch (error) {
      console.log("ERROR >>>", error);
    }  
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
