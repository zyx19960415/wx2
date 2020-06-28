# 云数据库转换的兼容方案

## 云数据库的操作使用
云开发提供了NoSQL的文档数据库，可供开发者存储、查询数据。开发者可以在智能小程序端和云函数端通过SDK对数据库进行操作。

### 云数据库的操作
微信小程序与智能小程序在开发者工具上操作的流程与步骤是一致的。点击数据库，操作对应集合、记录或是索引设置。

数据库提供的数据类型如下：
* String：字符串
* Number：数字
* Object：对象
* Array：数组
* Bool：布尔值
* Date：时间
* Geo：地理位置类型
* Null


数据库的操作依赖于管理端以及SDK端，管理端的操作方式基本上一致，因此云数据库的开发在互转中需要做好SDK端的处理。

### SDK端的操作

在代码中操作数据库首先需要初始化数据库，智能小程序通过swan.cloud.database()来实现，可以通过传入env参数来获取指定环境的数据库的引用。

微信小程序也类似是使用wx.cloud.database()方式去初始化。下面主要介绍两者所包含API的对比。

|API|微信小程序|百度小程序|
|---|---|---|
| collection（引用）| doc |doc|
| | get |get|
||add|add|
||count|count|
||where|where|
||orderBy|orderBy|
||limit|limit|
||skip|skip|
||field|field|
| docs（获取指定 ID 的记录数据）| get |get|
| |update  |update|
| | set |set|
| |remove  |remove|
|command（数据库相关查询及更新指令）| eq、neq、lt、lte、 gt 、gte 、in 、nin 、and、 or、 set、 remove、 inc 、mul、 push、 pop、 shift、 unshift |eq、neq、lt、lte、 gt 、gte 、in 、nin 、and、 or、 set、 remove、 inc 、mul、 push、 pop、 shift、 unshift|
|地图定位|Geo  |Geo|
|服务端时间对象 |serverDate|serverDate|
| 正则匹配| RegExp|RegExp|

## 云数据库的兼容方法

由上述API方法整合对比可知，兼容方法如下：

* 开发者工具管理后台数据同步，确保对应的数据库一致。
* 由于API方法一致，因此在代码层面操作数据库时，需要在互转后的文件修改对应的前缀，例如wx转换成swan,其他API无需转换，保持一致即可。