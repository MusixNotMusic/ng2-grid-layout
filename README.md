# Ng2GridLayout

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.8.

## Development server
```bash
ng serve #启动项目
```
## Build Lib
```bash
    ng build grid-layout #构建lib
```
## layout
```bash
(layout)
+---------------------------------------------------------------------------------------------------+ -
|   +----------+   +-----------+                                                                    | | 
|   |          |   |  <--w-->  |                                                                    | |
|   |          |   |           |                                                                    | |
|   +----------+   +-----------+                                                                    | H
|   +----------+         (grid)                                                                     | |
|   |          |                                                                                    | |
|   |          |                                                                                    | |
|   +----------+                                                                                    | |
+---------------------------------------------------------------------------------------------------+ -
|<------------------------------------browser width------------------------------------------------>|
```

### NgGridLayout.Component

|参数|类型|默认值| 含义|
| ------ | ------ | ------ |------ |
|colNum| number | 12 |允许每列最多排序个数|
|rowHeight|number| 30 | 行高度|
|maxRows|number| Infinity| 最大行数|
|margin|Array &lt;number\>| [10,10]|栅格之间距离|
|isDraggable| boolean | true| 可拖拽|
|isResizable| boolean | true| 可伸缩|
|useCssTransforms| boolean | true| 使用css3动画 transform|
|verticalCompact| boolean | true | 对齐方式|
|layout| Array &lt;object\> |   |具体布局数据|
|responsive| boolean | true | 响应式|
|breakpoints| object|{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }| 响应式设备宽度|
|cols| object| { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 } | 响应式 对应colNum值 |

### NgGridItem.Component

|参数|类型|默认值| 含义|
| ------ | ------ | ------ |------ |
|componentData| object |  |动态组件数据{component: xxx, data:xxx}|
|isDraggable|boolean|  | 栅格是否drag|
|isResizable|boolean|  | 栅格是否resize|
|minH|number| 1|栅格最小高度|
|minW| number | 1| 栅格最小宽度|
|maxH| number | Infinity| 栅格最大高度|
|maxW| number | Infinity| 栅格最大宽度 |
|x|  number  |  | 栅格位于layout(布局)图中的x轴位置|
|y|  number  |  | 栅格位于layout(布局)图中的y轴位置|
|w| number  |  | 栅格 在 layout(布局)图中的 单位 宽度|
|h| number  |  | 栅格 在 layout(布局)图中的 单位 高度|
|i|number | | layout中记录的索引index|
|rowHeight| number| 10 |单位行高|
|static| boolean| false | 栅格是否静止 |




