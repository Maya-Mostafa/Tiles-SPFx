
export interface ITileProps{
    Title: string;
    Link: string;
    BgColor: string;
    Id: any;
    children: any;
    IconName: string;
    handleIconSave: (itemId: any) => ((iconName: string)=>void) ;
}