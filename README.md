# 微信小程序转换工具

>  基于已有的原生微信小程序项目，提供零成本平移转换的能力，对小程序间差异进行抹平，提供简单快捷的 API，助力开发者快速互转已有小程序项目

### 说明
+ 工具会帮你将已有的原生微信小程序转换为目标小程序，目前支持度最好的为百度小程序，其他小程序的能力正在补充中
+ 工具虽然不能完成100%的转换，但可以帮你节省大量的重复开发成本，随着迭代优化，未来转换率会越来越高
+ 目前只支持转`百度小程序`，后续支持QQ、支付宝、头条等小程序

## Quick Start
###  安装

```bash
$ npm i wx2 -g
```

### 使用
切换到自己指定的工作目录，执行全局命令`wx2`，并指定转换`目录路径`，和输出`目录路径`

```bash
// 当前只支持百度小程序，其他小程序后续支持
$ wx2 <微信小程序文件夹> <目标小程序文件夹>
```
> 注： 路径中请包含'/'作为路径标识

### 指定目标小程序
使用命令行参数`--target`，简写`-t`
```bash
# 默认，百度小程序
$ wx2 <微信小程序文件夹> <目标小程序文件夹> --target=swan

# 当前版本暂不支持，qq小程序
$ wx2 <微信小程序文件夹> <目标小程序文件夹> --target=qq
```

### 配置
如果你的项目中有专属的自定义函数回调名，接口名，逻辑降级处理等，请在微信项目根目录下放置`.wx2rc.js`文件，并填写如下：
```javascript
/**
 * @file .wx2rc.js
 */
module.exports = {
    // 内部项目（internal;外部项目（external）
    projectType: 'external',
    // 微信登录pass的跳转页面函数，推荐默认为bdWxLogin，可配置其他值
    bdWxLogin: 'bdWxLogin',
    // 微信open-type的回调函数,默认推荐为getuserinfo，可配置其他值
    getuserinfo:'getUserInfoHandle',
    // ...其他自定义转换规则
};
```
> 注：目前工具只支持识别展示的三项配置，非常希望您把需要新增的自定义配置告诉我们，增加我们的处理能力

## 二次迭代

由于微信和百度的平台还是存在一些无法消除的差异，很难将一份代码完美转换。且开发者项目中可能也存在产品需求带来的平台功能差异性，所以我们提供了二次迭代的解决方案

### 使用

将二次迭代后的代码转换为微信小程序:  `wx2 <兼容后的小程序文件夹> <目标小程序文件夹>  --target=wx`
将二次迭代后的代码转换为百度小程序：`wx2 <兼容后的小程序文件夹> <目标小程序文件夹> --target=swan`

### App类型
从开发者执行的命令的`--target`中获取的，`appType`目前包含以下值
+ swan: 百度智能小程序
+ wx: 微信小程序

下述文档内，如有提及`appType`，默认情况下指代的都是这里罗列出来的`appType`


### 配置文件
提供 `${appType}Env` 在不同端中做差异配置，在百度小程序中会将`_swanEnv`的值和外部配置做替换，在微信小程序中忽略该配置。反之，在微信小程序中会将`_wxEnv`的值和外部配置做替换，在百度小程序中忽略该配置。

如
```
{
  "pages": [
        "index/index"
   ],
  // 提供 _swanEnv，在百度小程序中跟外部的配置做替换，在微信小程序中删除
  "_swanEnv": {
	  "window": {
		  "navigationBarTitleText": "百度Demo"
	   }
  },
  // 提供 _wxEnv，在微信小程序中跟外部的配置做替换，在百度小程序中删除
  "_wxEnv": {
	"window": {
		  "navigationBarTitleText": "微信Demo"
	 }
  }
}
```

处理后的百度小程序代码

```
{
  "pages": [
        "index/index"
   ],
   "window": {
		"navigationBarTitleText": "百度Demo"
   }
}
```

### 逻辑文件

根据不同平台的js逻辑，提供一个环境变量`process.env.APP_TYPE`，默认为`swan`,可以通过该变量书写不同应用平台下的逻辑代码。在搬家工具处理时，会将`process.env.APP_TYPE`替换为对应的`appType`常量值。如

```js
if (process.env.APP_TYPE === 'swan') {
	// 在百度平台内 do something
}
else {
	// 在其他平台 do something
}
```

处理后的百度小程序代码

```js
if ('swan' === 'swan') {
	// 在百度平台内 do something
}
else {
	// 在其他平台 do something
}
```

### 模板文件

提供`${appType}-env`标签，标识在不同平台上的运行代码，该标签只是一个占位符，不支持相互嵌套，用来包裹正式的模板代码，在特定平台加载特定代码，如

```html
<view>
    <wx-env>
        <view class="wx-tip">
	        欢迎使用微信小程序
        </view>
    </wx-env>
    <swan-env>
        <view class="swan-tip">
	        欢迎使用百度小程序
        </view>
    </swan-env>
</view>
```

处理后的百度小程序代码

```html
<view>
     <view class="swan-tip">
	     欢迎使用百度小程序
     </view>
</view>
```

## 联系我们
netdisk-fe@baidu.com

### ChangeLog
V0.0.5 (2020-02-06)
1、JOY(wx2工具的内部名称，下同) 可视化转换工具 诞生（目前支持Mac操作系统安装）

V0.0.4（2019-01-06）
1、微信网盘小程序 转 QQ小程序 已知问题Fix

V0.0.3（2019-12-25）
1、增加 微信网盘小程序 转 QQ 小程序

V0.0.2（2019-12-18）
1、增加 微信小程序 转 QQ小程序

V0.0.1 (2019-11-11)
1、支持 微信小程序 与 智能小程序 互转

## FAQ
Q1：请问有支持Windows系统的可视化转换工具吗？
A1：目前开发小哥哥已经在加班加点开发中了，马上会进入测试阶段，预计三月底能够推出Windows版本的呦！

Q2：使用了wx2 和百度开发者工具，发现都需要进行一定的二次开发，请问JOY能否支持互转出来就可以直接提审使用呢？
A2：由于平台间的差异，并不能100%进行互转，而是针对部分功能进行了降级处理，如果开发者可以接受降级方案就不需要进行二次开发，但为了保证不会由于降级操作而导致阻塞产品流程，还是建议转换后让产品进行全功能体验一下。

Q3：请问带支付功能的系统可以进行迁移吗？
A3：由于支付百度和微信的支付都需要进行后台的参数的申请。没办法直接进行转换，之后会把转换步骤给大家整理出来。

Q4：使用 uni-app 之类的工具开发出来的小程序，JOY支持进行互转吗？
A4：wx2互转工具是针对原生开发的小程序进行互转的，不支持转换 uni-app 之类的项目。

## 吐槽地址
https://support.qq.com/products/123203

## License
wx2 is MIT licensed.
