
export interface ITileProps{
    Title: string;
    Link: string;
    BgColor: string;
    Id: any;
    IconName: string;
    Target: string;

    handleIconSave: (itemId: any) => ((tIconName: string)=>void) ;
    handleDelete : any ;
    handleEdit : any ;
    
    showEditControls: boolean;

    index: any;
}