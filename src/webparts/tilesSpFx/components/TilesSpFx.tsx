import * as React from 'react';
import styles from './TilesSPFx.module.scss';
import { ITilesSPFxProps } from './ITilesSPFxProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {Label, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, Panel, IChoiceGroupOption} from '@fluentui/react';
import {getTilesData, updateIcon} from '../Services/DataRequests';
import {isFont} from '../Services/Styling';
import ITile from './ITile/ITile';
import ITileControls from './ITileControls/ITileControls';
import ITileForm from './ITileForm/ITileForm';

import { IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';

import {addTile, deleteTile, updateTile} from '../Services/DataRequests';

import { useBoolean } from '@uifabric/react-hooks';

import {DragDropContext, Droppable} from 'react-beautiful-dnd';

export default function TilesSPFx (props: ITilesSPFxProps) {

    const [tilesData, setTilesData] = React.useState([]);

    const [selectedIconKey, setSelectedIconKey] = React.useState<string>('Icon');
    const onRadioChange = React.useCallback((ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setSelectedIconKey(option.key);
    }, []);
    const [selectedIcon, setSelectedIcon] = React.useState({font: 'globe', img: null});
    // const [selectedIcon, setSelectedIcon] = React.useState({auto: IconType.font, font: null, img: null});
  
    const [formField, setFormField] = React.useState({
      titleField: "",
      linkField: "",
      colorField: {key: "", text: "", data: {icon: ""}},
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
    const [errorMsgField , setErrorMsgField] = React.useState({
      titleField: "",
      linkField: ""
    });
    const resetFields = () =>{
      setFormField({
        titleField: "",
        linkField: "",
        colorField: {key: "", text: "", data: {icon: ""}},
        openNewWin: true,
        idField : ""
      });
      setSelectedIconKey('Icon');
      setSelectedIcon({font: 'globe', img: null});
      setErrorMsgField({titleField:"", linkField:""});
    };
    
    const [isNewForm, setIsNewForm] = React.useState(true);
    const [isOpenPanel, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const handleToggleHideDialog = () => {
      resetFields();
      setIsNewForm(true); 
      openPanel();
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
          setIsNewForm(false);
          openPanel();
          setFormField({
            titleField: tileInfo.titleField,
            linkField: tileInfo.linkField,
            colorField : {key: tileInfo.colorField.toLowerCase(), text: tileInfo.colorField, data: {icon: "CircleFill"}},
            openNewWin: tileInfo.openNewWin,
            idField : tileInfo.idField
          });   
          if (isFont(tileInfo.iconField)){
            setSelectedIconKey('Icon');
            setSelectedIcon({
              ...selectedIcon,
              ['font']: tileInfo.iconField
            });
          }else{
            setSelectedIconKey('Image');
            setSelectedIcon({
              ...selectedIcon,
              ['img']: tileInfo.iconField
            });
          }
      };
    };

    const addTileItem = () =>{         
      handleError(()=>{
        const tileInfo : any = {
          Title: formField.titleField,
          Link: formField.linkField,
          Color: formField.colorField.text,
          Icon: selectedIconKey == 'Icon' ? selectedIcon.font : (selectedIcon.img ? selectedIcon.img : 'picturefill'),
          OpenNewWin: formField.openNewWin
        };
        addTile(props.context, props.tilesList, tileInfo).then(()=>{
          getTilesData(props.context, props.tilesList, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
        dismissPanel();
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
          IconName: selectedIconKey == 'Icon' ? selectedIcon.font : (selectedIcon.img ? selectedIcon.img : 'picturefill'),
          OpenInNewWindow: formField.openNewWin
        }).then(()=>{
          getTilesData(props.context, props.tilesList, props.orderBy).then((results)=>{
            setTilesData(results);
          });
        });
        dismissPanel();
      });
    };

    const onDragEnd = () =>{

    };

    
    const onSaveIcon = (iconName: string) => { 
      setSelectedIcon({ ...selectedIcon, ['font']: iconName }); 
    };
    const onSaveImg = (filePickerResult: IFilePickerResult) => {
      setSelectedIcon({ ...selectedIcon, ['img']: filePickerResult.fileAbsoluteUrl }); 
    };

    return (
      <div className={styles.tilesSPFx}>
        <Label className={styles.wpTitle}>{escape(props.title)}</Label>
        
        {/* <DragDropContext onDragEnd={onDragEnd}> */}
          <div className={styles.tilesCntnr}>

          {/* <Droppable droppableId="pgTiles" direction="horizontal">
            {(provided)=>(
              <div ref={provided.innerRef}                
                {...provided.droppableProps}
              > */}

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

                {/* {provided.placeholder}
              </div>
            )}
            
          </Droppable> */}

          </div>
        {/* </DragDropContext> */}

        <ITileControls
          toggleHideDialog={handleToggleHideDialog} 
          handleEditChange={handleEditChange} 
        />

        <Panel
          headerText="Tile Properties"
          isBlocking={false}
          isOpen={isOpenPanel}
          onDismiss={dismissPanel}
          closeButtonAriaLabel="Close">
          <ITileForm context={props.context}
            formField={formField} onChangeFormField={onChangeFormField}
            errorMsgField={errorMsgField} 
            selectedIconKey={selectedIconKey} onRadioChange={onRadioChange}
            selectedIcon={selectedIcon} onSaveIcon={onSaveIcon} onSaveImg={onSaveImg}/>
            <div className={styles.panelBtns}>
              {isNewForm 
                  ? <PrimaryButton onClick={addTileItem} text="Save" />
                  : <PrimaryButton onClick={updateTileItem} text="Update" />
              }
              <DefaultButton className={styles.marginL10} onClick={dismissPanel} text="Cancel" />
            </div>
        </Panel>

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
