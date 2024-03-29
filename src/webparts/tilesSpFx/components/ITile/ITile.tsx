import * as React from 'react';
import styles from '../TilesSPFx.module.scss';
import {ITileProps} from './ITileProps';

import { IconPicker } from '@pnp/spfx-controls-react/lib/IconPicker';
import { initializeIcons } from '@uifabric/icons';
import {Icon} from '@fluentui/react/lib/Icon';
import {Draggable} from 'react-beautiful-dnd';

export default function ITile (props: ITileProps) {
  
  initializeIcons();  

    return (

      //<Draggable draggableId={props.Id.toString()} index={props.index}>
        //{(provided)=>(
          <div className={styles.tile +' '+ props.BgColor+ styles.Bg}
            // ref={provided.innerRef}
            // {...provided.draggableProps}
            // {...provided.dragHandleProps}
          >
        
          {/* Tile */}
          <a href={props.Link} target={props.Target} data-interception="off">
            <div>
              <div className={styles.tileIcon}><Icon iconName={props.IconName} /></div>
              <div className={styles.tileText}>{props.Title}</div>
            </div>
          </a>
          
          {/* Tile Edit/Delete Options */}
          {props.showEditControls &&
            <div className={styles.iconBtnCntnr}>
              {/* <Icon iconName="Settings" className={styles.settingsTileIcon} />
              <IconPicker buttonClassName={styles.iconBtn} renderOption={'dialog'} onSave = {props.handleIconSave(props.Id)} /> */}
              <Icon iconName="Edit" className={styles.settingsTileIcon} 
                onClick={props.handleEdit({
                  idField: props.Id, 
                  titleField: props.Title, 
                  linkField: props.Link, 
                  colorField: props.BgColor, 
                  iconField: props.IconName, 
                  openNewWin: props.Target })} />
              <Icon iconName="Delete" className={styles.deleteTileIcon} onClick={props.handleDelete(props.Id)}/>
            </div>
          }
        </div>
        //)}
      //</Draggable>


      
    );
}