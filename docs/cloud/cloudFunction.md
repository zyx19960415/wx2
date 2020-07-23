# 云开发之云函数的兼容方案

云函数是一段运行在云端的代码，不需要管理服务器，只要在开发者工具内编写、一键上传部署即可运行后端代码。

## 智能小程序的云函数相关

### 云函数函数管理

在智能小程序的开发者工具中可进行函数的管理，包括新建函数、查询函数、测试函数、配置函数以及删除函数，同时也支持日志的查看。

1. 云函数后端操作过程

* 新建云函数： 输入名称 -> 函数描述 -> 运行环境 -> 创建方式 -> 执行方法
* 配置云函数： 配置环境变量，运行云函数时注入到process.env中
* 测试云函数： 点击运行测试
* 查看日志： 按函数名筛选以及requestID搜索

2. 编辑器中的云函数操作

* 在 project.config.json 文件中设置 cloudfunctionRoot 字段来指定云函数的本地目录。
* 查看当前环境
* 切换环境
* 新建 Node.js 云函数
* 下载线上环境的云函数列表并在本地生成空文件夹
* 下载线上环境的云函数代码并覆盖本地
* 上传并部署云函数到线上环境

3. 使用过程

在云函数中，可以使用 swan-server-sdk 来访问当前环境中的其他资源，包括调用另一个云函数。

A. 安装最新的swan-server-sdk安装包

```
// package.json
"dependencies": {
  "swan-server-sdk": "latest"
}
```

B. 引入SDK,并使用swan.cloud.init初始化

```
// js
const cloud = require('swan-server-sdk');
```

C. 编写云函数（异步使用async）
```
exports.main = async (event, context) => {
    const someAsyncData = await getAsyncData()
    return someAsyncData
}
```

D. 在云函数中调用另一个云函数，是通过.callFunction()方法去调用。
```
exports.main = async (event, context) => {
    cloud.init(context);
    let resp = await cloud.callFunction({
        name: 'sum',
        data: {
            numbers: [1, 2, 3, 4]
        }
    });
    console.log(resp);
    return 'sum: ' + resp.result
};
```

## 微信小程序的云函数相关
微信小程序使用云函数开发步骤基本与智能小程序一致。

* 配置云函数本地目录
在项目根目录中可以使用 project.config.json 文件，在其中定义 cloudfunctionRoot 字段，指定本地已存在的目录作为云函数的本地根目录。
* 查看和切换环境。
* 新建 Node.js 云函数。
在云函数根目录上右键，在右键菜单中，可以选择创建一个新的 Node.js 云函数，开发者工具在本地创建出以下目录和文件，同时在线上环境中创建出对应的云函数云。
* 下载云函数、上传并部署。

编写云函数

```
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

// 调用该云函数
wx.cloud.callFunction({
  // 云函数名称
  name: 'add',
  // 传给云函数的参数
  data: {
    a: 1,
    b: 2,
  },
  success: function(res) {
    console.log(res.result.sum) // 3
  },
  fail: console.error
})
```

## 云函数兼容方案

### 初始化函数兼容
智能小程序引入swan-server-sdk，微信小程序引入wx-server-sdk；

### 获取云函数上下文
智能小程序获取上下文使用cloud.getSwanContext，微信小程序使用cloud.getWXContext；

两个方法内部参数不一致，因此转换方式如下：

| 属性 | getSwanContext | getWXContext |
|---|---|---|
|USERID | 智能小程序用户 ID | -|
|APPID |智能小程序 APPID|小程序 AppID，小程序端调用云函数时有 |
|ENV | 云开发环境 | 云开发环境|
|SOURCE |调用来源 |调用来源（云函数本次运行是被什么触发） |
|OPENID	|-|小程序用户 openid，小程序端调用云函数时有|
|UNIONID|-|小程序用户 unionid，小程序端调用云函数，并且满足 unionid 获取条件时有|
|CLIENTIP|-|小程序客户端 IPv4 地址|
|CLIENTIPV6|-|小程序客户端 IPv6 地址|

由于在使用云函数中获取上下文的API略有不同， 因此内部参数需要做如上转换。

### 管理后台配置

考虑到两个开发者工具配置界面不同，在开发者工具中新建云函数时，存在操作不同的情况，因此在配置中需要根据对应操作指引进行同步。

### 调用云函数转换

在调用云函数时,智能小程序与微信小程序同样都是使用callFunction方法，然而这个API由于包括服务端使用和前端使用，因此会存在一些差异，callFunction函数参数对比如下：

|参数|类型|服务端|前端|
|---|---|---|---|
|name|string|云函数名|云函数名|
|data|Object|传递给云函数的参数|传递给云函数的参数，在云函数中可通过 event 参数获取|
|config|Object|-|配置|
|success|Function|-|接口调用成功的回调函数|
|fail|Function|-|接口调用失败的回调函数|
|complete|Function|-|接口调用结束的回调函数（调用成功、失败都会执行）|

需要注意的是，由于server端和前端调用callFunction方式不同，对于同名API使用上需要注意。