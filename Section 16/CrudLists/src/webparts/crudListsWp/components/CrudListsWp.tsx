import * as React from 'react';
import styles from './CrudListsWp.module.scss';
import { ICrudListsWpProps } from './ICrudListsWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CrudListsWp extends React.Component<ICrudListsWpProps, {}> {
  public render(): React.ReactElement<ICrudListsWpProps> {
    return (
      <div className={ styles.crudListsWp }>
      </div>
    );
  }
}
