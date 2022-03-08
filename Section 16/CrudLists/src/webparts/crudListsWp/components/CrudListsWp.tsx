import * as React from "react";
import styles from "./CrudListsWp.module.scss";
import { ICrudListsWpProps } from "./ICrudListsWpProps";
import { ICrudListsState } from "./ICrudListsState";
import ListService from "../../../services/ListService";
import DetailList from "../../../components/DetailList";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class CrudListsWp extends React.Component<
  ICrudListsWpProps,
  ICrudListsState
> {
  private _listService: ListService;

  constructor(props: ICrudListsWpProps) {
    super(props);
    this._listService = new ListService(this.props.context);

    this.state = {
      showPlaceHolder: this.props.list === undefined,
    };
  }

  public async componentDidMount(): Promise<void> {
    // const elemento = await this._listService.getListItems("Lista 1");
    // console.log(elemento);
  }

  // public componentDidUpdate(prevProps: ICrudListsWpProps) {
  //   debugger
  //   if (this.props.list !== prevProps.list) {
  //     this.props.list !== undefined
  //       ? this.setState({ showPlaceHolder: false })
  //       : this.setState({ showPlaceHolder: true });
  //   }
  // }

  private _onConfigure = () => {
    this.props.context.propertyPane.open();
  };

  public render(): React.ReactElement<ICrudListsWpProps> {
    return (
      <div>
        {this.props.list ? (
          React.createElement(DetailList, { nameList: this.props.list.title })
        ) : (
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part."
            buttonLabel="Configure"
            onConfigure={this._onConfigure}
          />
        )}
      </div>
    );
  }
}
