import * as React from 'react';
import styles from '../TilesSPFx.module.scss';
import {ITileProps} from './ITileProps';

export default function ITile (props: ITileProps) {
    return (
      <div className={styles.tile +' '+ props.BgColor+ styles.Bg +' '+ props.FgColor+ styles.Fg }>
        <a id={props.Id} href={props.Link}>{props.Title}</a>
        {props.children}
      </div>
    );
}