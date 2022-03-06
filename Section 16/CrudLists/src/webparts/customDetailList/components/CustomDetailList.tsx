import * as React from 'react';
import styles from './CustomDetailList.module.scss';
import { ICustomDetailListProps } from './ICustomDetailListProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CustomDetailList extends React.Component<ICustomDetailListProps, {}> {
  public render(): React.ReactElement<ICustomDetailListProps> {
    return (
      <div className={ styles.customDetailList }>

      </div>
    );
  }
}
