import * as React from 'react';
import styles from './RShowListItems.module.scss';
import { IRShowListItemsProps } from './IRShowListItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import * as jquery from 'jquery';

export interface IRShowListItemsWPState {
  listItems: [
    {
      "Title": "",
      "ID": "",
      "softwareName": ""
    }
  ]
}

export default class RShowListItems extends React.Component<IRShowListItemsProps, IRShowListItemsWPState> {

  static siteUrl: string = "";
  public constructor(props: IRShowListItemsProps) {
    super(props)
    this.state = {
      listItems: [
        {
          "Title": "",
          "ID": "",
          "softwareName": ""
        }
      ]
    }
    RShowListItems.siteUrl = this.props.websiteUrl;
  }

  public componentDidMount(): void {

    let reactContextHandler = this;

    jquery.ajax({
      url: `${RShowListItems.siteUrl}/_api/web/lists/getByTitle('MicrosoftSoftware')/items`,
      type: 'GET',
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
        reactContextHandler.setState({
          listItems: resultData.d.results
        })
      },
      error: function (jqXHR, textStatus, errorTrown) { }
    })
  }

  public render(): React.ReactElement<IRShowListItemsProps> {
    return (
      <div className={styles.rShowListItems}>
        <table className={styles.row}>
          {this.state.listItems.map((listItem, listItemKey) => {
            let fullUrl: string = `${RShowListItems.siteUrl}/lists/MicrosoftSoftware/DispForm.aspx?ID=${listItem.ID}`;
            return (
              <tr>
                <td>
                  <a className={styles.label} href={fullUrl}>{listItem.Title}</a>
                </td>
                <td>
                  <a className={styles.label}>{listItem.ID}</a>
                </td>
                <td>
                  <a className={styles.label}>{listItem.softwareName}</a>
                </td>
              </tr>
            )
          })}
        </table>
        <ol>
        {this.state.listItems.map((listItem, listItemKey) => {
            let fullUrl: string = `${RShowListItems.siteUrl}/lists/MicrosoftSoftware/DispForm.aspx?ID=${listItem.ID}`;
            return (
              <li>
                <a className={styles.label} href={fullUrl}>
                  <span>
                    {listItem.Title}
                  </span>
                  <span>
                    {listItem.ID}
                  </span>
                  <span>
                    {listItem.softwareName}
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    );
  }
}
