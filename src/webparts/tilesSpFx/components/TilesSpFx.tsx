import * as React from 'react';
import styles from './TilesSPFx.module.scss';
import { ITilesSPFxProps } from './ITilesSPFxProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {Label, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton} from '@fluentui/react';
import {getTilesData, updateIcon} from '../Services/DataRequests';
import ITile from './ITile/ITile';
import ITileControls from './ITileControls/ITileControls';
import ITileForm from './ITileForm/ITileForm';

import {addTile, deleteTile, updateTile, getTile} from '../Services/DataRequests';

import { useBoolean } from '@uifabric/react-hooks';

export default function TilesSPFx (props: ITilesSPFxProps) {

    const [tilesData, setTilesData] = React.useState([]);
  
    const [formField, setFormField] = React.useState({
      titleField: "",
      linkField: "",
      colorField: {key: "", text: "", data: {icon: ""}},
      iconField : {key : "" , text:"", data: {icon: ""}},
      openNewWin: true,
      idField : ""
    });
    const onChangeFormField = React.useCallback(
      (event: any, newValue?: any) => {      
        setFormField({
          ...formField,
          [event.target.id]: typeof newValue === "boolean" ? !!newValue : newValue || ''
        });
      },
      [formField],
    );
    const resetFields = () =>{
      setFormField({
        titleField: "",
        linkField: "",
        colorField: {key: "", text: "", data: {icon: ""}},
        iconField : {key : "" , text:"", data: {icon: ""}},
        openNewWin: true,
        idField : ""
      });
    };
    
    const [isNewDialog, setIsNewDialog] = React.useState(true);
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    const handleToggleHideDialog = () => {
      resetFields();
      setIsNewDialog(true); 
      toggleHideDialog();
    };
    const dialogContentProps = {
      type: DialogType.close,
      title: isNewDialog ? "Add a new Tile" : "Update Tile"
    }; 

    const deleteDialogContentProps = {
      type: DialogType.close,
      title: "Delete Tile"
    }; 
    const [hideDeleteDialog, {toggle: toggleHideDeleteDialog}] = useBoolean(true);

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

    const handleIconSave = (itemId: any)=>{
      return (tIconName: string)=>{
        updateIcon(props.context, itemId, tIconName).then(()=>{
          getTilesData(props.context, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
      };
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
          Color: formField.colorField.text,
          Icon: formField.iconField.data.icon,
          OpenNewWin: formField.openNewWin
        };
        addTile(props.context, tileInfo).then(()=>{
          getTilesData(props.context, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
      }
    };

    const handleDelete = (itemId: any)=>{
      return () =>{
        setFormField({
          ...formField,
          idField : itemId
        });
        toggleHideDeleteDialog();
      };
    };
    const deleteTileItem = () =>{
      deleteTile(props.context, formField.idField).then(()=>{
        getTilesData(props.context, props.orderBy).then((results)=>{
          setTilesData(results);          
        });
      }).then(()=>{
        toggleHideDeleteDialog();
      });
    };

    const handleEdit = (itemId: any)=>{
      return ()=>{
        getTile(props.context, itemId).then((result :any)=>{
          setIsNewDialog(false);
          toggleHideDialog();
          setFormField({
            titleField: result.Title,
            linkField: result.Link,
            colorField : {key: result.Color.toLowerCase(), text: result.Color, data: {icon: "CircleFill"}},
            iconField: {key: result.IconName, text: result.IconName, data: {icon: result.IconName}},
            openNewWin: result.OpenNewWin,
            idField : result.Id
          });           
        });
      };
    };
    const updateTileItem = () =>{
      updateTile(props.context, formField.idField, {
        Title: formField.titleField,
        Link: formField.linkField,
        Color: formField.colorField.text,
        IconName: formField.iconField.data.icon,
        OpenInNewWindow: formField.openNewWin
      }).then(()=>{
        getTilesData(props.context, props.orderBy).then((results)=>{
          setTilesData(results);
          toggleHideDialog();
        });
      });
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
          toggleHideDialog={handleToggleHideDialog} 
          handleEditChange={handleEditChange} 
        />

        <Dialog
            hidden={hideDialog}
            onDismiss={toggleHideDialog} isBlocking={true}
            dialogContentProps={dialogContentProps}>
            <ITileForm 
              formField={formField} onChangeFormField={onChangeFormField}
              errorMsgTitle={errorMsgTitle} errorMsgLink={errorMsgLink}/>
            <DialogFooter>
                {isNewDialog 
                    ? <PrimaryButton onClick={addTileItem} text="Save" />
                    : <PrimaryButton onClick={updateTileItem} text="Update" />
                }
                <DefaultButton onClick={toggleHideDialog} text="Cancel" />
            </DialogFooter>
        </Dialog>

        <Dialog
            hidden={hideDeleteDialog}
            onDismiss={toggleHideDeleteDialog} isBlocking={true}
            dialogContentProps={deleteDialogContentProps}>
            <p>Are you sure you want to delete this tile? </p>
            <DialogFooter>
                <PrimaryButton onClick={deleteTileItem} text="Yes" />
                <DefaultButton onClick={toggleHideDeleteDialog} text="No" />
            </DialogFooter>
        </Dialog>

      </div>
    );
}
