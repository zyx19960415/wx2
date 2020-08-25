import {getCookieForSystem} from './userLogin/login.js';
swan.navigateTo({
    url: '../logs/logs'
}); // test api exist check in logical expression

if (swan.checkIsSupportSoterAuthentication && true) {
    console.log(true);
} // test wx as function arg


Object.create(wx, {});
console.log(1, wx); // test UnaryExpression

if (!swan.checkIsSupportSoterAuthentication) {
    console.log(true);
}

if (typeof swan.checkIsSupportSoterAuthentication !== 'function') {
    console.log(true);
}

const wx = {};

for (const key in wx) {
    console.log(`wx${key}:`, swan[key]);
}

while (wx) {
    console.log(`wx${key}:`, swan[key]);
}

swan.login({
    success(res) {
        if (res.code) {
            // 发起网络请求
            swan.request({
                url: 'https://test.com/onLogin',
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Cookie': `BDUSS=${wx2bd.getStorageSync('userInfo').bduss};STOKEN=${wx2bd.getStorageSync('userInfo').netdisk_stoken};`
                },
                data: {
                    code: res.code
                }
            });
        } else {
            console.log('登录失败！' + res.errMsg);
        }
    }

});
swan.aaa = 111;
swan['bbb'] = 222;
swan[ccc] = 333;
let data = swan.getExtConfigSync();
data = swan.getExtConfigSync().ext;
data = aaa[bbb].getExtConfigSync();
data = swan.getExtConfigSync().extConfig;
swan['test'].call(wx, {
    url: 'test'
});
swan.test(swan.testFn, wx);
swan.navigateToMiniProgram();
import {bdWxLogin} from '@baidu/table/index';
const a = {
    getuserinfo({
        info
    }) {
        swan.login({
            success: () => {
                swan.getUserInfo({
                    success: () => {
                        getCookieForSystem().then(() => {
                            {
                                if (info.detail) {
                                    app.globalData.userWxInfo = info.detail.userInfo;
                                    app.globalData.hasWxAuthor = true;
                                    swan.setStorageSync('userWxInfo', info.detail.userInfo);
                                    console.log('111: ', app.globalData);
                                    swan.reLaunch({
                                        url: this.data.url || DEFAULT_URL
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }

};
swan.setClipboardData({
    data: 'data',

    success(res) {
        swan.showToast({
            title: '内容已复制'
        });
        console.log('111');
    }

});
swan.setClipboardData({
    data: 'data',

    success(res) {
        swan.showToast({
            title: '内容已复制'
        });
    }

});
swan.setClipboardData({
    data: 'data',

    success(res) {
        swan.showToast({
            title: '内容已复制'
        });
    }

});
Component({
    behaviors: ['wx://form-field', 'wx://component-export'],
    properties: {
        length: {
            type: Number,
            value: 2
        },
        swanIdForSystem: {
            type: String,
            value: ''
        }
    }
});
Component({
    'componentGenerics': {
        'selectable': {
            'default': 'path/to/default/component'
        }
    },
    properties: {
        length: {
            type: Number,
            value: 2
        },
        swanIdForSystem: {
            type: String,
            value: ''
        }
    }
});
const url1 = e.currentTarget.dataset.coverimg;
const url2 = e.currentTarget.dataset.coverimg;
Page({
    onLoad() {
        this.Navbar = this.selectComponent('#Navbar');
        b = this.selectComponent('#btn1');
    },

    onReady() {}

}); // Page({
//     onLoad(){
//         this.selectAllComponents('.btn2');
//         this.selectComponent('#btn1');
//     },
//     onReady(){
//
//     }
// });
// eslint-disable-next-line
if ("swan" === 'swan') {
    swan.navigateTo({
        url: '../logs/logs'
    });
}
// eslint-disable-next-line
if ("swan" === 'wx') {
    swan.navigateTo({
        url: '../logs/logs'
    });
}
