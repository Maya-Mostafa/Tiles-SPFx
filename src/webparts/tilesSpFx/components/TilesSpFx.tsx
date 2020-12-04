import * as React from 'react';
import styles from './TilesSPFx.module.scss';
import { ITilesSPFxProps } from './ITilesSPFxProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {Label} from '@fluentui/react';
import {getTilesData, updateIcon} from '../Services/DataRequests';
import ITile from './ITile/ITile';
import ITileControls from './ITileControls/ITileControls';

import {addTile} from '../Services/DataRequests';

import { useBoolean } from '@uifabric/react-hooks';
import {IDropdownOption} from '@fluentui/react';

export default function TilesSPFx (props: ITilesSPFxProps) {

    const [tilesData, setTilesData] = React.useState([]);

    React.useEffect(()=>{
      getTilesData(props.context, props.orderBy).then((results)=>{
        setTilesData(results);
      });
    },[tilesData.length]);

    const handleIconSave = (itemId: any)=>{
      return (tIconName: string)=>{
        updateIcon(props.context, itemId, tIconName).then(()=>{
          getTilesData(props.context, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
      };
    };

    const [formField, setFormField] = React.useState({
      titleField: "",
      linkField: ""
    });
    const onChangeFormField = React.useCallback(
      (event: any, newValue?: string) => {      
        setFormField({
          ...formField,
          [event.target.name]: newValue || ''
        })
      },
      [formField],
    );
    
    const [colorField, setColorField] = React.useState<IDropdownOption>();
    const onChangeColorField = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
      setColorField(item);
    };
  
    const [iconField, setIconField] = React.useState<IDropdownOption>();
    const onChangeIconField = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
      setIconField(item);
    };
  
    const [openNewWin, { toggle: toggleOpenNewWin }] = useBoolean(true);
    const onChangeOpenNewWin = (ev: React.MouseEvent<HTMLElement>, checked: boolean) =>{
      toggleOpenNewWin();
    };

    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    
    const addTileItem = () =>{
      toggleHideDialog();
      const tileInfo : any = {
        Title: formField.titleField,
        Link: formField.linkField,
        Color: colorField.text,
        Icon: iconField.data.icon,
        OpenNewWin: openNewWin
      }
      addTile(props.context, tileInfo).then(()=>{
        getTilesData(props.context, props.orderBy).then((results)=>{
          setTilesData(results);
        });
      });
    }


    return (
      <div className={styles.tilesSPFx}>
       
        <div className={styles.tilesCntnr}>
          <Label>{escape(props.description)}</Label>
          {tilesData.map((value:any)=>{
            return(
              <>
              <ITile key={value.Id}
                  BgColor={value.BgColor} 
                  Id={value.Id}
                  Link={value.Link}
                  Title={value.Title}
                  IconName={value.IconName}
                  Target={value.Target}
                  handleIconSave={handleIconSave}
                  />              
              </>
            );
          })}
        </div>

        <ITileControls context={props.context} 
          formField = {formField} onChangeFormField={onChangeFormField}
          colorField = {colorField} onChangeColorField = {onChangeColorField}
          iconField = {iconField} onChangeIconField={onChangeIconField}
          openNewWin= {openNewWin} onChangeOpenNewWin={onChangeOpenNewWin}
          hideDialog = {hideDialog} toggleHideDialog={toggleHideDialog}
          addTileItem = {addTileItem}
        />

      </div>
    );
}
