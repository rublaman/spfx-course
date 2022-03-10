import * as React from 'react';
import ListService from '../../services/ListService';
import { IActionButtonsProps } from './IActionButtonsProps'
import { IActionButtonsState } from './IActionButtonsState';


export default class ActionButtons extends React.Component<IActionButtonsProps, IActionButtonsState> {

	private _listService: ListService;

	constructor(props: IActionButtonsProps) {
		super(props);

		// this._listService = new ListService(this.props.context);
	}

	render(): React.ReactElement<IActionButtonsProps> {
		return (
			<div>

			</div>
		)
	}
}