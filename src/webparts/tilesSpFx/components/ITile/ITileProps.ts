
export interface ITileProps{
    Title: string;
    Link: string;
    BgColor: string;
    Id: any;
    IconName: string;
    Target: string;
    SubLinks: string;
    SubLinksList: any;

    handleIconSave: (itemId: any) => ((tIconName: string)=>void) ;
    handleDelete : any ;
    handleEdit : any ;
    
    showEditControls: boolean;

    index: any;
}