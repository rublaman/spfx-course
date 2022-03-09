import * as React from "react";
import styles from "./CrudListsWp.module.scss";
import { ICrudListsWpProps } from "./ICrudListsWpProps";
import { ICrudListsState } from "./ICrudListsState";
import DetailList from "../../../components/DetailList";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class CrudListsWp extends React.Component<ICrudListsWpProps, ICrudListsState> {

  constructor(props: ICrudListsWpProps) {
    super(props);

    this.state = {
      showPlaceHolder: this.props.list === undefined,
    };    
  }

  private _onConfigure = () => {
    this.props.context.propertyPane.open();
  };
  

  public render(): React.ReactElement<ICrudListsWpProps> {
    console.log("Multicolumn>>>>>>>>>>>>>", this.props.multiColumn);
    
    return (
      <div>
        {this.props.list ? (
          <DetailList
            list={this.props.list}
            context={this.props.context}
          />
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
