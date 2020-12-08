import * as React from 'react';
import styles from './TilesSPFx.module.scss';
import { ITilesSPFxProps } from './ITilesSPFxProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {Label} from '@fluentui/react';
import {getTilesData, updateIcon} from '../Services/DataRequests';
import ITile from './ITile/ITile';
import ITileControls from './ITileControls/ITileControls';

import {addTile, deleteTile, updateTile, getTile} from '../Services/DataRequests';

import { useBoolean } from '@uifabric/react-hooks';
import {IDropdownOption} from '@fluentui/react';

export default function TilesSPFx (props: ITilesSPFxProps) {

    const [tilesData, setTilesData] = React.useState([]);
  
    const [formField, setFormField] = React.useState({
      titleField: "",
      linkField: ""
    });
    const onChangeFormField = React.useCallback(
      (event: any, newValue?: string) => {      
        setFormField({
          ...formField,
          [event.target.name]: newValue || ''
        });
      },
      [formField],
    );
    
    const [colorField, setColorField] = React.useState<IDropdownOption>();
    const colorFieldBase = colorField;
    const onChangeColorField = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
      setColorField(item);
    };
  
    const [iconField, setIconField] = React.useState<IDropdownOption>();
    const iconFieldBase = iconField;
    const onChangeIconField = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
      setIconField(item);
    };
  
    const [openNewWin, { toggle: toggleOpenNewWin }] = useBoolean(true);
    const onChangeOpenNewWin = (ev: React.MouseEvent<HTMLElement>, checked: boolean) =>{
      toggleOpenNewWin();
    };

    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    const [errorMsgTitle, setErrorMsgTitle] = React.useState('');
    const [errorMsgLink, setErrorMsgLink] = React.useState('');
    
    const [showEditControls, {toggle: toggleEditControls}] = useBoolean(false);
    const handleEditChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) =>{
      toggleEditControls();
    };

    React.useEffect(()=>{
      getTilesData(props.context, props.orderBy).then((results)=>{
        setTilesData(results);
      });      
    },[tilesData.length]);

    const resetFields = () =>{
      setFormField({
        titleField:"",
        linkField: ""
      });
      setColorField(colorFieldBase);
      setIconField(iconFieldBase);
    };

    const addTileItem = () =>{      
      setErrorMsgTitle("");
      setErrorMsgLink("");
      if (formField.titleField == "" && formField.linkField == ""){
        setErrorMsgTitle("Field Required");
        setErrorMsgLink("Field Required");
      }
      else if (formField.titleField == ""){
        setErrorMsgTitle("Field Required");
      }
      else if (formField.linkField == ""){
        setErrorMsgLink("Field Required");
      }
      else{
        setErrorMsgTitle("");
        setErrorMsgLink("");
        toggleHideDialog();
        const tileInfo : any = {
          Title: formField.titleField,
          Link: formField.linkField,
          Color: colorField ? colorField.text : "Blue",
          Icon: iconField ? iconField.data.icon : "",
          OpenNewWin: openNewWin
        };
        addTile(props.context, tileInfo).then(()=>{
          getTilesData(props.context, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
      }
    };

    const openDialog = () => {
      //resetFields();
      toggleHideDialog();
    };

    const handleIconSave = (itemId: any)=>{
      return (tIconName: string)=>{
        updateIcon(props.context, itemId, tIconName).then(()=>{
          getTilesData(props.context, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
      };
    };

    const handleDelete = (itemId: any)=>{
      return ()=>{
        deleteTile(props.context, itemId).then(()=>{
          getTilesData(props.context, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
      };
    };

    const handleEdit = (itemId: any)=>{
      return ()=>{
        getTile(props.context, itemId).then((result :any)=>{
          toggleHideDialog();
          setFormField({
            titleField: result.Title,
            linkField: result.Link
          });           
          setColorField({key: result.Color.toLowerCase(), text: result.Color, data: {icon: "CircleFill"}});
          setIconField({key: result.IconName, text: result.IconName, data: {icon: result.IconName}});
          console.log("colorField", colorField);
          console.log("iconField", iconField);
        });
      };
    };

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
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  showEditControls={showEditControls}
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
          addTileItem = {addTileItem} errorMsgTitle={errorMsgTitle} errorMsgLink={errorMsgLink}
          handleEditChange={handleEditChange} 
        />

      </div>
    );
}
