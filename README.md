Modal Module
=============
*** 
**Developers**: Emiliano Errecalde.

**Created**: 09/2015
***

**Summary**: Angular directive to create templates based modal windows.

**Version**: 1.0.0

**Angular Version**: 1.2.x

**Used Techonlogies**: Sass, Angular, Javascript.

## How to implement it first time:

1. Copy the whole folder into your preferred location inside your project
e.g: inside app/shared folder

2. Wire up the core files and make sure they are correctly included: directive (modal.drv.js) and style (_modal.scss).
e.g: styles => @import "../../shared/dynamic-modal/modal";

3. Add your templates into the 'templates' folder included which is included in the 'dynamic-modal' folder.

4. Add a button or any element in which you will have to add the following attributes: 
* trigger-modal (required): boolean attribute, not needed to assign any value.
- modal-tpl="{template name}" (required): Template name. It has to be existing in the template folder inside the modal module. 
- modal-theme="[white|black]" (optional): Can be white or black. If not provided, default theme is white (white background, dark gray text).

Complete example of the button: 

```
<button trigger-modal modal-tpl="example.tpl.html" ng-click title="Modal Title" modal-theme>Open Modal</button>
```



