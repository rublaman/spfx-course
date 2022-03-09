import { DetailsList, DetailsListLayoutMode, IColumn, Selection, SelectionMode } from 'office-ui-fabric-react';
import * as React from 'react';
import ListService from '../services/ListService';
import { IDetailListProps } from './IDetailListProps';
import { IDetailListState } from './IDetailListState';

export default class DetailList extends React.Component<IDetailListProps, IDetailListState> {

  private _listService: ListService;
  private _selection: Selection;
  private _columns: IColumn[];

  constructor(props: IDetailListProps) {
    super(props);

    this.state = ({
      listItems: [],
      seletedItem: {}
    })

    this._columns = [
      { key: 'column1', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'Value', fieldName: 'Description', minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    this._selection = new Selection({ 
      onSelectionChanged: () => console.log("_selection>>>>", this._selection.getSelection()[0])
    })

    this._listService = new ListService(this.props.context);
  }

  public componentDidMount(): void {
    this.bindDetailsList();
  }

  public componentDidUpdate(prevProps: IDetailListProps) {
    if (this.props.list !== prevProps.list) this.bindDetailsList();
  }

  public async bindDetailsList(): Promise<void> {
    try {
      const listItems: any[] = await this._listService.getListItems(this.props.list.title);
      this._selection.setAllSelected(false);
      this.setState({ listItems: listItems });  // reset selected items
    } catch (error) {
      console.log(error);
    }
  }

  public render(): React.ReactElement<IDetailListProps> {
    return (
      <div>
        <DetailsList
          items={this.state.listItems}
          columns={this._columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selection={this._selection}
          selectionMode={SelectionMode.single}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
        />
      </div>
    );
  }
}