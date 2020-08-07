/*
* @module config
* @author : wj
* @description : 发送静态资源配置
* @since : 创建时间  2020-08-07 14:55:06
*/
'use strict';
let {basename} = require('path');
const CURRENT_DIR = basename(__dirname);
const fs = require('fs-extra');
fs.removeSync('index.tpl');
fs.copyFileSync('index.html', 'index.tpl');

module.exports = {
    receiver: 'http://cp01-qwy.epc.baidu.com:8765/receiver/upload',
    base: '/app',
    externals: [
        {file: 'index.tpl', to: '/view/' + CURRENT_DIR},
        {file: 'docs/**', to: '/open-static/' + CURRENT_DIR},
        // {file: 'src/assets/smartProgram/Bitmap1.png', to: CONFIG.assetsDir + '/img'},
        {file: 'static/**', to: '/open-static/' + CURRENT_DIR}
    ]
};

