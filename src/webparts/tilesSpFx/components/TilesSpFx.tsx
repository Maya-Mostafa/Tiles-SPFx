import * as React from 'react';
import styles from './TilesSPFx.module.scss';
import { ITilesSPFxProps } from './ITilesSPFxProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';

import {getTilesData} from '../Services/DataRequests';
import ITile from './ITile/ITile';

export default function TilesSPFx (props: ITilesSPFxProps) {

    const [tilesData, setTilesData] = React.useState([]);
    const [filePickerResult, setFilePickerResult] = React.useState({});

    React.useEffect(()=>{
      getTilesData(props.context).then((results)=>{
        setTilesData(results);
      });
      console.log("filePickerResult", filePickerResult);
    },[tilesData.length, filePickerResult]);

    return (
      <div className={styles.tilesSpFx}>
       {tilesData.map((value:any)=>{
         return(
           <>
           <ITile key={value.Id}
            BgColor={value.BgColor} 
            FgColor={value.FgColor}
            Id={value.Id}
            Link={value.Link}
            Title={value.Title}>

              <FilePicker
              accepts= {[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
              buttonIcon="FileImage"
              onSave={(filePickerResult: IFilePickerResult) => { setFilePickerResult(filePickerResult) }}
              onChanged={(filePickerResult: IFilePickerResult) => { setFilePickerResult(filePickerResult) }}
              context={props.context}
              buttonLabel="Pick Image" />   

           </ITile>
           </>
         );
       })}

             
      </div>
    );
}
