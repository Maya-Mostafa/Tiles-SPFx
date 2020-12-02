import * as React from 'react';
import styles from '../TilesSPFx.module.scss';
import {ITileProps} from './ITileProps';
import {updateIcon} from '../../Services/DataRequests';

import { IconPicker } from '@pnp/spfx-controls-react/lib/IconPicker';

import { initializeIcons } from '@uifabric/icons';
import {Icon} from '@fluentui/react/lib/Icon';

export default function ITile (props: ITileProps) {
  
  initializeIcons();

    return (
      <div className={styles.tile +' '+ props.BgColor+ styles.Bg +' ' }>
        <a href={props.Link}>{props.Title}</a>
        <Icon iconName={props.IconName} />
        {props.children}

        <div className={styles.iconBtnCntnr}>
        <IconPicker buttonClassName={styles.iconBtn} renderOption={'dialog'}
          //onChange={(iconName: string) => { setIconName(iconName); }}
          onSave = {props.handleIconSave(props.Id)} />
        </div>
      </div>
    );
}