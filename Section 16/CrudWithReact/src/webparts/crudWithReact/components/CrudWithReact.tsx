import * as React from 'react';
import styles from './CrudWithReact.module.scss';
import { ICrudWithReactProps } from './ICrudWithReactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICrudWithReactState } from './ICrudWithReactState';
import { ISoftwareListItem } from './ISoftwareListItem';

import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'
import { sp } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import { IItemAddResult } from "@pnp/sp/items";

import {
  TextField,
  autobind,
  PrimaryButton,
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode,
  Dropdown,
  IDropdown,
  IDropdownOption,
  ITextFieldStyles,
  IDropdownStyles,
  DetailsRowCheck,
  Selection,
  TooltipHost,
  IColumn
} from 'office-ui-fabric-react';


const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } }
const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } }
const narrowDropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } }

export default class CrudWithReact extends React.Component<ICrudWithReactProps, ICrudWithReactState> {

  private _columns: IColumn[];
  private _selection: Selection;

  public constructor(prop: ICrudWithReactProps) {
    super(prop);

    this.state = {
      status: 'Ready',
      softwareListItems: [],
      softwareListItem: {
        ID: 0,
        Title: "",
        softwareName: "",
        softwareVendor: "",
        softwareDescription: "Select an option",
        softwareVersion: ""
      }
    }


    this._selection = new Selection({
      onSelectionChanged: () => {
        if (this._selection.count === 1) {
          this.setState({ softwareListItem: this._selection.getSelection()[0] as ISoftwareListItem })
        } else {
          this.setState({
            softwareListItem: {
              ID: 0,
              Title: "",
              softwareName: "",
              softwareVendor: "",
              softwareDescription: "Select an option",
              softwareVersion: ""
            }
          })
        }
      }

    });

    this._columns = [
      { key: 'ID', name: 'ID', fieldName: 'ID', minWidth: 50, maxWidth: 100, isResizable: true },
      { key: 'Title', name: 'Title', fieldName: 'Title', minWidth: 50, maxWidth: 100, isResizable: true },
      { key: 'softwareName', name: 'softwareName', fieldName: 'softwareName', minWidth: 50, maxWidth: 100, isResizable: true },
      { key: 'softwareVendor', name: 'softwareVendor', fieldName: 'softwareVendor', minWidth: 50, maxWidth: 100, isResizable: true },
      { key: 'softwareVersion', name: 'softwareVersion', fieldName: 'softwareVersion', minWidth: 50, maxWidth: 100, isResizable: true },
      { key: 'softwareDescription', name: 'softwareDescription', fieldName: 'softwareDescription', minWidth: 50, maxWidth: 100, isResizable: true }
    ]
  }

  private async _getListItems(): Promise<ISoftwareListItem[]> {
    sp.setup(this.props.context);
    try {
      return sp.web.lists.getByTitle('MicrosoftSoftware').items.get();
    } catch (error) {
      console.log(error);
    }
  }

  public async bindDetailsList(message: string): Promise<void> {
    try {
      const listItems: ISoftwareListItem[] = await this._getListItems();
      this.setState({ softwareListItems: listItems, status: message })
    } catch (error) {
      console.log(error);
    }
  }

  public componentDidMount(): void {
    this.bindDetailsList("All Records have been loaded Successfully");
  }

  public async btnAdd_click(): Promise<void> {
    sp.setup(this.props.context);
    if (
      this.state.softwareListItem.Title !== "" ||
      this.state.softwareListItem.softwareDescription ||
      this.state.softwareListItem.softwareName ||
      this.state.softwareListItem.softwareVendor
    ) {
      try {
        await sp.web.lists.getByTitle('MicrosoftSoftware').items.add(this.state.softwareListItem);
        this.bindDetailsList('Item added successfully');
      } catch (error) {
        console.log('Error adding item to list: ', error);
      }
    } else {
      this.setState({ status: "You must fill in all fields" })
    }
  }

  public async btnUpdate_click(): Promise<void> {
    sp.setup(this.props.context);
    if (
      this.state.softwareListItem.ID !== 0
    ) {
      try {
        await sp.web.lists
          .getByTitle('MicrosoftSoftware').items
          .getById(this.state.softwareListItem.ID)
          .update(this.state.softwareListItem)

        this.bindDetailsList('Item updated successfully')
      } catch (error) {
        console.log('Error updating item to list: ', error);
      }
    } else {
      this.setState({ status: "The submitted ID cannot be 0" })
    }
  }

  public async btnDelete_click(): Promise<void> {
    sp.setup(this.props.context);
    try {
      await sp.web.lists
        .getByTitle('MicrosoftSoftware').items
        .getById(this.state.softwareListItem.ID)
        .delete()

      this.bindDetailsList('Item updated successfully')
    } catch (error) {
      console.log('Error updating item to list: ', error);
    }
  }

  public render(): React.ReactElement<ICrudWithReactProps> {

    const dropDownRef = React.createRef<IDropdown>();

    return (
      <div className={styles.crudWithReact}>
        {this.state.softwareListItem.ID !== undefined && (
          <>
            <TextField
              label='ID'
              required
              value={this.state.softwareListItem.ID as any as string}
              styles={textFieldStyles}
              onChanged={e => this.state.softwareListItem.ID = e}
            />
            <TextField
              label='Title'
              required
              value={this.state.softwareListItem.Title}
              styles={textFieldStyles}
              onChanged={e => this.state.softwareListItem.Title = e}
            />
            <TextField
              label='Software Name'
              required
              value={this.state.softwareListItem.softwareName}
              styles={textFieldStyles}
              onChanged={e => this.state.softwareListItem.softwareName = e}
            />
            <TextField
              label='Software Description'
              required
              value={this.state.softwareListItem.softwareDescription}
              styles={textFieldStyles}
              onChanged={e => this.state.softwareListItem.softwareDescription = e}
            />
            <TextField
              label='Software Version'
              required
              value={this.state.softwareListItem.softwareVersion}
              styles={textFieldStyles}
              onChanged={e => this.state.softwareListItem.softwareVersion = e}
            />
            <Dropdown
              componentRef={dropDownRef}
              placeholder="select an option"
              label='Software Vendor'
              options={[
                { key: 'Microsoft', text: 'Microsoft' },
                { key: 'Sun', text: 'Sun' },
                { key: 'Oracle', text: 'Oracle' },
                { key: 'Google', text: 'Google' }
              ]}
              defaultSelectedKey={this.state.softwareListItem.softwareVendor}
              required
              styles={narrowDropdownStyles}
              onChanged={e => this.state.softwareListItem.softwareVendor = e.text}
            />

            <p className={styles.title}>
              <PrimaryButton
                text='Add'
                title='Add'
                onClick={() => this.btnAdd_click()}
              />


              <PrimaryButton
                text='Update'
                onClick={() => this.btnUpdate_click()}
              />

              <PrimaryButton
                text='Delete'
                onClick={() => this.btnDelete_click()}
              />
            </p>

            <div id="divStatus">
              {this.state.status}
            </div>
            <div>
              <DetailsList
                items={this.state.softwareListItems}
                columns={this._columns}
                setKey='Id'
                checkboxVisibility={CheckboxVisibility.onHover}
                selectionMode={SelectionMode.single}
                layoutMode={DetailsListLayoutMode.fixedColumns}
                compact={true}
                selectionPreservedOnEmptyClick={true}
                selection={this._selection}
              />
            </div>
          </>)}
      </div >
    )
  }
}
