import { WebPartContext } from "@microsoft/sp-webpart-base";
import {SPHttpClientResponse, SPHttpClient, ISPHttpClientOptions} from "@microsoft/sp-http";

const getColorHex = (colorName:string) : string => {
    let colorHex : string;
    switch (colorName) {
        case ("Black"):
            colorHex = "#000000";
            break;
        case ("Blue"):
            colorHex = "#0096CF";
            break;
        case ("Green"):
            colorHex = "#27AE60";
            break;
        case ("Grey"):
            colorHex = "#9FA7A7";
            break;
        case ("Mint"):
            colorHex = "#1C9A82";
            break;
        case ("Navy"):
            colorHex = "#4C5F79";
            break;
        case ("Orange"):
            colorHex = "#EA8020";
            break;
        case ("Pink"):
            colorHex = "#F46C9E";
            break;
        case ("Purple"):
            colorHex = "#A061BA";
            break;
        case ("Red"):
            colorHex = "#D7574A";
            break;
        case ("Teal"):
            colorHex = "#38A8AC";
            break;
        case ("White"):
            colorHex = "#FFFFFF";
            break;
        case ("Yellow"):
            colorHex = "#DAA62F";
            break;
    }
    return colorHex;
};


export const getTilesData = async (context:WebPartContext) :Promise <any> => {
    const restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Tiles')/items`;
    const _data = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1);
    let tilesData : {}[] = [];

    if(_data.ok){
        const results = await _data.json();
        if(results){
            results.value.map((result:any)=>{
                tilesData.push({
                    Title: result.Title,
                    BgColor: result.BgColor,
                    BgColorHex : getColorHex(result.BgColor),
                    FgColor: result.FgColor,
                    FgColorHex: getColorHex(result.FgColor),
                    Link: result.Link.Url,
                    IconUrl : result.Icon,
                    IconLink: result.IconLink,
                    Id: result.Id
                })
            })
        }
        //console.log(tilesData);
        return tilesData;
    }

}


