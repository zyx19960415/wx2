#### 安装使用

### 使用源代码

首先，我们需要通过`Git`下载 `wx2any` 的代码仓库

```
git clone ssh://icode.baidu.com:8235/baidu/bp/joy-cli
```

然后，进入项目目录，安装依赖

```
cd joy-cli && npm install
```

项目安装完成以后，我们需要将wx2any命令设为全局，如下：

```
npm link
``` 

此时，我们就设置好了全局软链，接下来，我们通过`wx2any`进行转换一个微信小程序Demo

```
wx2any miniprogram-demo ./miniprogram-demo-swan
```

微信小程序Demo代码库地址：https://github.com/wechat-miniprogram/miniprogram-demo

<video controls="controls" preload="auto" poster="/union-static/public/static/joy-org/img/loading.png" width="600" height="335">
    <source src="/union-static/public/static/joy-org/video/trans_demo.mp4" type="video/mp4">
</video>

?> Surprise~ 项目已经转化完成了，赶快运行试试吧

### 使用可视化工具

可视化工具目前已支持Mac操作系统

点击下载后，安装使用

下载地址：https://pan.baidu.com/s/1vCKMSonMN6DmnNNJSmqIIQ

提取密码:vdjh

wx2any可视化界面如下：

![wx2any可视化界面](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1582081214.png)
