# Tiles SPFx

## Summary

Tiles

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)


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

## Notes
In order to pull from different branch:
File->Preferences->Settings->User (Tab)-> Extentions ->git-> Autofeatch(set checkbox to true)
Now you will able to see remote branches in source control branches options


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
- [https://stackoverflow.com/questions/42142490/how-to-pull-specific-remote-into-current-branch-in-vs-code] Git pull from another branch VS Code
- [https://www.npmjs.com/package/react-truncate] React Truncate for text trimming with ellipsis
- [https://www.c-sharpcorner.com/article/deploy-multiple-instance-of-spfx-webpart-in-same-app-catalog/] Deploy Multiple Instance Of SPFx Webpart In Same App Catalog
- [https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/supporting-section-backgrounds] CSS Awarenss support for sections
