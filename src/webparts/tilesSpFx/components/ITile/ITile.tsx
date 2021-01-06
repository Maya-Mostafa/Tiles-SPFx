import * as React from 'react';
import styles from '../TilesSPFx.module.scss';
import {ITileProps} from './ITileProps';

import { initializeIcons } from '@uifabric/icons';
import {Icon} from '@fluentui/react/lib/Icon';

import {isFont} from '../../Services/Styling';
import Truncate from 'react-truncate';

export default function ITile (props: ITileProps) {
  
  initializeIcons();  

    return (
      <div className={styles.tile +' '+ props.BgColor+ styles.Bg}>
    
      {/* Tile */}
      <a href={props.Link} target={props.Target} data-interception="off">
        <div>
          <div className={styles.tileText} title={props.Title}>
            <Truncate lines={5} ellipsis={<span>...</span>}>
              {props.Title}
            </Truncate>
          </div>
          <div className={styles.tileIcon}>                
            {isFont(props.IconName)
              ? <Icon iconName={props.IconName} /> 
              : <img src={props.IconName} height="40px" />                 
            }
          </div>
        </div>
        {props.SubLinks != 'None' &&
          <div className={styles.tilesDpdIcon}></div>
        }
      </a>
      
      {/* Tile Edit/Delete Options */}
      {props.showEditControls &&
        <div className={styles.iconBtnCntnr}>
          <Icon iconName="Edit" className={styles.settingsTileIcon} 
            onClick={props.handleEdit({
              idField: props.Id, 
              titleField: props.Title, 
              linkField: props.Link, 
              colorField: props.BgColor, 
              iconField: props.IconName, 
              openNewWin: props.Target,
              dpdField: props.SubLinks })} />
          <Icon iconName="Delete" className={styles.deleteTileIcon} onClick={props.handleDelete(props.Id)}/>
        </div>
      }
    </div>
      
    );
}