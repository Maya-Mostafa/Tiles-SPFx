import * as React from 'react';
import styles from '../TilesSPFx.module.scss';
import {ITileControlsProps} from './ITileControlsProps';

import { useBoolean } from '@uifabric/react-hooks';
import {CommandBarButton, Icon, IIconProps, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton,
        Stack, TextField, Dropdown,IDropdownOption, DropdownMenuItemType, IDropdownProps, Toggle} from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';

import {addTile} from '../../Services/DataRequests';

export default function ITileControls (props: ITileControlsProps) {
  
  initializeIcons();
  const addIcon: IIconProps = { iconName: 'CalculatorAddition' };
  
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const dialogContentProps = {
    type: DialogType.close,
    title: 'Add a New Tile'
  };  

  const stackTokens = { childrenGap: 50 };
  const exampleOptions: IDropdownOption[] = [
    //{ key: 'Header', text: 'Options', itemType: DropdownMenuItemType.Header },
    { key: 'A', text: 'Option a', data: { icon: 'Memo' } },
    { key: 'B', text: 'Option b', data: { icon: 'Print' } },
    { key: 'C', text: 'Option c', data: { icon: 'ShoppingCart' } },
    { key: 'D', text: 'Option d', data: { icon: 'Train' } },
    { key: 'E', text: 'Option e', data: { icon: 'Repair' } },
    //{ key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
    //{ key: 'Header2', text: 'More options', itemType: DropdownMenuItemType.Header },
    { key: 'F', text: 'Option f', data: { icon: 'Running' } },
    { key: 'G', text: 'Option g', data: { icon: 'EmojiNeutral' } },
    { key: 'H', text: 'Option h', data: { icon: 'ChatInviteFriend' } },
    { key: 'I', text: 'Option i', data: { icon: 'SecurityGroup' } },
    { key: 'J', text: 'Option j', data: { icon: 'AddGroup' } },
  ];
  const iconStyles = { marginRight: '8px' };
  const onRenderOption = (option: IDropdownOption): JSX.Element => {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  };
  const onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  };
  
  const onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        <Icon style={iconStyles} iconName={'MessageFill'} aria-hidden="true" />
        <span>{props.placeholder}</span>
      </div>
    );
  };
  
  const dropdownStyles = { dropdown: { width: 300 } };

  const colorOptions: IDropdownOption[] = [
    { key: 'blue', text: 'Blue'},
    { key: 'green', text: 'Green' },
    { key: 'grey', text: 'Grey' },
    { key: 'mint', text: 'Mint' },
    { key: 'navy', text: 'Navy' },
    { key: 'orange', text: 'Orange' },
    { key: 'pink', text: 'Pink' },
    { key: 'purple', text: 'Purple' },
    { key: 'red', text: 'Red' },
    { key: 'teal', text: 'Teal' },
    { key: 'yellow', text: 'Yellow' },
  ];


  /*const [formField, setFormField] = React.useState({
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
    //console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
    toggleOpenNewWin();
  };

  const addTileItem = () =>{
    toggleHideDialog();
    const tileInfo : any = {
      Title: formField.titleField,
      Link: formField.linkField,
      Color: colorField.text,
      Icon: iconField.data.icon,
      OpenNewWin: openNewWin
    }
    addTile(props.context, tileInfo);
  }*/

    return (
      <div className={styles.tileControls}>
          <CommandBarButton iconProps={addIcon} text="Add Tile" onClick={props.toggleHideDialog} />

          <Dialog
            hidden={props.hideDialog}
            onDismiss={props.toggleHideDialog} isBlocking={true}
            dialogContentProps={dialogContentProps}>
            
            <Stack tokens={stackTokens}>
              <Stack>
                <TextField name="titleField" label="Title" required value={props.formField.titleField} onChange={props.onChangeFormField} />  
                <TextField name="linkField" label="Link" required value={props.formField.linkField} onChange={props.onChangeFormField}/>  
                <Dropdown 
                  placeholder="Select a color"
                  label="Color" selectedKey={props.colorField ? props.colorField.key : undefined}
                  options={colorOptions}
                  styles={dropdownStyles}
                  onChange={props.onChangeColorField} />
                <Dropdown
                  placeholder="Select an icon"
                  label="Icon" selectedKey={props.iconField ? props.iconField.key : undefined}
                  ariaLabel="Icon Name"
                  onRenderPlaceholder={onRenderPlaceholder}
                  onRenderTitle={onRenderTitle}
                  onRenderOption={onRenderOption}
                  styles={dropdownStyles}
                  options={exampleOptions}
                  onChange={props.onChangeIconField} />
                <Toggle label="Open in a new window" defaultChecked onText="Yes" offText="No" checked={props.openNewWin} onChange={props.onChangeOpenNewWin} />
              </Stack>
            </Stack>

            <DialogFooter>
              <PrimaryButton onClick={props.addTileItem} text="Save" />
              <DefaultButton onClick={props.toggleHideDialog} text="Cancel" />
            </DialogFooter>
          </Dialog>

      </div>
    );
}
