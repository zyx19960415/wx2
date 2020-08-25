/**
 * @des 转换转换request的方法
 *
 * @param {Object} node traverse节点
 */
const {getNodeMethodName} = require('../../../../../src/util');
const types = require('@babel/types');
const generate = require('@babel/generator').default;
const logInstance = require('../../../../../src/log/log');
const {get, set} = require('lodash');

module.exports = function ({path, context, file}) {
    const {bdWxLogin, projectType} = get(context, 'rules.api');
    // 转换bdWxLogin();
    if (get(path, 'node.callee.type') === 'Identifier' && get(path, 'node.callee.name') === bdWxLogin) {
        const expression = get(path, 'node.arguments[0]');
        const code = generate(expression).code;
        path.replaceWithSourceString(`swan.reLaunch({url:${code || '""'}})`);
    }

    if (projectType !== 'internal') {
        return;
    }

    const api = get(context, 'rules.api');
    const callee = get(path, 'node.callee');
    const prefix = callee.type === 'MemberExpression' ? get(callee, 'object.name') : '';
    const method = getNodeMethodName(path.node);
    if (prefix !== api.prefix && method !== 'request') {
        return;
    }
    const sourceCode = generate(path.node).code;

    path.traverse({
        ObjectProperty(objectPath) {
            const nodeKey = get(objectPath, 'node.key');
            if (nodeKey.type === 'StringLiteral' && /cookie/i.test(nodeKey.value)) {
                const headerBody = objectPath.findParent(path => {
                    return types.isObjectProperty(path)
                    && types.isIdentifier(get(path, 'node.key'))
                    && /header/i.test(get(path, 'node.key.name'));
                });

                if (headerBody) {

                    const code = '`BDUSS=${swan.getStorageSync(\'userInfo\').bduss};'
                            + 'STOKEN=${swan.getStorageSync(\'userInfo\').netdisk_stoken};`';
                    objectPath.node.value = types.Identifier(code);  // eslint-disable-line
                }
            }
        }
    });

    const afterCode = generate(path.node).code;
    logInstance.warning({
        type: '用户鉴权BDUSS',
        file: file,
        row: get(path, 'node.loc.start.line'),
        column: get(path, 'node.loc.start.column'),
        before: sourceCode,
        after: afterCode,
        message: '获取bduss的逻辑已被自动注入，请移除项目中的所有passport依赖包'
    });
};
