/*
 * @Descripttion: 获取用户信息
 * @Author: wangpanfe
 * @Date: 2020-02-26 21:52:30
 * @LastEditTime: 2020-03-16 23:53:30
 */
const generate = require('@babel/generator').default;
const {relative, dirname} = require('path');
const types = require('@babel/types');
const GET_BDUSS_STOKEN = 'getCookieForSystem'; //  系统提供的获取鉴权的API
const propertiesString = 'xXksjUhmbvhaks'; // 临时字面量
const constant = require('../../../../../src/config/constant');
const {get, set, has} = require('lodash');

module.exports = function ({path, context, file}) {
    const {getuserinfo, projectType} = get(context, 'rules.api');
    if (projectType !== 'internal' && context.type !== constant.WECHAT_TO_SWAN) {
        return;
    }

    if (get(path, 'node.key.type') === 'Identifier' && get(path, 'node.key.name') === getuserinfo) {
        let flag = false;
        path.traverse({
            Identifier(identifierPath) {
                if (get(identifierPath, 'node.name') === 'getCookieForSystem') {
                    flag = true;
                }
            }
        });
        if (flag) {
            return;
        }

        // 获取到当前函数内的代码段
        const methodBody = get(path, 'node.body');
        const userCode = generate(methodBody).code;

        const loginUserCode = `swan.login({
            success:() => {
                swan.getUserInfo({
                    success:() => {
                        getCookieForSystem().then(() => {
                            //跳转
                            ${userCode}
                        })
                    }
                })
            }
        })`;

        const programBody = path.findParent(path => {
            return types.isProgram(path);
        });

        if (programBody) {
        /* eslint-disable */ 
            const ImportSpecifier = types.ImportSpecifier(types.Identifier(GET_BDUSS_STOKEN), types.Identifier(GET_BDUSS_STOKEN));
            const relativePath = relative(dirname(file), context.dist + '/userLogin/login.js');
            const source = types.StringLiteral(relativePath);
            programBody.node.body.unshift(types.ImportDeclaration([ImportSpecifier], source));
        }

        const MemberExpression = types.memberExpression(types.Identifier('swan'), types.Identifier(propertiesString));
        const CallExpression = types.callExpression(MemberExpression, []);
        const blockBody = [types.expressionStatement(CallExpression)];
        path.replaceWith(types.objectMethod('method', types.Identifier(get(path, 'node.key.name')), get(path, 'node.params'), types.blockStatement(blockBody)));

        path.traverse({
            MemberExpression(memberPath) {
                if (get(memberPath, 'node.property.name') === propertiesString) {
                    memberPath.parentPath.replaceWithSourceString(loginUserCode);
                }
            }
        });
        /* eslint-enable */
    }
};
