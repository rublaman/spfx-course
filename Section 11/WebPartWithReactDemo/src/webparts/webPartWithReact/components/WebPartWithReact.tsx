import * as React from 'react';
import styles from './WebPartWithReact.module.scss';
import { IWebPartWithReactProps } from './IWebPartWithReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WebPartWithReact extends React.Component<IWebPartWithReactProps, {}> {
  public render(): React.ReactElement<IWebPartWithReactProps> {
    return (
      <div className={styles.webPartWithReact}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts with React.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>

              <p className={styles.description}>Absolute URL{escape(this.props.absoluteUrl)}</p>
              <p className={styles.description}>Title{escape(this.props.siteTitle)}</p>
              <p className={styles.description}>Relative URL{escape(this.props.relativeUrl)}</p>
              <p className={styles.description}>Username{escape(this.props.username)}</p>

              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
