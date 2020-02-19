#### 安装使用

### 使用可视化工具

可视化工具目前已支持Mac操作系统

点击下载后，安装使用

下载地址：https://pan.baidu.com/s/1vCKMSonMN6DmnNNJSmqIIQ

提取密码:vdjh

JOY-CLI可视化界面如下：

![JOY-CLI可视化界面](https://issuecdn.baidupcs.com/issue/netdisk/ts_ad/help/1582081214.png)

### 使用源代码

首先，我们需要通过`Git`下载 `JOY` 的代码仓库

```
git clone http://gitlab.baidu.com/wangpanfe/joy-cli.git
```

?> 目前通过下载代码仓库的方式进行安装，后续会升级为npm安装的形式，优化使用的体验

然后，进入项目目录，安装依赖

```
cd joy-cli
```

```
npm i
```

项目安装完成以后，我们需要将JOY命令设为全局，如下：

```
npm link
``` 

此时，我们就设置好了全局软链

我们切换到自己需要转换的小程序的工作目录，执行全局命令joy，并指定转换目录路径，和输出目录路径

```
joy test/miniProgram test/smartProgram
```

?> Surprise~ 项目已经转化完成了，赶快运行试试吧