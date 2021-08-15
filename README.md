# Tiles SPFx

## Summary

- Tiles web part is a quick links display for users. It displays links from a SP list and other links based on user permissions. For each tile, a drop down of links can be added which reads from another list which the user can choose.
- Each tile has some properties like: title, link, icon/image (optional), color, sub links (optional) and automatically generated order value. 
- Users can add, edit and delete tiles from a side panel (Fluent UI framework).
- Users can decide on the tile style. Predefined colors are avaialble for the user to choose from (following the style guide). Picking an icon/image is optional. The icon value is read from the Fabric UI icon library, and the images can be picked using the modern SP file upload window.
- Instant search is a feature for the tiles web part.
- The admin can configure the web part properties such as: the list name, the web part title, show/hide the search textbox, and the text that will be displayed as a placeholder for the search box. The order of the tiles can be also determined from this panel either by Title or the Order column.
- Only admins can add/edit/delete tiles. The options are only visible for whoever has administration permissions.


## Used SharePoint Framework Version

![Tiles](https://img.shields.io/badge/version-1.11-green.svg)


## Prerequisites

> Create a "Tiles" list in the same site


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**


## Features

This extension illustrates the following concepts:

- Display tiles from a SP list
- Each tile has: Title, background color, foreground color, link, icon, order
- Drag and drop to change order
- Edit tiles
- Delete tiles
- Add icons to choose from "Fabric/Fluent UI"

## Commands

``npm install @fluentui/react``<br/>
``npm install @fluentui/react-hooks``<br/>
``npm install @pnp/spfx-controls-react --save --save-exact``<br/>
``npm i @fluentui/react-icons``<br/>
``npm i react-icons``<br/> (not used)

```
npm install react-beautiful-dnd
npm install @types/react-beautiful-dnd
```




## References

- [https://pnp.github.io/sp-dev-fx-controls-react/controls/FilePicker/] Pnp File Picker
- [https://pnp.github.io/sp-dev-fx-controls-react/controls/IconPicker/] PnP Icon Picker
- [https://www.npmjs.com/package/react-icons] React Icons
- [https://www.npmjs.com/package/@fluentui/react-icons] Fluent React Icons
- [https://letslearnoffice365.wordpress.com/2019/02/02/how-to-check-permissions-for-current-user-sharepoint-online-spfx/] SPFx Check User Permissions
- [https://blog.logrocket.com/drag-and-drop-in-react/] React Drag and Drop
- [https://vscodethemes.com/trending?page=3] VS code themes
- [https://techcommunity.microsoft.com/t5/sharepoint/near-complete-list-of-sharepoint-list-types-and-templates-a-k-a/m-p/220550] SP.BaseType & SP.ListTemplateType
- [https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-visio/jj246925(v=office.15)] SP.BaseType enumeration
- [https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/validate-web-part-property-values] Validate web part property values
- [https://github.com/atlassian/react-beautiful-dnd] React Drag & Drop "react-beautiful-dnd"
- [https://egghead.io/courses/beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd] react-beautiful-dnd Course
