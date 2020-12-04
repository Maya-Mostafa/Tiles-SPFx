import * as React from 'react';
import styles from '../TilesSPFx.module.scss';
import {ITileProps} from './ITileProps';

import { IconPicker } from '@pnp/spfx-controls-react/lib/IconPicker';
import { initializeIcons } from '@uifabric/icons';
import {Icon} from '@fluentui/react/lib/Icon';

export default function ITile (props: ITileProps) {
  
  initializeIcons();

    return (
      <div className={styles.tile +' '+ props.BgColor+ styles.Bg}>
        
        <a href={props.Link} target={props.Target} data-interception="off">
          <div>
            <div className={styles.tileIcon}><Icon iconName={props.IconName} /></div>
            <div className={styles.tileText}>{props.Title}</div>
          </div>
        </a>
        
        <div className={styles.iconBtnCntnr}>
          <Icon iconName="Settings" className={styles.settingsTileIcon} />
          <IconPicker buttonClassName={styles.iconBtn} renderOption={'dialog'}
            //onChange={(iconName: string) => { setIconName(iconName); }}
            onSave = {props.handleIconSave(props.Id)} />
          
          <Icon iconName="Delete" className={styles.deleteTileIcon} onClick={props.handleDelete(props.Id)}/>
        </div>

      </div>
    );
}