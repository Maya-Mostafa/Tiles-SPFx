import * as React from 'react';
import styles from './TilesSPFx.module.scss';
import { ITilesSPFxProps } from './ITilesSPFxProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {Label, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton} from '@fluentui/react';
import {getTilesData, updateIcon} from '../Services/DataRequests';
import ITile from './ITile/ITile';
import ITileControls from './ITileControls/ITileControls';
import ITileForm from './ITileForm/ITileForm';

import {addTile, deleteTile, updateTile} from '../Services/DataRequests';

import { useBoolean } from '@uifabric/react-hooks';

import {DragDropContext, Droppable} from 'react-beautiful-dnd';

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
        let formFieldVar : string = event.target.id == "" || event.target.id == "iconField-input" ? "iconField" : event.target.id;
        setFormField({
          ...formField,
          [formFieldVar]: typeof newValue === "boolean" ? !!newValue : newValue || ''
        });
      },
      [formField],
    );
    const [errorMsgField , setErrorMsgField] = React.useState({
      titleField: "",
      linkField: ""
    });
    const resetFields = () =>{
      setFormField({
        titleField: "",
        linkField: "",
        colorField: {key: "", text: "", data: {icon: ""}},
        iconField : {key : "" , text:"", data: {icon: ""}},
        openNewWin: true,
        idField : ""
      });
      setErrorMsgField({titleField:"", linkField:""});
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
    
    const [showEditControls, {toggle: toggleEditControls}] = useBoolean(false);
    const handleEditChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) =>{
      toggleEditControls();
    };

    React.useEffect(()=>{
      getTilesData(props.context, props.tilesList, props.orderBy).then((results)=>{
        setTilesData(results);
      });      
    },[tilesData.length]);

    const handleIconSave = (itemId: any)=>{
      return (tIconName: string)=>{
        updateIcon(props.context, props.tilesList, itemId, tIconName).then(()=>{
          getTilesData(props.context, props.tilesList, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
      };
    };
    const handleError = (callback:any) =>{
      if (formField.titleField == "" && formField.linkField == ""){
        setErrorMsgField({titleField:"Title Field Required", linkField:"Link Field Required"});
      }
      else if (formField.titleField == ""){
        setErrorMsgField({titleField:"Title Field Required", linkField:""});
      }
      else if (formField.linkField == ""){
        setErrorMsgField({titleField:"", linkField:"Link Field Required"});
      }
      else{
        setErrorMsgField({titleField:"", linkField:""});
        callback();
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
    const handleEdit = (tileInfo : any)=>{
      return ()=>{
          setIsNewDialog(false);
          toggleHideDialog();
          setFormField({
            titleField: tileInfo.titleField,
            linkField: tileInfo.linkField,
            colorField : {key: tileInfo.colorField.toLowerCase(), text: tileInfo.colorField, data: {icon: "CircleFill"}},
            iconField: {key: tileInfo.iconField, text: tileInfo.iconField, data: {icon: tileInfo.iconField}},
            openNewWin: tileInfo.openNewWin,
            idField : tileInfo.idField
          });           
      };
    };

    const addTileItem = () =>{         
      handleError(()=>{
        const tileInfo : any = {
          Title: formField.titleField,
          Link: formField.linkField,
          Color: formField.colorField.text,
          Icon: formField.iconField.data.icon,
          OpenNewWin: formField.openNewWin
        };
        addTile(props.context, props.tilesList, tileInfo).then(()=>{
          getTilesData(props.context, props.tilesList, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
        toggleHideDialog();
      });
    };
    const deleteTileItem = () =>{
      deleteTile(props.context, props.tilesList, formField.idField).then(()=>{
        getTilesData(props.context, props.tilesList, props.orderBy).then((results)=>{
          setTilesData(results);          
        });
      });
      toggleHideDeleteDialog();
    };
    const updateTileItem = () =>{
      handleError(()=>{
        updateTile(props.context, props.tilesList, formField.idField, {
          Title: formField.titleField,
          Link: formField.linkField,
          Color: formField.colorField.text,
          // IconName: formField.iconField.data.icon,
          IconName: formField.iconField.text,
          OpenInNewWindow: formField.openNewWin
        }).then(()=>{
          getTilesData(props.context, props.tilesList, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
        toggleHideDialog();
      });
    };

    const onDragEnd = () =>{

    };

    return (
      <div className={styles.tilesSPFx}>
        <Label className={styles.wpTitle}>{escape(props.title)}</Label>
        
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.tilesCntnr}>


          <Droppable droppableId="pgTiles">
            {(provided)=>(
              <div ref={provided.innerRef}                
                {...provided.droppableProps}
              >

                {tilesData.map((value:any, index)=>{
                  return(
                    <>
                    <ITile key={value.Id} index={index}
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

                {provided.placeholder}
              </div>
            )}
            
          </Droppable>

          </div>
        </DragDropContext>

        <ITileControls
          toggleHideDialog={handleToggleHideDialog} 
          handleEditChange={handleEditChange} 
        />

        <Dialog
            hidden={hideDialog}
            onDismiss={toggleHideDialog} isBlocking={true}
            dialogContentProps={dialogContentProps}>
            <ITileForm 
              formField={formField} onChangeFormField={onChangeFormField}
              errorMsgField={errorMsgField}/>
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
