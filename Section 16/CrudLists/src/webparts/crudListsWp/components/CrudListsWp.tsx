import * as React from 'react';
import styles from './CrudListsWp.module.scss';
import { ICrudListsWpProps } from './ICrudListsWpProps';
import { ICrudListsState } from './ICrudListsState'
import ListService from '../../../services/ListService';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class CrudListsWp extends React.Component<ICrudListsWpProps, ICrudListsState> {

  private _listService: ListService;

  constructor(props: ICrudListsWpProps) {
    super(props)
    this._listService = new ListService(this.props.context);

    this.state = {
      showPlaceHolder: (this.props.list === undefined)
    }
  }

  public async componentDidMount(): Promise<void> {
    const elemento = await this._listService.getListItems("Lista 1");
    console.log(elemento);
  }

  public componentDidUpdate(prevProps: ICrudListsWpProps) {
    if (this.props.list !== prevProps.list) {
      if (this.props.list !== undefined) {
        this.setState({
          showPlaceHolder: false
        });
      } else {
        this.setState({
          showPlaceHolder: true
        });
      }
    }
  }

  private _onConfigure = () => {
    this.props.context.propertyPane.open();
  }

  public render(): React.ReactElement<ICrudListsWpProps> {
    console.log(this.props.list);
    console.log(this.state.showPlaceHolder);


    if (this.state.showPlaceHolder) {
      return (
        <Placeholder iconName='Edit'
          iconText='Configure your web part'
          description='Please configure the web part.'
          buttonLabel='Configure'
          onConfigure={this._onConfigure} />
      )
    } else {
      return (
        <div className={styles.crudListsWp}>
          <div>Hola</div>
        </div>
      );
    }
  }
}
