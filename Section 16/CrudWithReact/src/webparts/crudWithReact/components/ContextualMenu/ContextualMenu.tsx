import * as React from 'react';
import { Layer, IconButton, IButtonProps } from 'office-ui-fabric-react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

import { IContextualMenuProps } from './IContextualMenuProps';
import { IContextualMenuState } from './IContextualMenuState';

export class ContextualMenu extends React.Component<IContextualMenuProps, IContextualMenuState> {

  public constructor(props: IContextualMenuProps) {
    super(props);

    this.state = {
      panelOpen: true
    }
  }

  public render(): React.ReactElement<IContextualMenuProps> {
    return (
      <div>
        <IconButton id='ContextualMenuButton1'
          text=''
          width='30'
          split={false}
          iconProps={{ iconName: 'MoreVertical' }}
          menuIconProps={{ iconName: '' }}
          menuProps={{
            shouldFocusOnMount: true,
            items: [
              {
                key: 'action1',
                name: 'Action 1',
                onClick: this.handleClick.bind(' Action 1')
              },
              {
                key: 'divider_1',
                itemType: ContextualMenuItemType.Divider
              },
              {
                key: 'action2',
                name: 'Action 2',
                onClick: this.handleClick.bind(' Action 2')
              },
              {
                key: 'action3',
                name: 'Action 3',
                onClick: this.handleClick.bind(' Action  3')
              },
              {
                key: 'disabled',
                name: 'Disabled action',
                disabled: true,
                onClick: () => console.error('Disabled action should not be clickable.')
              }
            ]
          }} />
      </div>
    );
  }

  private handleClick(source:string, event) {
    alert(`${source} clicked`);
  }
}


