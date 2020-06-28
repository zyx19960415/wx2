# 支付转换解决方案

## 微信小程序 & 智能小程序支付对比

### 微信小程序

#### 开发模式
微信支付开放的能力主要是普通模式和服务商模式。

开发者申请自己的appid和mch_id，appid和mch_id成对使用的，两者需具备绑定关系，以此来使用微信支付提供的开放接口，对用户提供服务。

#### 支付账户
在完成小程序的认证之后，在小程序后台申请，公众平台完成入驻，并下载API证书，设置秘钥。

#### 支付开发流程
* 统一下单，获取Openid，调用相同的API
* 调起数据签名（分别是appId, nonceStr, package, signType, timeStamp）
* 调起支付页面协议（https）
* 执行回调函数（complete、fail、success）

#### 支付API的调用
在微信小程序中是通过调用wx.requestPayment(OBJECT)发起微信支付。

OBJECT参数说明
| 参数 | 类型 | 必填 | 说明 |
| :----: |:----:| :----: | :----: |
| timeStamp | String | 是 | 当前时间戳 |
| nonceStr | String | 是 | 随机字符串 |
| package | String | 是 | 统一下单接口返回的 prepay_id 参数值 |
| signType | String | 是 | 签名算法（MD5） |
| paySign | String | 是 | 签名 |
| success |	Function | 否 | 接口调用成功的回调函数|
| fail | Function |	否 | 接口调用失败的回调函数|
| complete | Function |	否 | 接口调用结束的回调函数（调用成功、失败都会执行）|

(PS:请求字段中的paySign是通过MD5去加密拼接后appId、timeStamp、nonceStr、package、signType字段)

回调结果说明
| 回调类型 | errMsg	| 说明 |
| :----: | :----: | :----: |
| success |	requestPayment:ok |	调用支付成功
| fail | requestPayment:fail | cancel | 用户取消支付
| fail | requestPayment:fail (detail message) |	调用支付失败，detail message 为后台返回的详细失败原因

示例：
```bash
wx.requestPayment({
    'timeStamp': '',
    'nonceStr': '',
    'package': '',
    'signType': 'MD5',
    'paySign': '',
    'success': function(res){},
    'fail': function(res){},
    'complete': function(res){}
})
```

### 智能小程序

#### 支付介绍
智能小程序的支付功能基于百度收银台的开通，百度收银台支付是百度面向有开发能力的智能小程序合作者提供的支付能力，聚合了度小满、微信、支付宝等多种支付方式，方便开发者一站式快速接入多种支付渠道，让百度用户在智能小程序场景下，直接完成支付实现交易闭环，提升用户支付体验，提高订单转化率。

#### 支付管理后台操作流程
开通完支付账户后，在「小程序开发者平台-运营中心-支付管理」中，进行支付相关的业务操作。支付管理包含了支付设置、订单管理、财务管理。支付设置包括开发者信息的完善，支付信息的完善以及开发者设置，详细操作流程请参照：https://smartprogram.baidu.com/docs/introduction/background-guide/。

#### 支付API的调用
在智能小程序中使用swan.requestPolymerPayment(OBJECT)方法调用支付接口，该方法在基础库 1.8.5 版本开始支持。使用工具调试时为模拟支付，使用真机调试时可查看真实支付结果。

OBJECT参数说明
| 属性名 |	类型 |	必填 | 说明 |
| :----: | :----: | :----: |  :----:|
| orderInfo | Object |	是	| 订单信息 |
| success | Function |	否	| 接口调用成功的回调函数 |
|fail|	Function|	否	|	接口调用失败的回调函数 |
|complete|	Function|	否	|	接口调用结束的回调函数（调用成功、失败都会执行）

orderInfo 参数说明
| 参数 | 必填|说明
| :----: | :----: |  :----:|
|dealId	|是|	跳转百度收银台支付必带参数之一，是百度收银台的财务结算凭证，与账号绑定的结算协议一一对应，每笔交易将结算到 dealId 对应的协议主体。详见核心参数获取与组装。|
|appKey	|是|	支付能力开通后分配的支付 appKey，用以表示应用身份的唯一 ID，在应用审核通过后进行分配，一经分配后不会发生更改，来唯一确定一个应用。详见核心参数获取与组装。|
|totalAmount|	是|	订单金额，单位为人民币分。|
|tpOrderId	|是	|商户平台自己记录的订单 ID，当支付状态发生变化时，会通过此订单 ID 通知商户。|
|dealTitle|	是|	订单的名称|
|signFieldsRange|	是|	用于区分验签字段范围，signFieldsRange 的值：0：原验签字段 appKey+dealId+tpOrderId；1：包含 totalAmount 的验签，验签字段包括 appKey+dealId+tpOrderId+totalAmount，固定值为 1|
|rsaSign|	是|	对appKey+dealId+totalAmount+tpOrderId进行 RSA 加密后的签名，防止订单被伪造。签名过程见 签名与验签。|
|bizInfo|	是|	订单详细信息，需要是一个可解析为 JSON Object 的字符串。字段内容见： bizInfo 组装。|
|payResultUrl	|否（Web 态必填）|	Web态小程序支付成功后跳回的页面路径(例如：'/pages/payResult/payResult')|

错误码
* Android

|错误码 |	说明|
| :----: | :----: |
|1001|	执行失败|

* iOS

|错误码|说明 |
| :----: | :----: |
|202 |	解析失败，请检查参数是否正确|
|10002|	网络请求失败|
|10005|	系统拒绝|

## 微信小程序 & 智能小程序支付互转解决方案

由上述差异可知,在转换过程中需要更改或同步以下内容

* 账户同步及管理后台信息同步
* API相关变更

### 账户及后台信息同步
与在微信小程序后台开通的微信支付功能相仿，智能小程序要求开发者在使用过程中开通百度收银台支付能力，步骤如下：
* 开通支付账号(拥有核心参数dealid、平台公钥、APP KEY、APP ID)
* 绑定支付服务
* 设置信息包括开发者公钥和收银台参数
* 完善对应信息

### API相关变更
互转工具需要支持从wx.requestPayment到swan.requestPolymerPayment的转换，考虑到内部参数结构不一致以及两端所需参数不同，建议将相应参数注入到固定json文件中，例如pay.json，JSON格式如下：
```bash
{
    'wx': {
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': ''
    },
    'swan': {
        'orderInfo': {
            'dealId': '',
            'appKey': '',
            ....(包括百度支付API中所需要的参数)
        }
    }
}
```
后期转换工具将会读取指定json中数据去具备支付能力的API转换，主要目的是取到百度支付能力的参数去支持支付接口的正常调用。

回调函数都包括对fail、success、complete的处理，且参数一致，因此无需处理。

