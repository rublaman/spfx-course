import { DefaultButton } from 'office-ui-fabric-react';
import * as React from 'react';
import ListService from '../../services/ListService';
import { IActionButtonsProps } from './IActionButtonsProps'
import { IActionButtonsState } from './IActionButtonsState';


export default class ActionButtons extends React.Component<IActionButtonsProps, IActionButtonsState> {

	private _listService: ListService;

	constructor(props: IActionButtonsProps) {
		super(props);

		this._listService = new ListService(this.props.context);
	}

	public async deleteItem(): Promise<void> {
		await this._listService.removeListItem(this.props.listName, this.props.itemId);
		this.props.bindList()
	}


	render(): React.ReactElement<IActionButtonsProps> {
		return (
			<div>
				<DefaultButton
					text='Eliminar'
					onClick={()=> this.deleteItem()}
					allowDisabledFocus
					disabled={this.props.disabled}
				/>
			</div>
		)
	}
}