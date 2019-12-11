# 快速开始

首先，我们需要下载 `JOY` 的代码仓库

```
git clone http://gitlab.baidu.com/wangpanfe/joy-cli.git
```

?> 目前可以通过下载代码仓库的方式进行安装，后续我们会考虑升级为npm安装的形式，优化大家的体验

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

此时，我们就设置好了全局软链，我们切换到自己需要转换的小程序的工作目录，执行全局命令swan，并指定转换目录路径，和输出目录路径

```
swan test/miniProgram test/smartProgram
```

Surprise~ 项目已经转化完成了，赶快运行试试吧