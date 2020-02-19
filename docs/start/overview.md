## 实现思路

项目整体采用`context` + `processor（lifeCycles）` 的方式管理整个流程。

![image](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1574391164.png)

## 公共规则

抽离公共规则，实现规则派生，使规则和流程隔离。

## 上下文

包装上下文，给每一个流程使用，且每一个流程只能和context交互。

## 流程

抽离流程，使流程专注于当前阶段需要做的事情，无需关心规则。

## 生命周期

| 生命周期      |     说明 |      |
| :-------- | --------| :------ |
| bootstrap    |   复制文件，根据文件后缀进行映射 |  field3  |
| config    |   处理project.config.json文件 |  field3  |
| View    |   转换视图文件 |  field3  |
| css    |   转换css文件 |  field3  |
| js    |   转换filter或sjs文件 |  field3  |
| API    |   转换API |  field3  |

>  举个例子，拿生产手机的流水线来说，所有手机的生产流程都是一致的，不管是生成 iphoneX（转微信小程序） 还是 华为P30（转百度小程序），只要给流水线提供零件（转换规则）并且遵循这套标准规则（转换流程）就可以得到想要的结果。
>  如果后续需要生成 其他牌子的手机（转支付宝小程序或其他小程序），也是如此。 扩展性和标准性有很显著的提升。

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

## 设计图

![图片](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1582086033.png)

## 生成项目基本文件目录

> 使用`recursive-copy`库，完成文件的整体拷贝，替换文件名后缀，例：.wxml===> .swan

## 转换json文件，去掉组件驼峰

> 1、找到josn文件里“usingComponents“包含的值，将组件引用中的驼峰改为kebabCase
> 2、若包含抽象节点“componentGenerics“字段，手百中不支持，存放在错误日志中

⚠️将修改后的组件名的映射关系记录在全局的contextStore中，属性值为“renamedComponents“，视图层中转换中需要使用新的组件名

## AST实战讲解

> 以下的转换逻辑会大量依赖babel,进行AST的代码转换，所以我们先巩固下**抽象语法树**相关的知识。

可能刚接触AST的人会感觉无从下手，毕竟ast相关的知识点确实比较繁杂，而且相关的入门指导比较少。这里我们以一个完整的例子，过一下AST常用基本语法，方便大家入门，虽说是入门，但如果熟练掌握，已经可以应用于实际开发了。

1. 打开在线AST工具，发现新大陆长这样

![](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1576045519.png)
高亮的是对应的代码段，左边是一个对象的属性，右边对应ast中的节点信息。

注意：js中不同的数据类型，对应的ast节点信息也不竟相同。以图中为例，externalClasses对象的节点信息中类型（type）是ObjectProperty，包含key ,value等关键属性（其他类型节点可能就没有）

2. 打开transform开关，选择转换引擎，又发现了新大陆

![](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1576045521.png)

![](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1576045516.png)

这里我们选择babel和配套的acorn，可以根据实际需要自己选择，这只是推荐。

注意选择最新的babel7版本，不然下面例子中的类型会匹配不上，

3. 现在的界面结构展示如下图，接下来就开始进行转换逻辑的代码编写
![](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1576045517.png)

**假设我们的目标是要把properties属性中key为‘current’的属性改为myCurrent。let's go!**

**原始代码：**
```
/*eslint-disable*/
/*globals Page, getApp, App, wx,Component,getCurrentPages*/
Component({
  externalClasses: ['u-class'],

  relations: {
    '../tab/index': {
      type: 'child',
      linked() {
        this.changeCurrent();
      },
      linkChanged() {
        this.changeCurrent();
      },
      unlinked() {
        this.changeCurrent();
      }
    }
  },

  properties: {
    current: {
      type: String,
      value: '',
      observer: 'changeCurrent'
    }
  },

  methods: {
    changeCurrent(val = this.data.current) {
      let items = this.getRelationNodes('../tab/index');
      const len = items.length;

      if (len > 0) {
        items.forEach(item => {
          item.changeScroll(this.data.scroll);
          item.changeCurrent(item.data.key === val);
          item.changeCurrentColor(this.data.color);
        });
      }
    },
    emitEvent(key) {
      this.triggerEvent('change', { key });
    }
  }
});

```

首先在原始代码中选中'current'，查看右边ast的节点结构，如图：

![](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1576045519.png)
这是一个对象属性（ObjectProperty），关键节点信息为key和value，key本身也是一个ast节点，类型为Identifier（准确的应该是StringIdentifer，常用的还有NumberIdentifer等）,'curent'是里面的name属性。所以我们的第一步就是找到改节点，然后修改它。

**查找**

```
export default function (babel) {
  const { types: t } = babel;
  
  return {
    name: "ast-transform", // not required
    visitor: {
      Identifier(path) {
        //path.node.name = path.node.name.split('').reverse().join('');
      },
       ObjectProperty(path) {
         if (path.node.key.type === 'StringIdentifier' && 
             path.node.key.name === 'current') {
         	console.log(path,'StringIdentifier')
         }
  	   }
    }
  };
}

```

这里需要用到`@babel/types`[https://babeljs.io/docs/en/babel-types](https://babeljs.io/docs/en/babel-types)来辅助我们进行类型判断,开发中会非常依赖这个字典进行查找

在控制台会看见，path下面的节点信息很多，关键字段为node和parentPath，node记录了该节点下数据信息，例如之前提到过的key和value。parentPath代表父级节点，此例中表示ObjectExpression中properties节点信息，有时我们需要修改父节点的数据，例如常见的节点移除操作。接下来我们修改该节点信息。

**修改**

在`@babel/types`中找到该ObjectProperty的节点信息如下，我们需要需要构造一个新的同类型节点（ObjectProperty）来替换它。
![](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1576045742.png)
可以看到关键信息是key和value，其他使用默认就好。value里面的信息我们可以照搬，从原有的path里面获取，我们更改的只是key里面的标识符'current'。因为key本身也是一个ast节点，所以我们还需要查看字典，看看生成Identifier节点需要什么参数，步骤一样。修改代码如下：
```
ObjectProperty(path) {
         console.log(path,'ObjectProperty--')
         if (path.node.key.type === 'Identifier' && 
             path.node.key.name === 'current') {
            //替换节点
           path.replaceWith(t.objectProperty(t.identifier('myCurrent'), path.node.value));
         }
  	   }
```
> 其中我们用到了replaceWith方法，这个方法表示用一个ast节点来替换当前节点。
还有一个常用的replaceWithSourceString方法，表示用一个字符串来代替该ast节点，参数为一串代码字符串，如：'current : {type:String};'，感兴趣的，可以自己试试。

最后查看转换后的代码，发现'current'已经被我们替换成了'myCurrent'。

![](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1576045791.png)

到这里，一个完整的例子就演示完了。这里补充说明一下，在实际中可能会遇到嵌套结构比较深的ast结构。我们需要嵌套类型判断，比如：

```
ObjectProperty(path) {
     console.log(path,'ObjectProperty--')
      MemberExpression(memberPath) {
          console.log(path,'memberPath--')
      }
 }
```

因为遍历中的path指定的是当前匹配的节点信息。所以可以为不同的类型遍历指定不同的path参数，来获取当前遍历的节点信息，避免path覆盖，例如上面的path和memberPath。

到这里，babel的基本用法就差不多介绍完了，想要熟练掌握，还需要你在项目中反复练习和实践。想系统学习babel，并在实际项目中使用的同学可以先看看这篇babel的[介绍文档](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-traversal)，边写边查，巩固学习

## 逻辑层转换

借助babel的三剑客：`@babel/parser`、`@babel/traverse`、`@babel/generator`。

>  js的转换规则较复杂，会大量依赖`babel/types`做类型判断，并借助[在线AST工具](https://astexplorer.net/)辅助测试。

	          +--------+                     +----------+
	Input ->- | Parser | ->- Syntax Tree ->- | Compiler | ->- Output
	          +--------+          |          +----------+
	                              X
	                              |
	                       +--------------+
	                       | Transformers |
	                       +--------------+
	                       

1. 名称不同，功能相同的api，需要做映射，例：

`navigateToMiniProgram` ===>  `navigateToSmartProgram`

2. 自定义组件的处理：

百度小程序构造器不支持的属性： moved，relations， observers

内置behaviors的处理：

    `wx://form-field` ===>  `swan://form-field`
    `wx://component-export` ===>  `swan://component-export`

    `relations`中若有使用link回调函数，则对应到百度的attached生命周期中执行，
    配套使用的`getRelationNodes`，则对应百度的selectComponent方法。
    
    为解决页面多组件实例的问题，引入swanId做为唯一标识，我们会为有依赖关系的组件添加swanId属性，同一组的父子组件共用一个swanId。
    
    所有的父子组件的依赖关系存在在全局的contextStore中,供视图层添加swanId时使用

3. 独有api无法自动匹配，存放到转换日志中，需手动删除或替换对应逻辑

4. 关键词替换：wx ===>  swan

## 视图层转换

> 视图层的转换也是使用的AST，借助`stricter-htmlparser2`将html转化为节点树，遍历，替换指定节点，最后生成新的html结构。

```
<view wx:='aaa'>test</view>
"parseHtml": {
        "type": "tag",
        "name": "view",
        "attribs": {
            "wx:": "aaa"
        },
        "children": [
            {
                "data": "test",
                "type": "text"
            }
        ],
        "singleQuoteAttribs": {},
        "selfclose": false
    }
```

## 循环和条件判断

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

转换逻辑为：

> 1. 将wx:替换为s-，例：wx:if  =====>  s-if
> 2. 去掉插值语法(花括号)
> 3. wx:for， wx:for-index，wx:for-item合并为s-for="p,index in persons"

### 模版的转换

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

转换逻辑为：

> 1. data属性外增加一个大括号
> 2. 名称改为小写字母与中划线“-”的组合

### `for`和`if`作用于同一标签

微信可以使用，手百禁止， 编译会报错

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

转换逻辑为：

>将插值语法变换为{= * =}

### wxs语法

> 微信使用 wxs 来进行数据处理，定义共用函数段；对应的百度的 filter 语法

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
<filter module="test">
    var some_msg = "hello world";
    export default {
        setPosition: function (position) {
            return 'transform: translateX(' + position.pageX + 'px);';
        }
    }
</filter>
```
转换逻辑为：

> 将 module.exports 替换为 export default

> 注：百度的 filter 中不支持导出变量，但是微信是支持的，所有这部分需要开发者手动处理下逻辑

## 样式文件转换

> 小程序间的样式完全一样，只是文件后缀名不同，只需要替换引入的样式文件后缀 wxss ===>  css

例：

  @import "header.wxss";

  转化为：

  @import "header.css";
    
## 转换日志

小程序互转工具-Joy，在实现各寄主小程序互相转换的同时，生成转换日志，提供使用工具者参考，让更改点与错误点暴露在使用者面前。因JSON格式的日志冗杂，不易使用者观看，所以开发日志可视化设计，将其划分为为5个级别：Fatal、Warning、Notice、Trace、Debug，增加日志的可读性，提升用户体验。

> **注**：小程序独有能力和私有能力，部分无法100%进行转化，进行了一定降级处理。

## 其它

对小程序和babel感兴趣的可以去看看代码，应该会有所收获，并能发现其中还存在的一些问题，欢迎讨论学习，并为JOY贡献出自己的力量。