import * as React from 'react';
import styles from '../TilesSPFx.module.scss';
import {ITileControlsProps} from './ITileControlsProps';

import {CommandBarButton, IIconProps, Toggle} from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';

import ITileForm from '../ITileForm/ITileForm';
import IDialog from '../IDialog/IDialog';
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

      <IDialog hideDialog={props.hideDialog} toggleHideDialog={props.toggleHideDialog} addTileItem={props.addTileItem}>
        <ITileForm formField={props.formField} colorField={props.colorField} iconField={props.iconField} openNewWin={props.openNewWin}
          onChangeFormField={props.onChangeFormField} onChangeOpenNewWin={props.onChangeOpenNewWin}
          onChangeColorField={props.onChangeColorField} onChangeIconField={props.onChangeIconField} 
          errorMsgTitle={props.errorMsgTitle} errorMsgLink={props.errorMsgLink}
        />
      </IDialog>

    </div>
  );
}
