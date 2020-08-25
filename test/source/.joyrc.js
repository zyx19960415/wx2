/**
 * @author xujie07@baidu.com
 * @date 2019/12/9
 */
'use strict';
let {basename} = require('path');
const CURRENT_DIR = basename(__dirname);

module.exports = {
    project_type: 'u-design',   //组件库（u-design）;内部项目（internal;外部项目（external）
    bdWxLogin: 'bdWxLogin',     //微信登录pass的跳转页面函数，推荐默认为bdWxLogin，可配置其他值
    getuserinfo:'getUserInfoHandle'   //微信open-type的回调函数,默认推荐为getuserinfo，可配置其他值

    //。。。其他自定义转换规则
};

