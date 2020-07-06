# 登录

互联网产品中，登录作为核心能力，在电商、O2O、TOA 等行业，是完成交易和服务的关键。小程序可以通过官方提供的登录能力方便地获取官方提供的用户身份标识，快速建立小程序内的用户体系。本文主要根据微信和智能小程序之间的登录差异，为开发者提供良好的转换解决方案

## 现有登录方式

* 仅使用 `login` API 进行登录获取登录凭证，进行换取`openid`、`getUserInfo`等操作
* 使用 `button` 组件内的 `getPhoneNumber` 获取手机号，并使用 `login` API 获取`code`，实现打通自有账户体系的登录
* 三方自有账户体系登录

其中三方自有账户体系登录为开发者控制，本文主要针对前两种登录方式进行对比和转换方案的提供

## 微信小程序 & 智能小程序对比

### API & 组件 对比

#### 一、login

|| 微信小程序 | 智能小程序 |
| ---- | ---- | ---- |
| 使用方式 | wx.login | swan.login |
|交互表现|  对用户无感知，直接获取到登录凭证 | 百度APP未登录的情况：会先跳转至百度APP登录授权页，用户点击授权授才能获取到登录凭证 <br> 百度APP已登录的情况：对用户无感知，直接获取到登录凭证|
|返回值| code | code |

**使用示例**
```js
// 微信
wx.login({
    success(res) {
        const code = res.code;
        // 可以进行换取openid，获取用户信息等操作
    }
})

// 百度
swan.login({
    success(res) {
        const code = res.code;
        // 可以进行换取openid，获取用户信息等操作
    }
})
```


#### 二、 getPhoneNumber

|| 微信小程序 | 智能小程序 |
| ---- | ---- | ---- |
| 使用方式 |button 组件中 open-type 属性为 getPhoneNumber <br> 手机号需要使用`login`获取的登录凭证进行解密| button 组件中 open-type 属性为 getPhoneNumber<br> 手机号需要使用`login`获取的登录凭证进行解密 |
|交互表现| 弹出半屏手机号授权框  | 百度APP未登录的情况：弹出包括登录和手机号授权的半屏弹框，可同时完成登录和手机号授权操作 <br> 百度APP已登录的情况：弹出手机号授权弹框|
|返回值| encryptedData、iv、cloudID | encryptedData、iv |

**使用示例**

```templete
<view>
    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">获取手机号</button>
</view>

```

```js
getPhoneNumber(res) {
    const {iv,encryptedData} = res.detail;
    // do something
}
```

#### 小结

由上对比可得出，在智能小程序中，因为手百存在未登录的情况，所以会对小程序的登录交互会产生一定影响。在百度小程序中`getPhoneNumber`和`login`在百度APP未登录的情况，都会出现一个`登录`的交互，但两个方式的登录交互行为并不一致。而在微信中则没有这种差异
* `login`：离开当前小程序，跳转到一个新的百度登录页，打断用户操作
* `getPhoneNumber`：随手机号授权弹窗一同出现，用户仅需点击一次授权和登录

### 登录方式对比

#### 一、对于仅使用 login 的情况
**使用流程**：开发者通过调用 `login` 接口，换取登录凭证，让服务端可获取 `session_key` 和 `openid`，如果想要获取用户信息，就再通过 `getUserInfo` 获取用户信息

#### 二、 对于使用 getPhoneNumber 的情况
**使用流程**：开发者使用`getPhoneNumber`获取到手机号的加密信息，再通过`login` 接口换取登录凭证，让服务端可以进行手机号解密，并打通开发者自有的登录体系。获取到用户在该平台的所有信息

由于使用`getPhoneNumber`获取的手机号，也依赖`login`获取登录凭证来进行解密。`getPhoneNumber`和`login`的使用时序会影响智能小程序的交互。以下我就针对不同时序，进行微信小程序和智能小程序的交互行为对比

##### 2.1 场景一：先调用 `login`后再使用 `getPhoneNumber`

| 微信小程序 | 智能小程序 |
| ---- | ---- |
| 调用`login`对用户无感知，使用`getPhoneNumber`时候弹出半屏授权框<br>![图片](https://staticsns.cdn.bcebos.com/amis/2020-7/1594036518613/login-wx.png) | 调用`login`时，若百度APP未登录，会先跳转至百度APP登录授权页，再使用`getPhoneNumber`时候弹出半屏授权框<br>![图片](https://staticsns.cdn.bcebos.com/amis/2020-7/1594036470109/login-bd.jpg)|

##### 2.2 场景二：先使用 `getPhoneNumber` 后再调用 `login`

| 微信小程序 | 智能小程序 |
| ---- | ---- |
| 使用`getPhoneNumber`时候弹出半屏授权框，调用`login`对用户无感知 <br>![图片](https://staticsns.cdn.bcebos.com/amis/2020-7/1594036500314/login-wx-phone.png)| 使用`getPhoneNumber`时候弹出半屏弹框(包括登录和获取手机号授权)，调用`login`对用户无感知<br>![图片](https://staticsns.cdn.bcebos.com/amis/2020-7/1594036404461/login-bd-phone.png)|

##### 2.3 结论
**推荐开发者将`login`放置在`getPhoneNumber`之后使用**

❌ 在场景一中，智能小程序会比微信小程序增加一步登录授权，并且该登录授权会打断用户操作。<br>
✔️ 在场景二中，智能小程序与微信小程序的步长一致，`login`接口的交互双端也一致，抹平了交互差异，用户体验更好

## 兼容开发方案

由于登录的情况较为复杂，转换工具无法做到完美转换，需要开发者进行开发兼容。对此我们为开发者提供了[二次迭代方案](/contents/envs)，可以适配不同平台的代码。并通过我们的转换工具，转换出支持不同平台的代码


### 一、使用 login

* 不需要使用`getUserInfo`
    * 不需要对 API 进行转换，若需要换取`session_key`和`openid`，需要开发者服务端适配

* 需要使用到`getUserInfo`
    * 需要开发者服务端适配
    * 需要对 button 组件的 getUserInfo 适配

#### 1、不需要使用getUserInfo
* 需要对`session_key`和`openid`的获取接口进行变更，可参考[微信获取session_key](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html#Object)、[百度获取session_key](https://smartprogram.baidu.com/docs/develop/api/open/log_Session-Key/)


#### 2、需要使用getUserInfo

#### ① button 组件的 getUserInfo 适配

**getUserInfo 返回值对比**

|微信小程序 | 智能小程序 | 说明 |
| ---- | ---- | ---- |
| userInfo | userInfo| 用户信息，存在差异，下方有详细对比|
| encryptedData | data|为用户加密数据，解密后的数据存在差异，下方有详细对比|
| iv | iv|
| rawData | -|
| signature | -|
| cloudID| - |

**getUserInfo 返回详情对比**

| 返回值 | 微信小程序 | 智能小程序 |
| ---- | ---- | ---- |
| userInfo | nickName | nickName |
|  |  avatarUrl | avatarUrl|
|  |  gender | gender|
|  |  country | -|
|  |  province| -|
|  |  city | -|
|  |  language| -|

**兼容方案：**

如上，微信小程序和智能小程序返回数据不一致，需要开发者自行兼容。如返回的加密信息，需要将`encryptedData`改为`data`，在智能小程序内`userInfo`内不支持`country`、`province`等值

#### ② 开发者服务端适配
* 需要对`session_key`和`openid`的获取接口进行变更，可参考[微信获取session_key](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html#Object)、[百度获取session_key](https://smartprogram.baidu.com/docs/develop/api/open/log_Session-Key/)
* 需要对`getUserInfo`的数据解密方式进行适配，可参考[微信数据解密方式](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)、[百度数据解密方式](https://smartprogram.baidu.com/docs/develop/api/open/log_userdata/)
* 需要对`getUserInfo`解密后的数据进行兼容适配： 建议可通过服务端进行解密后返回值的适配，保证前端接口获取的参数一致

**getUserInfo 解密数据对比**

| 返回值 | 微信小程序 | 智能小程序 |
| ---- | ---- | ---- |
| encryptedData/data 解密数据 | nickName | nickname |
|  |  avatarUrl | headimgurl|
|  |  gender | sex|
|  |  openId | openid|
|  |  unionId | -|
|  |  country | -|
|  |  province| -|
|  |  city | -|
|  |  watermark| -|


#### 兼容示例

**模板文件**
```wxml
<view>
    <view>用户信息展示</view>
    <button open-type="getUserInfo" bindgetuserinfo="getUserInfo">
    <view>
        <view class="avatar">
            <image src="{{userInfo.avatarUrl}}">
        <view>
        <text> 用户名：{{userInfo.nickName}} </text>
        <wx-env>
             <text> 位置：{{userInfo.province}} 省 {{userInfo.city}}市</text>
        </wx-env>
    </view>
</view>
```

```js
getUserInfo(res) {
    let encryptedData = '';
    if (process.env.APP_TYPE === 'swan') {
        encryptedData = res.detail.data;
        // do something
    }
    else {
        encryptedData = res.detail.encryptedData
        // do something
    }
    this.setData({
        userInfo: res.userInfo,
        encryptedData: encryptedData
    });
}

```

### 二、 使用 getPhoneNumber

**📢 建议：**为抹平微信和智能小程序之间的交互差异，提升小程序用户体验，降低开发者转换成本。强烈建议开发者将`login`放置在`getPhoneNumber`的回调函数之后

针对该情况，开发者需要做以下适配：

* button 组件的 getPhoneNumber、以及与服务端请求的参数、接口适配
* 开发者服务端适配


#### 1、getPhoneNumber 适配

##### ① 返回值对比
| 微信小程序 | 智能小程序 |
| ---- | ---- |
|encryptedData |encryptedData |
|iv |iv |
|cloudID |- |

兼容方案：
目前智能小程序暂不支持`cloudID`，需要开发者配置在智能小程序中删除该参数涉及到的功能，可根据[二次迭代](/contents/envs)中的逻辑文件方式，进行适配

```js
getPhoneNumber(res) {
    const {iv, encryptedData} = res.detail;

    // 微信独有逻辑
    if(process.env.APP_TYPE === 'wx') {
        const {cloudID} = res.detail;
        // do something
    } 
}
```

##### ② 接口适配
考虑到跟服务端请求获取数据时，两端所需的接口可能不同，可以通过[二次迭代](/contents/envs)中的支持的配置文件方式，将相应接口注入到固定json文件中，例如api.json，JSON格式如下：

```js
{
    '_wxEnv': {
        'getOpenIdApi': '微信小程序中获取openid的请求地址',
        'requestPhoneNumberApi': '微信小程序中获取手机号的请求地址'
    },
    '_swanEnv': {
        'getOpenIdApi': '智能小程序中获取openid的请求地址',
        'requestPhoneNumberApi': '智能小程序中获取手机号的请求地址'
    }
}
```


#### 2、开发者服务端适配

* 需要对`session_key`和`openid`的获取接口进行变更，可参考[微信获取session_key](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html#Object)、[百度获取session_key](https://smartprogram.baidu.com/docs/develop/api/open/log_Session-Key/)
* 需要对`getPhoneNumber`的数据解密方式进行适配，[微信数据解密方式](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)、[百度数据解密方式](https://smartprogram.baidu.com/docs/develop/api/open/log_userdata/)
* 进行`getPhoneNumber`解密后的返回值适配，保证前端接口获取的参数一致（建议由服务端适配）

##### getPhoneNumber encryptedData 解密后数据对比

| 微信小程序 | 智能小程序 | 说明 |
| ---- | ---- | ---- |
|  phoneNumber | mobile | 手机号 |
|  purePhoneNumber | -|
|  countryCode | - |
|  watermark | -|


#### 兼容示例

根据[二次迭代](/contents/envs)方案，可参考如下登录兼容的示例

**模板文件**

```wxml
<view>
    <view>登录</view>
    <view>
        <wx-env>
            <image src="微信登录logo图片地址">
        </wx-env>
        <swan-env>
            <image src="百度登录logo图片地址">
        </swan-env>
        <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">
            <wx-env>
                微信账号快速登录
            </wx-env>
            <swan-env>
                百度账号快速登录
            </swan-env>
        </button>
    </view>
</view>
```

**逻辑文件**

```js
const apis = require('./api.json');
getPhoneNumber(res) {
    const {iv, encryptedData} = res.detail;
    // 微信独有逻辑
    if(process.env.APP_TYPE === 'wx') {
        const {cloudID} = res.detail;
        // 针对 cloudID 的操作
    } 

    wx.login({
        success(loginRes) {
            const {code} = loginRes;
            const getPhoneNumberRequest({code, iv, encryptedData});
        }
    })
}

getPhoneNumberRequest({code, iv, encryptedData}) {
    wx.request({
        url: apis.requestPhoneNumberApi,
        data: {
            code,
            iv,
            encryptedData
        },
        success(res) {
            this.setData({
                // 可获取到开发者在该平台的所有信息
                phoneNumber: res.phoneNumber,
                userName: res.userName,
                avatarUrl: res.avatarUrl
            })
        }
    })
}
```
