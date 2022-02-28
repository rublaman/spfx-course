import * as React from 'react';
import styles from './Reactlifecyclewp.module.scss';
import { IReactlifecyclewpProps } from './IReactlifecyclewpProps';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IReactlifecyclewpState {
  stateTitle: string;
}

export default class Reactlifecyclewp extends React.Component<IReactlifecyclewpProps, IReactlifecyclewpState> {

  public constructor(props: IReactlifecyclewpProps, state: IReactlifecyclewpState) {
    super(props);
    this.state = {
      stateTitle: 'component constructor has been called',
    }

    this.updateState = this.updateState.bind(this);

    console.log('State title from constructor: ', this.state.stateTitle);
  }

  public componentWillMount(): void {
    console.log('componentWillMount has been called');
  }

  public componentDidMount(): void {
      console.log('Stage title from componentDidMount:', this.state.stateTitle);
      this.setState({
        stateTitle: 'componentDidMount has been called'
      })
  }

  public updateState(): void {
    this.setState({
      stateTitle: 'changeState has been called'
    })
  }

  public render(): React.ReactElement<IReactlifecyclewpProps> {
    return (
      <div>
        <h1>ReactJS component's lifecycle</h1>
        <h3>{this.state.stateTitle}</h3>
        <button onClick={this.updateState}>click here to update the state data</button>
      </div>
    );
  }

  public componentWillUnmount(): void {
      console.log('Component will unmount has been called');
  }
}
