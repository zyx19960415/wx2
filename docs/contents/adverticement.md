# 广告兼容开发文档

## 广告接入的相关指引

小程序页面内，由小程序流量主决定实际展示位置。因此首先需要申请“流量主”功能。
智能小程序和微信小程序的广告接入流程基本一致，具体流程如下：
* 创建账号，完善用户信息，开通“流量主”功能。
* 创建广告位。
* 获取广告位的代码片段。
* 嵌入广告代码。
* 提交广告审核。

## 微信小程序 & 智能小程序广告接入差异

### 智能小程序
小程序支持的广告样式包括：banner 广告、信息流广告。其中信息流广告为内测阶段。

智能小程序的广告是使用<ad></ad>标签组件，具体属性如下：

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
| :----: | :----: | :----: | :----: | :----: |
| appid | String || 是 | 小程序应用ID |
| apid | String || 是 | 小程序广告位ID |
| type | String | feed | 否 |	广告类型：banner/feed |
|updatetime|	String||		否|	更改该属性，可以触发广告刷新|
|binderror|	EventHandle	||	否|	广告组件加载失败时触发（返回参数为错误码）
|bindload|	EventHandle	||	否|	广告组件加载完成触发
|bindclose|	EventHandle	||	否|	关闭广告组件时触发
|bindstatus	|EventHandle	||	否|	贴片类型广告播放期间触发

示例代码如下:
```bash
// 模板代码
<view class="ad-container">
    <ad appid="a764cad8" 
        apid="6511101" 
        type="banner" 
        updatetime="{{updatetime}}"
        binderror="binderror"
        bindload="bindload"
        bindclose="bindclose"
        bindstatus="bindstatus">
    </ad>
</view>
```

对于前贴或者后贴视频，会在外层多一个video标签，示例如下:
```bash
<video src="https://b.bdstatic.com/miniapp/development_tool/Smartprogram.mp4">
    <ad appid="bf483fb1" 
        apid="6575220" 
        type="pre-roll"
        updatetime="{{updatetime}}" 
        binderror="binderror"
        bindload="bindload"
        bindclose="bindclose"
        bindstatus="bindstatus">
    </ad>
</video>
```

### 微信小程序
微信小程序广告类型较多，主要分为以下几类：
* Banner广告
* 激励视频广告
* 插屏广告
* 视频广告
* 视频前贴广告
* 格子广告

而以上这些广告引入方式有不同程度的差异，下面将针对几种典型用法进行简要介绍：

1. Banner广告 & 视频广告 & 格子广告

```bash
<view class="adContainer">
  <ad unit-id="xxxx" 
      bindload="adLoad" 
      binderror="adError" 
      bindclose="adClose"
      ad-type="video/grid" 
      ad-theme="white"
      ad-intervals="30"></ad>
</view>
```
Banner广告与视频广告区别在于ad-type，默认是Banner广告，当值为video时为视频广告,值为grid时为格子广告。

2. 激励视频广告 & 插屏广告

两种广告是通过调用方法初始化一个单例，该实例仅对当前页面有效，不允许跨页面使用。

|广告类型|方法属性|主要参数|
|----|----|----|
|激励视频广告|wx.createRewardedVideoAd| adUnitId |
|插屏广告| wx.createInterstitialAd| adUnitId |

3. 视频前贴广告

视频前贴广告与视频广告很像，区别在于参数不一致，且可以通过wx.preloadVideoAd支持预加载，示例如下。
```bash
<video 
  class="xxx"
  src="xxx"
  bindadplay="onAdplay"
  bindadload="onAdload"
  bindadclose="onAdclose"
  bindaderror="onAdError"
  ad-unit-id="xxx"
>
</video>
```

## 兼容开发方案

广告开发兼容方式主要针对广告信息同步、广告类型转换、广告API & 模板开发转换。

### 广告信息同步

新建好两个平台的账号，开通相应的“流量主”功能，创建相应的广告位，并取到相应的广告位id，广告id等必要参数，做好准备工作。

### 广告类型转换

由于智能小程序和微信小程序的广告类型并不完全对称，因此在转换上也会产生一定的gap。


| 微信广告 | 百度广告 | 说明 |
| :----: | :----: | :----: |
|Banner通栏广告|Banner通栏广告||
|-| feed信息流广告|微信无信息流广告类型（不转换）|
| 前贴广告 | 前贴/后贴广告| |
| 视频广告 | - | 智能小程序视频广告（不转换） |
| 格子广告 | - | 智能小程序无格子广告（不转换） |  
| 激励视频广告| - | 智能小程序无激励视频广告（不转换） |
| 插屏广告 | - | 智能小程序无插屏广告（不转换） |

考虑到广告参数的多样性，建议开发者最好以配置的方式去处理广告参数，避免模板和广告数据进行强耦合。


* 对于feed信息流广告、激励视频广告、格子广告、视频广告、插屏广告这类无转换广告建议开发者在使用wx2转换代码后，手动在转换后的模板文件或者脚本文件中手动删除广告代码。

* 对于通栏广告以及前贴广告此类多方广告商具备的广告类型，即针对广告参数或API调用方式进行相应改造，具体请参照下方广告API & 模板转换。

### 广告API & 模板开发转换

1. Banner广告转换

后续wx2转换工具将逐渐实现对Banner广告的转换支持，方案大致从三个方向去实现：

A. 梳理广告数据。取出并整合对应小程序的主体字段：
微信包括unit-id， 百度包括appid、apid、type等。

B. 针对模板文件转换。读取模板中的ad标签，针对type进行判断，当为通栏广告时，将去除unit-id，并添加appid、apid、type等属性字段。但由于此类必要字段不一定完全能够直接获取，这些键的value值将需要开发者进行二次确认及修改。具体属性转换map表如下：

|原始(微信)|新增（百度）|
|----|---- |
|-|appid|
|unit-id|apid|
|-|type|
|-|updatetime|
|binderror|binderror|
|bindload|bindload|
|bindclose|bindclose|
|-|bindstatus|
|ad-intervals|-|

C. 处理脚本文件

API在转换中主要是针对回调函数中方法以及状态码的处理进行相应的转换，例如：

* 在智能小程序中缺少bindStatus方法，因此在对应脚本中做出移除（或者是做出提醒开发者移除的tip）。
* 由于微信小程序与智能小程序中错误回调的处理码不一致，因此需要开发者做出对应的补齐或映射。

2. 前贴视频

关于前贴视频广告的转换思路与上述通栏广告一致，但考虑到模板文件中参数的差异性更大，后续会进一步考虑转换方式，提高通用性。
