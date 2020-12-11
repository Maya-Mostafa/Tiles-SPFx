import * as React from 'react';  
import {ITileFormProps} from './ITileFormProps';
import styles from '../TilesSPFx.module.scss';

import {Stack, TextField, Dropdown,IDropdownOption, Toggle, VirtualizedComboBox, IComboBoxOption} from '@fluentui/react';
import {getIconNames, getColors} from '../../Services/Styling';

import { initializeIcons } from '@uifabric/icons';
import {Icon} from '@fluentui/react/lib/Icon';

export default function ITileForm (props: ITileFormProps) {

    initializeIcons();

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
                <Stack id={props.formField.idField}>
                    <TextField id="titleField" name="titleField" label="Title" required 
                        value={props.formField.titleField} onChange={props.onChangeFormField} errorMessage={props.errorMsgField.titleField} />  
                    <TextField id="linkField" name="linkField" placeholder="https://" label="Link" required errorMessage={props.errorMsgField.linkField}
                        value={props.formField.linkField} onChange={props.onChangeFormField}/>  
                    <Dropdown 
                        placeholder="Select a color" id="colorField"
                        label="Color" selectedKey={props.formField.colorField ? props.formField.colorField.key : undefined}
                        options={colorOptions} styles={dropdownStyles}
                        onRenderTitle={onRenderColorTitle} onRenderOption={onRenderColorOption}
                        onChange={props.onChangeFormField} />
                      {/* <Dropdown
                        placeholder="Select an icon" id="iconField"
                        label="Icon" selectedKey={props.formField.iconField ? props.formField.iconField.key : undefined}
                        options={iconOptions} styles={dropdownStyles}
                        onRenderTitle={onRenderIconTitle} onRenderOption={onRenderIconOption}
                        onChange={props.onChangeFormField} /> */}
                        <div className={styles.iconDpdCntnr}>
                          <VirtualizedComboBox id="iconField" className={styles.iconDpd}
                              label="Icon Name" placeholder="Select or search for an icon"
                              selectedKey={props.formField.iconField ? props.formField.iconField.key : undefined}
                              //autoComplete="on" allowFreeform
                              options={iconOptions}
                              dropdownMaxWidth={200} useComboBoxAsMenuWidth
                              onRenderOption={onRenderIconOption}
                              onChange={props.onChangeFormField}
                          />
                          <Icon iconName={props.formField.iconField.text} className={styles.iconDpdIcon}/>
                        </div>
                    <Toggle id="openNewWin" label="Open in a new window" defaultChecked onText="Yes" offText="No" 
                      checked={props.formField.openNewWin} onChange={props.onChangeFormField} />
                </Stack>
            </Stack>
        </div>
    );
}
