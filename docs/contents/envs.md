# 多端适配

由于微信和百度的平台还是存在一些无法消除的差异，很难将一份代码完美转换。且开发者项目中可能也存在产品需求带来的平台功能差异性，需要开发者针对不同平台进行差异配置。所以我们提供了不同平台的解决方案

### 使用
切换到自己指定的工作目录，执行全局命令`wx2`，并指定`转换目录路径`，和`输出目录路径`

#### 指定目标小程序

使用命令行参数`--target`，简写`-t`
```
// 将多端适配后的代码转换为干净的微信小程序
wx2 <兼容后的小程序文件夹> <目标小程序文件夹>  --target=wx

// 将多端适配后的代码转换为干净的智能小程序
wx2 <兼容后的小程序文件夹> <目标小程序文件夹> --target=swan

```

### App类型
从开发者执行的命令的`--target`中获取的，`appType`目前包含以下值
* swan: 百度智能小程序
* wx: 微信小程序

下述文档内，如有提及`appType`，默认情况下指代的都是这里罗列出来的`appType`


### 配置文件
提供 `_${appType}Env` 在不同端中做差异配置，在百度小程序中会将`_swanEnv`的值和外部配置做替换，在微信小程序中忽略该配置。反之，在微信小程序中会将`_wxEnv`的值和外部配置做替换，在百度小程序中忽略该配置。

如
```js
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
  // 提供 _wxEnv，在微信小程序中跟外部的配置做替换，在智能小程序中删除
    "_wxEnv": {
        "window": {
            "navigationBarTitleText": "微信Demo"
        }
    }
}
```

处理后的智能小程序代码

```js
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

```wxml
<view>
    <wx-env>
        <view class="wx-tip">
            欢迎使用微信小程序
        </view>
    </wx-env>
    <swan-env>
        <view class="swan-tip">
            欢迎使用智能小程序
        </view>
    </swan-env>
</view>
```

处理后的智能小程序代码

```swan
<view>
    <view class="swan-tip">
        欢迎使用智能小程序
    </view>
</view>
```