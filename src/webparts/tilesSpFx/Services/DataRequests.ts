import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPPermission } from "@microsoft/sp-page-context";
import {SPHttpClient, ISPHttpClientOptions} from "@microsoft/sp-http";
import { IDropdownOption } from "office-ui-fabric-react";

const getMyLocationsInfo = async (context: WebPartContext, locNum: string) =>{
    const   restUrl = `/sites/contentTypeHub/_api/web/Lists/GetByTitle('schools')/items?$select=Title,School_x0020_My_x0020_School_x00,School_x0020_Name&$filter=Title eq '${locNum}'`,
            _data = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1);
    let locInfo : {} = {};
    
    if(_data.ok){
        const result = await _data.json();
        locInfo = {Title: result.value[0].School_x0020_Name, URL: result.value[0].School_x0020_My_x0020_School_x00};
    }
    return locInfo;
};

const getMyLocations = async (context: WebPartContext) =>{
    const   currUserEmail = context.pageContext.user.email,
            restUrl = `/sites/contentTypeHub/_api/web/Lists/GetByTitle('Employees')/items?$filter=MMHubBoardEmail eq '${currUserEmail}'&$select=MMHubLocationNos`;
    let userLocationsInfo : {}[] = [], schoolsData:any;

    const myLocs = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1).then(response => response.json());
    const myLocsNum : [] = myLocs.value[0].MMHubLocationNos.split(";");

    for(let myLocNum of myLocsNum){
        schoolsData = await getMyLocationsInfo(context, myLocNum).then((results)=>{
            userLocationsInfo.push(results);
        });
    }
    return userLocationsInfo;
};

const getSubLinks = async (context: WebPartContext, listName: string) : Promise <any> => {
    const 
        restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listName}')/items?$orderby=Title`,
        _data = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1).then(response => response.json());
    let listData : {}[] = [], myLocs: {}[] = [];

    _data.value.map((result:any)=>{
        listData.push({
            Title: result.Title,
            URL: result.URL ? result.URL : result.url,
        });
    });

    if(listName === "MyDepartment"){
        myLocs = await getMyLocations(context).then(response => response);
        return [...myLocs, ...listData];
    }else{
        return listData;
    }
};

export const getTilesData = async (context:WebPartContext, listTitle: string ,orderBy: string) :Promise <any> => {
    
    let tilesData : any = [], listData:any, myLocsData:any;

    const restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('${listTitle}')/items?$orderby=${orderBy} asc`;
    const _tiles = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1).then(response => response.json());

    _tiles.value.map((result:any)=>{
        tilesData.push({
            Id: result.Id,
            Title: result.Title,
            BgColor: result.Color,
            Link: result.Link,
            IconName: result.IconName,
            Target: result.OpenInNewWindow ? "_blank" : "_self",
            Order: result.Order,
            //SubLinks: result.SubLinks,
            //SubLinksListName: result.SubLinksList,
            SubLinksListName: result.SubLinks,
            SubLinksListData: null
        });
    });

    for(let tileData of tilesData){
        if(tileData.SubLinksListName && tileData.SubLinksListName !== "None"){
            listData = await getSubLinks(context, tileData.SubLinksListName).then((results)=>{
                tileData.SubLinksListData = results;
            }).catch((error: any)=>{
                console.log('List does not exist: ', error);
                //alert('The sub links list for tile "' + tileData.Title + '" does not exist or mistyped. Please make sure that sublinks list name is correct.');
                tileData.SubLinksListData = [];
            });
        }
    }
    return tilesData;
};

// Tile Operations -start
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
        SubLinks: tileInfo.SubLinksListName,
        // SubLinks: tileInfo.SubLinks,
        // SubLinksList: tileInfo.SubLinksListName
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
        SubLinks: tileInfo.SubLinksListName,
        // SubLinks: tileInfo.SubLinks,
        // SubLinksList: tileInfo.SubLinksListName
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
// Tile Operations -end

export const getAllLists = async (context: WebPartContext) =>{
    const restUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists?$select=Title&$filter=BaseType eq 0 and BaseTemplate eq 100 and Hidden eq false`;
    const _data = await context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1).then(response => response.json());
    let listsDpd : IDropdownOption[] = [];

    _data.value.map((result:any)=>{
        listsDpd.push({
            key: result.Title,
            text: result.Title
        });
    });
    
    return [...[{key: "None", text:"None"}], ...listsDpd];
};

export const isUserManage = (context: WebPartContext) : boolean =>{
    const userPermissions = context.pageContext.web.permissions,
        permission = new SPPermission (userPermissions.value);
    
    return permission.hasPermission(SPPermission.manageWeb);
};