import * as React from 'react';
import styles from '../TilesSPFx.module.scss';
import {ITileControlsProps} from './ITileControlsProps';

import {CommandBarButton, IIconProps, Toggle} from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';

import {isUserManage} from '../../Services/DataRequests';

export default function ITileControls (props: ITileControlsProps) {
  
  initializeIcons();
  const addIcon: IIconProps = { iconName: 'CalculatorAddition' };

  return (
    <div className={styles.tileControls}>
      <CommandBarButton iconProps={addIcon} text="Add Tile" onClick={props.toggleHideDialog} />
      {isUserManage(props.context) &&
        <Toggle className={styles.tilesEditToggle} label="Edit Tiles" inlineLabel onChange={props.handleEditChange} />
      }
    </div>
  );
}
