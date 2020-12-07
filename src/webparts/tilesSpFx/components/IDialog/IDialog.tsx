import * as React from 'react';
import {IDialogProps} from './IDialogProps';
import {Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton} from '@fluentui/react';

export default function IDialog (props: IDialogProps) {
    
    const dialogContentProps = {
        type: DialogType.close,
        title: 'Add a New Tile'
    };  

    return(
        <Dialog
            hidden={props.hideDialog}
            onDismiss={props.toggleHideDialog} isBlocking={true}
            dialogContentProps={dialogContentProps}>
            
            {props.children}

            <DialogFooter>
              <PrimaryButton onClick={props.addTileItem} text="Save" />
              <DefaultButton onClick={props.toggleHideDialog} text="Cancel" />                            
            </DialogFooter>
        </Dialog>
    );
}