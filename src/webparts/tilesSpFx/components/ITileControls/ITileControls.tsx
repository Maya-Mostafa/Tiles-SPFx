import * as React from 'react';
import styles from '../TilesSPFx.module.scss';
import {ITileControlsProps} from './ITileControlsProps';

import {CommandBarButton, Icon, IIconProps, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton,
        Stack, TextField, Dropdown,IDropdownOption, IDropdownProps, Toggle, VirtualizedComboBox, IComboBoxOption} from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';

import {getIconNames} from '../../Services/IconNames';
import * as ReactIcons from 'react-icons/fa';
import * as fluentIcons from '@fluentui/react-icons';

export default function ITileControls (props: ITileControlsProps) {
  
  initializeIcons();
  const addIcon: IIconProps = { iconName: 'CalculatorAddition' };
  
  const dialogContentProps = {
    type: DialogType.close,
    title: 'Add a New Tile'
  };  

  const stackTokens = { childrenGap: 50 };
  // const exampleOptions: IDropdownOption[] = [
  //   { key: 'A', text: 'option a', data: { icon: 'Memo' }  },
  //   { key: 'B', text: 'dsa', data: { icon: 'Print' } },
  //   { key: 'C', text: 'dsad', data: { icon: 'ShoppingCart' } },
  //   { key: 'D', text: 'vcvc', data: { icon: 'Train' } },
  //   { key: 'E', text: 'gfg', data: { icon: 'Repair' } },
  //   { key: 'F', text: 'retre', data: { icon: 'Running' } },
  //   { key: 'G', text: 'czxc', data: { icon: 'EmojiNeutral' } },
  //   { key: 'H', text: 'nbnbv', data: { icon: 'ChatInviteFriend' } },
  //   { key: 'I', text: 'yty', data: { icon: 'SecurityGroup' } },
  //   { key: 'J', text: 'yty', data: { icon: 'AddGroup' } },
  // ];

  const exampleOptions: IComboBoxOption[] = [];
  const arr = getIconNames();
  arr.map((iconName)=>{
    exampleOptions.push(
      {key: iconName, text: iconName, data : {icon : iconName}}
    )
  })

  /*const arr = [];
  Object.keys(fluentIcons).map(result => {
    arr.push(result);
    exampleOptions.push(
      {key: result, text: result, data : {icon : result.substring(0, result.length-4)}}
    )
  });
  console.log("arr", arr);
  console.log("exampleOptions:", exampleOptions);*/


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

  // const icons = Object.keys(ReactIcons).reduce((acc: React.FC[], exportName) => {
  //   if (!!(ReactIcons as any)[exportName].displayName) {
  //     acc.push((ReactIcons as any)[exportName] as React.FunctionComponent);
  //   }
  //   return acc;
  // }, []);
  // console.log(icons);

  

    return (
      <div className={styles.tileControls}>
          <CommandBarButton iconProps={addIcon} text="Add Tile" onClick={props.toggleHideDialog} />

          <Dialog
            hidden={props.hideDialog}
            onDismiss={props.toggleHideDialog} isBlocking={true}
            dialogContentProps={dialogContentProps}>
            
            <Stack tokens={stackTokens}>
              <Stack>
                <TextField  name="titleField" label="Title" required 
                  value={props.formField.titleField} onChange={props.onChangeFormField} errorMessage={props.errorMsgTitle} />  
                <TextField name="linkField" placeholder="https://" label="Link" required errorMessage={props.errorMsgLink}
                  value={props.formField.linkField} onChange={props.onChangeFormField}/>  
                <Dropdown 
                  placeholder="Select a color"
                  label="Color" selectedKey={props.colorField ? props.colorField.key : undefined}
                  options={colorOptions}
                  styles={dropdownStyles}
                  onChange={props.onChangeColorField} />
                
                {/* <Dropdown
                  placeholder="Select an icon"
                  label="Icon" selectedKey={props.iconField ? props.iconField.key : undefined}
                  ariaLabel="Icon Name"
                  onRenderPlaceholder={onRenderPlaceholder}
                  onRenderTitle={onRenderTitle}
                  onRenderOption={onRenderOption}
                  styles={dropdownStyles}
                  options={exampleOptions}
                  onChange={props.onChangeIconField} /> */}

                  <VirtualizedComboBox
                      label="Icon Name"
                      allowFreeform selectedKey={props.iconField ? props.iconField.key : undefined}
                      autoComplete="on"
                      options={exampleOptions}
                      dropdownMaxWidth={200}
                      useComboBoxAsMenuWidth
                      onRenderOption={onRenderOption}
                      onChange={props.onChangeIconField}
                    />

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
