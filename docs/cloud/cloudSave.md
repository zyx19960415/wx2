# 云存储转换的解决方案

## 云开发的使用

云开发为开发者提供完整的原生云端支持和微信服务支持，即无需搭建服务器即可拥有云端能力。

本文主要分析在小程序使用云存储时如何进行转换。

## 云存储的转换方案

### 存储面板管理
在创建小程序时，选择使用云端功能开发。继而打开云存储控制面板可查看管理文件。包括上传文件，新建文件夹，删除文件。

在上述功能上，百度开发者工具与微信开发者工具是一致的，都完全支持。

因此在开发者转换项目时只需要同步对应云端存储数据即可。

### 通过API的存储控制
在小程序内部利用代码实现文件存储操作时，在API层面要求进行相应转换。

微信小程序和智能小程序在云存储中主要有以下功能：
* 删除文件
* 下载文件
* 上传文件
* 获取文件链接

1. API对比如下：

| API | 微信小程序 | 智能小程序 |
| ---- | ---- | ---- |
| uploadFile | wx.cloud.uploadFile | swan.cloud.uploadFile |
| downloadFile |wx.cloud.downloadFile | swan.cloud.downloadFile |
|deleteFile|wx.cloud.deleteFile | swan.cloud.deleteFile |
|getTempFileURL| wx.cloud.getTempFileURL| - |

转换方案：

针对云存储API，wx2后续将API中wx转换swan（互转）。

当出现getTempFileURL方法需要将微信小程序转换成智能小程序时，需要开发者配置在智能小程序中删除该方法。

2. 参数对比

公共参数：
* success: 接口调用成功的回调函数
* fail: 接口调用失败的回调函数
* complete: 接口调用结束的回调函数
* config：全局配置

特殊参数：

| API | 微信小程序 | 智能小程序 |
| ---- | ---- | ---- |
| uploadFile|cloudPath、filePath| cloudPath、filePath|
|downloadFile|fileID| fileID	|
|deleteFile|fileList|fileList |
|getTempFileURL|-|-|


由于上述各个API参数已对齐，因此无需转换，保持原状即可。