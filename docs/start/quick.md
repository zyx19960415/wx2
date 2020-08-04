## 安装使用

### 准备工作
* node安装（要求Node >=8 && NPM >= 3）
* 全局安装：npm install wx2 -g


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
$ wx2 <微信小程序文件夹> <目标小程序文件夹> --target

$ wx2 <微信小程序文件夹> <目标小程序文件夹> --target=swan

# 微信小程序
$ wx2 <微信小程序文件夹> <目标小程序文件夹> --target=wx

# 当前版本暂不支持，qq小程序
$ wx2 <微信小程序文件夹> <目标小程序文件夹> --target=qq
```

### 命令行参数
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


微信小程序Demo代码库地址：https://github.com/wechat-miniprogram/miniprogram-demo

<video controls="controls" preload="auto" poster="https://staticiot.cdn.bcebos.com/wx2-org/img/loading.png" width="600" height="335">
    <source src="https://staticiot.cdn.bcebos.com/wx2-org/video/trans_demo.mp4" type="video/mp4">
</video>

?> Surprise~ 项目已经转化完成了，赶快运行试试吧
