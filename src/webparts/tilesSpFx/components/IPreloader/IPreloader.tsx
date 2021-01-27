import * as React from 'react';
import styles from '../TilesSPFx.module.scss';
import { IPreloaderProps } from './IPreloaderProps';

import {Spinner, SpinnerSize, Overlay} from '@fluentui/react';

export default function IPreloader (props:IPreloaderProps) {

    return(
        <>
            {props.isDataLoading &&
                <>
                    <Overlay></Overlay>
                    <div>
                        <Spinner size={SpinnerSize.medium} label="Please Wait, Updating Tiles..." ariaLive="assertive" labelPosition="right" />
                    </div>
                </>
            }
        </>
    );
}