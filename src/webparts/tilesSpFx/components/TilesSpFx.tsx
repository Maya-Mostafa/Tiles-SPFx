import * as React from 'react';
import styles from './TilesSPFx.module.scss';
import { ITilesSPFxProps } from './ITilesSPFxProps';
// import { escape } from '@microsoft/sp-lodash-subset';

import {getTilesData, updateIcon} from '../Services/DataRequests';
import ITile from './ITile/ITile';

export default function TilesSPFx (props: ITilesSPFxProps) {

    const [tilesData, setTilesData] = React.useState([]);
    const [filePickerResult, setFilePickerResult] = React.useState({});
    const [iconName, setIconName] = React.useState('');

    React.useEffect(()=>{
      getTilesData(props.context).then((results)=>{
        setTilesData(results);
      });
    },[tilesData.length, iconName]);

    const handleIconSave = (itemId: any)=>{
      return (iconName: string)=>{
        updateIcon(props.context, itemId, iconName).then(()=>{
          getTilesData(props.context).then((results)=>{
            setTilesData(results);
          });
        })
      }
    };

    return (
      <div className={styles.tilesSpFx}>
       {tilesData.map((value:any)=>{
         return(
           <>
           <ITile key={value.Id}
              BgColor={value.BgColor} 
              Id={value.Id}
              Link={value.Link}
              Title={value.Title}
              IconName={value.IconName}
              handleIconSave={handleIconSave}>              
           </ITile>
           </>
         );
       })}
             
      </div>
    );
}
