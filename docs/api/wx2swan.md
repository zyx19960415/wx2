!> 在使用wx2将<b> 微信小程序 </b>转换为<b> 智能小程序 </b>的过程中，wx2会对比二者API差异，并进行如下操作：
</br>
</br>1、将没有任何差异的API进行正常转换；
</br>2、将<b>有差异且不能自动抹平差异</b>的API标记为【降级提示】的类别，日志提醒开发者手动兼容；
</br>3、将<b>有差异但可以自动抹平差异</b>的API标记为【降级替换】的类别，进行自动替换，日志提醒开发者关注。

以下是wx2会进行【降级提示】以及【降级替换】的API列表：

## 降级提示API列表

<style> td {width: 300px;} </style>
<table>
    <tr>
        <td>API类别</td>
        <td>功能</td>
        <td>API</td>
    </tr>
    <tr>
        <td>基础</td>
        <td>环境变量</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/base/env/env.html">env</td>
    </tr>
    <tr>
        <td rowspan="18">媒体</td>
        <td rowspan="2">录音</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.stopRecord.html">stopRecord</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.startRecord.html">startRecord</td>
    </tr>
    <tr>
        <td rowspan="4">音频</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.stopVoice.html">stopVoice</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.playVoice.html">playVoice</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.pauseVoice.html">pauseVoice</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createAudioContext.html">createAudioContext</td>
    </tr>
    <tr>
        <td rowspan="8">背景音频</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.stopBackgroundAudio.html">stopBackgroundAudio</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.seekBackgroundAudio.html">seekBackgroundAudio</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.playBackgroundAudio.html">playBackgroundAudio</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.pauseBackgroundAudio.html">pauseBackgroundAudio</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioStop.html">onBackgroundAudioStop</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioPlay.html">onBackgroundAudioPlay</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioPause.html">onBackgroundAudioPause</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioPlayerState.html">getBackgroundAudioPlayerState</td>
    </tr>
    <tr>
        <td rowspan="2">实时音视频</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/live/wx.createLivePusherContext.html">createLivePusherContext</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/live/wx.createLivePlayerContext.html">createLivePlayerContext</td>
    </tr>
    <tr>
        <td rowspan="1">音视频合成</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/wx.createMediaContainer.html">createMediaContainer</td>
    </tr>
    <tr>
        <td rowspan="1">图片</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseMessageFile.html">chooseMessageFile</td>
    </tr>
    <tr>
        <td rowspan="46">设备</td>
        <td rowspan="9">蓝牙</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.openBluetoothAdapter.html">openBluetoothAdapter</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.closeBluetoothAdapter.html">closeBluetoothAdapter</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.getBluetoothAdapterState.html">getBluetoothAdapterState</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.onBluetoothAdapterStateChange.html">onBluetoothAdapterStateChange</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.startBluetoothDevicesDiscovery.html">startBluetoothDevicesDiscovery</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.stopBluetoothDevicesDiscovery.html">stopBluetoothDevicesDiscovery</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.getBluetoothDevices.html">getBluetoothDevices</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.getConnectedBluetoothDevices.html">getConnectedBluetoothDevices</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.onBluetoothDeviceFound.html">onBluetoothDeviceFound</td>
    </tr>
    <tr>
        <td rowspan="12">低功耗蓝牙</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.createBLEConnection.html">createBLEConnection</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.closeBLEConnection.html">closeBLEConnection</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.getBLEDeviceServices.html">getBLEDeviceServices</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.getBLEDeviceCharacteristics.html">getBLEDeviceCharacteristics</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.readBLECharacteristicValue.html">readBLECharacteristicValue</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.writeBLECharacteristicValue.html">writeBLECharacteristicValue</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.notifyBLECharacteristicValueChange.html">notifyBLECharacteristicValueChange</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.onBLEConnectionStateChange.html">onBLEConnectionStateChange</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLECharacteristicValueChange.html">offBLECharacteristicValueChange</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLEPeripheralConnectionStateChanged.html">offBLEPeripheralConnectionStateChanged</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.onBLECharacteristicValueChange.html">onBLECharacteristicValueChange</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.onBLEConnectionStateChange.html">onBLEConnectionStateChange</td>
    </tr>
    <tr>
        <td rowspan="8">iBeacon</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.startBeaconDiscovery.html">startBeaconDiscovery</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.stopBeaconDiscovery.html">stopBeaconDiscovery</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.getBeacons.html">getBeacons</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.onBeaconUpdate.html">onBeaconUpdate</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.onBeaconServiceChange.html">onBeaconServiceChange</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/IBeaconInfo.html">IBeaconInfo</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.offBeaconServiceChange.html">offBeaconServiceChange</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.startBeaconDiscovery.html">startBeaconDiscovery</td>
    </tr>
    <tr>
        <td rowspan="6">NFC</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.getHCEState.html">getHCEState</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.startHCE.html">startHCE</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.stopHCE.html">stopHCE</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.onHCEMessage.html">onHCEMessage</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.sendHCEMessage.html">sendHCEMessage</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.offHCEMessage.html">offHCEMessage</td>
    </tr>
    <tr>
        <td rowspan="9">WI-FI</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.startWifi.html">startWifi</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.stopWifi.html">stopWifi</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.connectWifi.html">connectWifi</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.getWifiList.html">getWifiList</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.onGetWifiList.html">onGetWifiList</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.setWifiList.html">setWifiList</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.onWifiConnected.html">onWifiConnected</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.getConnectedWifi.html">getConnectedWifi</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.offWifiConnected.html">offWifiConnected</td>
    </tr>
    <tr>
        <td rowspan="1">陀螺仪</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.startGyroscope.html">startGyroscope</td>
    </tr>
    <tr>
        <td rowspan="1">罗盘</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/device/compass/wx.offCompassChange.html">offCompassChange</td>
    </tr>
    <tr>
        <td rowspan="3">界面</td>
        <td rowspan="1">置顶</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/ui/sticky/wx.setTopBarText.html">setTopBarText</td>
    </tr>
    <tr>
        <td rowspan="1">字体</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html">loadFontFace</td>
    </tr>
    <tr>
        <td rowspan="1">键盘</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/ui/keyboard/wx.getSelectedTextRange.html">getSelectedTextRange</td>
    </tr>
    <tr>
        <td rowspan="5">画布</td>
        <td rowspan="5">-</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.createOffscreenCanvas.html">createOffscreenCanvas</td>
    </tr>
    <tr>
        <td>createContext（已废弃）</td>
    </tr>
    <tr>
        <td>drawCanvas（已废弃）</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/canvas/Image.html">Image</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/canvas/ImageData.html">ImageData</td>
    </tr>
    <tr>
        <td rowspan="4">转发</td>
        <td rowspan="4">-</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.showShareMenu.html">showShareMenu</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.hideShareMenu.html">hideShareMenu</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.updateShareMenu.html">updateShareMenu</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.getShareInfo.html">getShareInfo</td>
    </tr>
    <tr>
        <td rowspan="8">开放接口</td>
        <td rowspan="2">卡券</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/card/wx.addCard.html">addCard</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/card/wx.openCard.html">openCard</td>
    </tr>
    <tr>
        <td rowspan="1">微信运动</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/werun/wx.getWeRunData.html">getWeRunData</td>
    </tr>
    <tr>
        <td rowspan="3">生物认证</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSupportSoterAuthentication.html">checkIsSupportSoterAuthentication</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.startSoterAuthentication.html">startSoterAuthentication</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSoterEnrolledInDevice.html">checkIsSoterEnrolledInDevice</td>
    </tr>
    <tr>
        <td rowspan="1">支付</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html">requestPayment</td>
    </tr>
    <tr>
        <td rowspan="1">登录</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html">login</td>
    </tr>
    <tr>
        <td rowspan="2">广告</td>
        <td rowspan="2">-</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/ad/wx.createRewardedVideoAd.html">createRewardedVideoAd</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/ad/wx.createInterstitialAd.html">createInterstitialAd</td>
    </tr>
    <tr>
        <td rowspan="7">网络</td>
        <td rowspan="1">UDP通信</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/wx.createUDPSocket.html">createUDPSocket</td>
    </tr>
    <tr>
        <td rowspan="6">mDNS</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceDiscoveryStop.html">offLocalServiceDiscoveryStop</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceLost.html">offLocalServiceLost</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceFound.html">onLocalServiceFound</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceLost.html">onLocalServiceLost</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.startLocalServiceDiscovery.html">startLocalServiceDiscovery</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.stopLocalServiceDiscovery.html">stopLocalServiceDiscovery</td>
    </tr>
    <tr>
        <td rowspan="1">Worker</td>
        <td rowspan="1">-</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/worker/wx.createWorker.html">createWorker</td>
    </tr>
    <tr>
        <td rowspan="1">数据缓存</td>
        <td rowspan="1">周期性更新</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.onBackgroundFetchData.html">onBackgroundFetchData</td>
    </tr>
</table>

## 降级替换API列表

<table id="table2">
    <tr>
        <td>API类别</td>
        <td>功能</td>
        <td>原始API</td>
        <td>转换后API</td>
    </tr>
    <tr>
        <td rowspan="2">开放接口</td>
        <td rowspan="2">小程序跳转</td>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html">navigateToMiniProgram</td>
        <td><a target="_blank" href="https://smartprogram.baidu.com/docs/develop/api/open/swan-navigateToSmartProgram/">navigateToSmartProgram</td>
    </tr>
    <tr>
        <td><a target="_blank" href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/wx.navigateBackMiniProgram.html">navigateBackMiniProgram</td>
        <td><a target="_blank" href="https://smartprogram.baidu.com/docs/develop/api/open/swan-navigateBackSmartProgram/">navigateBackSmartProgram</td>
    <tr/>
</table>
