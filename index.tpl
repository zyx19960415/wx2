<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>wx2 小程序互转工具</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="description" content="Description">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="https://staticiot.cdn.bcebos.com/wx2-org/css/theme.css">
    <link rel="stylesheet" href="https://staticiot.cdn.bcebos.com/wx2-org/css/gittalk.css">
</head>

<body>
    <div id="app"></div>
    <script>
        // eslint-disable-next-line
        let prodPath = '/open-static/wx2/docs/';
        // eslint-disable-next-line
        let devPath = '/docs/';
        // eslint-disable-next-line
        let basePath = location.host.match('localhost') ? devPath : prodPath;

        /* eslint-disable */
        window.$docsify = {
            el: '#app',
            name: 'wx2',
            repo: 'http://.baidu.com/repos/baidu/bp/wx2',
            basePath, // 基础路径
            homepage: '/start/context.md', // 首页
            coverpage: 'cover.md', // 封面
            loadNavbar: 'nav.md', // 导航栏
            loadSidebar: true,
            loadSidebar: 'sidebar.md',
            noEmoji: false, // 关闭emoji解析
            notFoundPage: '', // 404页面
            subMaxLevel: 3,
            search: {
                maxAge: 86400000, // 过期时间，单位毫秒，默认一天
                paths: [], // or 'auto'
                placeholder: 'Type to search',
                noData: '额哦，找不到了~',
                depth: 2
            }
        };
    </script>
    <script src="https://staticiot.cdn.bcebos.com/wx2-org/js/logic.js"></script>
    <script src="https://staticiot.cdn.bcebos.com/wx2-org/js/search.js"></script>
    <script src="https://staticiot.cdn.bcebos.com/wx2-org/js/emoji.js"></script>
    <script src="https://staticiot.cdn.bcebos.com/wx2-org/js/copy-code.js"></script>
    <script src="https://staticsns.cdn.bcebos.com/amis/2020-7/1595489344257/zoom-image.min.js"></script>
</body>

</html>
