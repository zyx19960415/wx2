## 小程序差异比较

|	类型 |微信小程序 |百度小程序 |支付宝小程序|
|---|---|---|---|
| api |wx.* |swan.* |my.*|
| 视图模版| 循环: wx:for条件: wx:if |循环: s-for 条件:s-if条件判断中不需要使用插值语法 |循环: a:for条件: a:if|
| 事件处理 |bindtap |bindtap |onTap|
| 过滤器 |wxs语法 |filter语法 |无  | 
| 原生组件 |除canvas,基本一致 |除canvas,基本一致 |更强大组件库系统  | 
| 登陆流程 |指定scope授权 |指定scope,获取code，换token |授权获取code，获取token  | 
| 支付 |微信支付 |聚合收银台 |支付宝  | 
| 配置信息 |project.config.json| project.swan.json和pkginfo.json |无 | 
| 生命周期和样式 |一致（理论） |一致（理论） |一致（理论）  | 


## 自定义组件
1. 微信中的自定义组件命名支持驼峰和kebabCase，百度小程序中不支持驼峰
2. 微信自定义组件可以包含抽象节点“componentGenerics“字段，手百小程序中不支持


## 逻辑层

1. 名称不同，功能相同的api，需要做映射，例：

`navigateToMiniProgram` ===>  `navigateToSmartProgram`

2. 自定义组件的处理：

百度小程序构造器不支持的属性： moved，relations， observers

内置behaviors的处理：

    `wx://form-field` ===>  `swan://form-field`
    `wx://component-export` ===>  `swan://component-export`


3. 独有api无法自动匹配，存放到转换日志中，需手动删除或替换对应逻辑

4. 前缀关键词不同：wx ===>  swan

## 视图层

### 循环和条件判断

**微信**：
```
//循环
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
//条件
<view wx:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>
<view wx:elif="{{view == 'APP'}}"> APP </view>
<view wx:else="{{view == 'MINA'}}"> MINA </view>
```
**百度**
```
//循环
<view>
    <view s-for="p,index in persons">
        {{index}}: {{p.name}}
    </view>
</view>
//条件
<view s-if="is4G">4G</view>
<view s-elif="isWifi">Wifi</view>
<view s-else>Other</view>
```


> 1. wx:对应s-，例：wx:if  =====>  s-if
> 2. 百度小程序中没有插值语法(花括号)
> 3. wx:for， wx:for-index，wx:for-item等价为s-for="p,index in persons"

### 模版

```
<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>

//**微信**：
<template is="msgItem" data="{{...item}}"/>
//**百度**：
<template is="msg-item" data="{{ {...item} }}" />
```


> 1. 百度小程序data属性外需要增加一个大括号
> 2. 百度小程序的名称改为小写字母与中划线“-”的组合

### `for`和`if`作用于同一标签

微信可以使用，百度禁止， 编译会报错

> 注意: `s-if` 与 `s-for` 不可在同一标签下同时使用。

将微信中的`if`标签，借助虚拟组件block，分成父子组件。

例：

     <view wx:for="{{list}}" wx:if="{{item}}">test</view>
 转化为

     <view s-for="item, index in list">
	     <block s-if="item">test</block>
     </view>

### 双向绑定

```
//**微信**：
<scroll-view scroll-into-view="{{toView}}" scroll-top="{{scrollTop}}">
    <view id="green" class="scroll-view-item bc_green"></view>
</scroll-view>

//**百度**：
<scroll-view scroll-into-view="{=toView=}" scroll-top="{=scrollTop=}">
    <view id="green" class="scroll-view-item bc_green"></view>
</scroll-view>
```


>微信的插值语法{{}}，百度的是{= * =}

### wxs语法

> 微信使用 wxs 来进行数据处理，定义共用函数段；对应的百度的 sjs 语法

```
//**微信**：
<wxs module="test">
    var some_msg = "hello world";
    module.exports = {
        setPosition: function (position) {
            return 'transform: translateX(' + position.pageX + 'px);';
        }
    }
</wxs>

//**百度**：
<import-sjs module="test">
    var some_msg = "hello world";
    module.exports = {
        setPosition: function (position) {
            return 'transform: translateX(' + position.pageX + 'px);';
        }
    }
</import-sjs>
```

## 样式文件

> 小程序间的样式完全一样，只是文件后缀名不同， 微信为.wxss，百度为.css

注意：百度小程序的用户样式代码和系统样式代码的解析优先级与微信不同，选择器的权重也不一样，所以在使用时，需要重点关注样式覆盖和冲突的问题

## 鉴权相关
微信小程序和百度小程序的第三方Oauth鉴权基本方案一致，细微差异上文有提及。需要突出的是百度内部小程序在两个平台的行为不同。
1. 微信小程序需要和百度用户体系打通关联，使用的都是pass提供的统一小程序鉴权SDK，包含用户鉴权，正常化，绑定等一系列行为
2. 百度小程序则使用内部提供的私有能力(BDUSS,SToken)来获取用户身份信息

## 综上
所以，用户在小程序迁移和转换时，需要将上述功能和差异进行等价转化，让代码不仅在微信上能运行，也能在百度上正常运行。

幸运的是，wx2any已经帮用户完成了这些，只需要通过npm安装，就可以一键转换你的微信小程序。
