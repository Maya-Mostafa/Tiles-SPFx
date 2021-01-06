import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPPermission } from "@microsoft/sp-page-context";
import {SPHttpClient, ISPHttpClientOptions} from "@microsoft/sp-http";

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


export const getTilesData = async (context:WebPartContext, listTitle: string ,orderBy: string) :Promise <any> => {
    //orderBy = orderBy ? orderBy : 'Title';
    //listTitle = listTitle ? listTitle : 'Tiles';
    const restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listTitle}')/items?$orderby=${orderBy} asc`;
    const _data = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1);
    let tilesData : {}[] = [];

    if(_data.ok){
        const results = await _data.json();
        if(results){
            results.value.map((result:any)=>{
                tilesData.push({
                    Id: result.Id,
                    Title: result.Title,
                    BgColor: result.Color,
                    BgColorHex : getColorHex(result.Color),
                    Link: result.Link,
                    IconName: result.IconName,
                    Target: result.OpenInNewWindow ? "_blank" : "_self",
                    Order: result.Order,
                    SubLinks: result.SubLinks
                });
            });
        }
        return tilesData;
    }

};

export const updateIcon = async (context: WebPartContext, listTitle: string, itemId:number, iconName:string) =>{
    const restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listTitle}')/items(${itemId})`;
    
    let body: string = JSON.stringify({
        IconName: iconName
    }),
    spOptions: ISPHttpClientOptions = {
        headers:{
            Accept: "application/json;odata=nometadata", 
            "Content-Type": "application/json;odata=nometadata",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",                
        },
        body: body
    };

    const _data = await context.spHttpClient.post(restUrl, SPHttpClient.configurations.v1, spOptions);
    if (_data.ok){
        console.log('Tile is updated!');
    }
};

export const addTile = async (context: WebPartContext, listTitle: string, tileInfo: any) =>{
    const restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listTitle}')/items`,
    body: string = JSON.stringify({
        Title: tileInfo.Title,
        Color: tileInfo.Color ? tileInfo.Color : "Blue",
        Link: tileInfo.Link,
        IconName: tileInfo.Icon,
        OpenInNewWindow: tileInfo.OpenNewWin,
        SubLinks: tileInfo.SubLinks
    }),
    spOptions: ISPHttpClientOptions = {
        headers:{
            Accept: "application/json;odata=nometadata", 
            "Content-Type": "application/json;odata=nometadata",
            "odata-version": ""
        },
        body: body
    },
    _data = await context.spHttpClient.post(restUrl, SPHttpClient.configurations.v1, spOptions);
    if(_data.ok){
        console.log('New Tile is added!');
    }
};

export const deleteTile = async (context: WebPartContext, listTitle: string, itemId: any) =>{
    const restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listTitle}')/items(${itemId})`;
    let spOptions: ISPHttpClientOptions = {
        headers:{
            Accept: "application/json;odata=nometadata", 
            "Content-Type": "application/json;odata=nometadata",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"         
        },
    };

    const _data = await context.spHttpClient.post(restUrl, SPHttpClient.configurations.v1, spOptions);
    if (_data.ok){
        console.log('Tile is deleted!');
    }
};

export const updateTile = async (context: WebPartContext, listTitle: string, itemId: any, tileInfo: any) =>{
    const restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listTitle}')/items(${itemId})`,
    body: string = JSON.stringify({
        Title: tileInfo.Title,
        Color: tileInfo.Color,
        Link: tileInfo.Link,
        IconName: tileInfo.IconName,
        OpenInNewWindow: tileInfo.OpenNewWin,
        SubLinks: tileInfo.SubLinks
    }),
    spOptions: ISPHttpClientOptions = {
        headers:{
            Accept: "application/json;odata=nometadata", 
            "Content-Type": "application/json;odata=nometadata",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",    
        },
        body: body
    },
    _data = await context.spHttpClient.post(restUrl, SPHttpClient.configurations.v1, spOptions);
    
    if (_data.ok){
        console.log('Tile is updated!');
    }
};

export const getTile = async (context: WebPartContext, listTitle:string, itemId: any) =>{
    const restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listTitle}')/items(${itemId})`,
    _data = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1);
    let tileData : {} = {};

    if(_data.ok){
        const result = await _data.json();
        if(result){
            tileData = {
                Title: result.Title,
                Color: result.Color,
                Link: result.Link,
                IconName: result.IconName,
                OpenNewWin: result.OpenInNewWindow,
                Id: result.Id,
                SubLinks: result.SubLinks
            }; 
        }
        return tileData;
    }
};

export const isUserManage = (context: WebPartContext) : boolean =>{
    const userPermissions = context.pageContext.web.permissions,
        permission = new SPPermission (userPermissions.value);
    
    return permission.hasPermission(SPPermission.manageWeb);
};