import * as React from 'react';  
import {ITileFormProps} from './ITileFormProps';
import styles from '../TilesSPFx.module.scss';

import {Icon, Stack, TextField, Dropdown,IDropdownOption, Toggle, VirtualizedComboBox, IComboBoxOption} from '@fluentui/react';
import {getIconNames, getColors} from '../../Services/Styling';

export default function ITileForm (props: ITileFormProps) {

    const stackTokens = { childrenGap: 50 };
    const dropdownStyles = { dropdown: { width: 300 } };
    const iconStyles = { marginRight: '8px' };

    const iconOptions: IDropdownOption[] = [];
    getIconNames().map((iconName)=>{
      iconOptions.push(
          {key: iconName, text: iconName, data : {icon : iconName}}
      );      
    });

    const colorOptions: IDropdownOption[] = [];
    getColors().map((color:any)=>{
      colorOptions.push(
          {key: color.Key, text: color.Name, data : {icon : 'CircleFill'}}
      );      
    });
    
    const onRenderColorOption = (option: IDropdownOption): JSX.Element => {
        return (
          <div>
            {option.data && option.data.icon && (
              <Icon style={iconStyles} className={option.text+styles.Fg} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
            )}
            <span>{option.text}</span>
          </div>
        );
    };
    const onRenderColorTitle = (options: IDropdownOption[]): JSX.Element => {
        const option = options[0];
        return (
          <div>
            {option.data && option.data.icon && (
              <Icon style={iconStyles} className={option.text+styles.Fg} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
            )}
            <span>{option.text}</span>
          </div>
        );
    };
    const onRenderIconOption = (option: IDropdownOption): JSX.Element => {
      return (
        <div>
          {option.data && option.data.icon && (
            <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
          )}
          <span>{option.text}</span>
        </div>
      );
    };
  const onRenderIconTitle = (options: IDropdownOption[]): JSX.Element => {
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
    
    return(
        <div className={styles.tileForm}>
            <Stack tokens={stackTokens}>
                <Stack>
                    <TextField  name="titleField" label="Title" required 
                        value={props.formField.titleField} onChange={props.onChangeFormField} errorMessage={props.errorMsgTitle} />  
                    <TextField name="linkField" placeholder="https://" label="Link" required errorMessage={props.errorMsgLink}
                        value={props.formField.linkField} onChange={props.onChangeFormField}/>  
                    <Dropdown 
                        placeholder="Select a color"
                        label="Color" selectedKey={props.colorField ? props.colorField.key : undefined}
                        options={colorOptions} styles={dropdownStyles}
                        onRenderTitle={onRenderColorTitle} onRenderOption={onRenderColorOption}
                        onChange={props.onChangeColorField} />
                    <Dropdown
                        placeholder="Select an icon"
                        label="Icon" selectedKey={props.iconField ? props.iconField.key : undefined}
                        options={iconOptions} styles={dropdownStyles}
                        onRenderTitle={onRenderIconTitle} onRenderOption={onRenderIconOption}
                        onChange={props.onChangeIconField} />
                        {/* <VirtualizedComboBox
                            label="Icon Name"
                            allowFreeform selectedKey={props.iconField ? props.iconField.key : undefined}
                            autoComplete="on"
                            options={iconOptions}
                            dropdownMaxWidth={200}
                            useComboBoxAsMenuWidth
                            onRenderOption={onRenderIconOption}
                            onChange={props.onChangeIconField}
                        /> */}
                    <Toggle label="Open in a new window" defaultChecked onText="Yes" offText="No" checked={props.openNewWin} onChange={props.onChangeOpenNewWin} />
                </Stack>
            </Stack>
        </div>
    );
}
