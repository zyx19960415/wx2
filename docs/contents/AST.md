## 前言
babel作为现代前端项目的标配，工作中经常会用到。但是，很少人会去研究它的底层实现和设计。本小节将会由浅入深地和大家一起学习下babel的一些基础知识，以及编写属于自己的babel插件，并在项目中使用。

## AST简介
> 抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构

## AST生成过程
1. 分词 / 词法分析: 将一个语句中的关键词进行提取, 例如let a = 3; 分词提取之后得到let, a, =, 3

2. 解析 / 语法分析: 在对上面已经被拆分提取过的关键词进行分析之后建立一课语法树(AST)

3. 底层代码生成: 得到语法树之后执行引擎(例如 chrome 的 v8引擎)会对这颗树进行一定的优化分析, 然后生成更底层的代码或者机器指令交由机器执行


## babel工具简介
> Babel is a compiler for writing next generation JavaScript

#### babel三件套

+ 解析：@babel/parse
	+  词法解析
	+  语法解析
+ 遍历：@babel/traverse
+ 生成：@babel/generator

```
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from '@babel/generator';

//源代码
const code = `function square(n) {
  return n * n;
}`;

//解析为ast结构
const ast = parser.parse(code, {
  // parse in strict mode and allow module declarations
  sourceType: "module",

  plugins: [
    // enable jsx and flow syntax
    "jsx",
    "flow"
  ]
});

//进行遍历,修改节点
//第二个参数是一个访问者对象，定义遍历时的具体转换规则，囊括本文95%的重点
traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
    }
  }
});
//将修改后的ast结构，生成重新的代码
const output = generate(ast, { /* options */ }, code);
```

整个流程最核心的就是traverse部分，接下来我们回顾下traverse的核心知识

## 如何去编写一个babel插件

> Babel 是 JavaScript 编译器，更确切地说是源码到源码的编译器，通常也叫做“转换编译器（transpiler）”。 意思是说你为 Babel 提供一些 JavaScript 代码，Babel 更改这些代码，然后返回给你新生成的代码

 #### 遍历
 > Babel 或是其他编译器中最复杂的过程 同时也是插件将要介入工作的部分。

首先熟悉下常见的js结构对应的ast节点类型
```
//functionDeclaration
function square(n) {
  return n * n;
}

let a = {
	test(){},  //ObjectMethod
  	setOnly: function(){}   //ObjectProperty
}

let b = 3;  //VariableDeclaration
b = 5;   //AssignmentExpression
```
#### 访问者（visitor）
> 访问者是一个用于 AST 遍历的跨语言的模式。 简单的说它们就是一个对象，定义了用于在一个树状结构中获取具体节点的方法

```
const MyVisitor = {
  //完整写法
  functionDeclaration: {
    enter(path) {
      console.log("Entered!");
    },
    exit(path) {
      console.log("Exited!");
    }
  },
  //常用写法
  functionDeclaration(path){
  },
  
  ObjectMethod | ObjectProperty: {
    enter(path) {
      console.log("Entered!");
    },
    exit(path) {
      console.log("Exited!");
    }
  }

  ...
};
```

#### Path:
> visitor对象每次访问节点方法时，都会传入一个path参数。Path 是表示两个节点之间连接的对象。这个对象不仅包含了当前节点的信息，也有当前节点的父节点的信息，同时也包含了添加、更新、移动和删除节点有关的其他很多方法

```

+ 属性      
  - node   当前节点
  - parent  父节点
  - parentPath 父path
  - scope   作用域
  - context  上下文
  - ...
+ 方法
  - findParent  向父节点搜寻节点
  - getSibling 获取兄弟节点
  - replaceWith  用AST节点替换该节点
  - replaceWithSourceString  用代码字符串替换该节点
  - replaceWithMultiple 用多个AST节点替换该节点
  - insertBefore  在节点前插入节点
  - insertAfter 在节点后插入节点
  - remove   删除节点

```

## AST实战讲解

#### 1. 打开[在线AST工具](https://astexplorer.net/)

![](https://user-gold-cdn.xitu.io/2019/9/9/16d15fbe2fe54b23?w=1860&h=1168&f=png&s=362950)
高亮的是对应的代码段，左边是一个对象的属性，右边对应ast中的节点信息。

注意：js中不同的数据类型，对应的ast节点信息也不竟相同。以图中为例，externalClasses对象的节点信息中类型（type）是ObjectProperty，包含key ,value等关键属性（其他类型节点可能就没有）

#### 2. 打开transform开关，选择转换引擎，发现了新大陆

![图片](https://user-gold-cdn.xitu.io/2019/9/24/16d625b82b79653e?w=1304&h=614&f=png&s=110046)
这里我们选择babel和配套的babylon7，可以根据实际需要自己选择，这只是推荐。

注意选择最新的babel7版本，不然下面例子中的类型会匹配不上，


#### 3. 现在的界面结构展示如下图，接下来就开始进行转换逻辑的代码编写
![](https://user-gold-cdn.xitu.io/2019/9/9/16d1606f4fff84a7?w=1688&h=1104&f=png&s=337517)


**假设我们的目标是要把properties属性中key为‘current’的属性改为myCurrent。let's go!**

**原始代码：**
```
/*eslint-disable*/
/*globals Page, getApp, App, wx,Component,getCurrentPages*/
Component({
  externalClasses: ['u-class'],

  relations: {
    '../tab/index': {
      type: 'child',
      linked() {
        this.changeCurrent();
      },
      linkChanged() {
        this.changeCurrent();
      },
      unlinked() {
        this.changeCurrent();
      }
    }
  },

  properties: {
    current: {
      type: String,
      value: '',
      observer: 'changeCurrent'
    }
  },

  methods: {
    changeCurrent(val = this.data.current) {
      let items = this.getRelationNodes('../tab/index');
      const len = items.length;

      if (len > 0) {
        items.forEach(item => {
          item.changeScroll(this.data.scroll);
          item.changeCurrent(item.data.key === val);
          item.changeCurrentColor(this.data.color);
        });
      }
    },
    emitEvent(key) {
      this.triggerEvent('change', { key });
    }
  }
});

```

首先在原始代码中选中'current'，查看右边ast的节点结构，如图：

![](https://user-gold-cdn.xitu.io/2019/9/9/16d160d37c39d32b?w=1588&h=1054&f=png&s=276117)

这是一个对象属性（ObjectProperty），关键节点信息为key和value，key本身也是一个ast节点，类型为Identifier（准确的应该是StringIdentifer，常用的还有NumberIdentifer等）,'curent'是里面的name属性。所以我们的第一步就是找到改节点，然后修改它。

#### 查找

```
export default function (babel) {
  const { types: t } = babel;
  
  return {
    name: "ast-transform", // not required
    visitor: {
      Identifier(path) {
        //path.node.name = path.node.name.split('').reverse().join('');
      },
       ObjectProperty(path) {
         if (path.node.key.type === 'StringIdentifier' && 
             path.node.key.name === 'current') {
         	console.log(path,'StringIdentifier')
         }
  	   }
    }
  };
}

```
这里需要用到`@babel/types`[https://babeljs.io/docs/en/babel-types](https://babeljs.io/docs/en/babel-types)来辅助我们进行类型判断,开发中会非常依赖这个字典进行查找

在控制台会看见，path下面的节点信息很多，关键字段为node和parentPath，node记录了该节点下数据信息，例如之前提到过的key和value。parentPath代表父级节点，此例中表示ObjectExpression中properties节点信息，有时我们需要修改父节点的数据，例如常见的节点移除操作。接下来我们修改该节点信息。

#### 修改

在`@babel/types`中找到该ObjectProperty的节点信息如下，我们需要需要构造一个新的同类型节点（ObjectProperty）来替换它。
![](https://user-gold-cdn.xitu.io/2019/9/9/16d16213932ff1db?w=1428&h=788&f=png&s=147730)
可以看到关键信息是key和value，其他使用默认就好。value里面的信息我们可以照搬，从原有的path里面获取，我们更改的只是key里面的标识符'current'。因为key本身也是一个ast节点，所以我们还需要查看字典，看看生成Identifier节点需要什么参数，步骤一样。修改代码如下：
```
ObjectProperty(path) {
         console.log(path,'ObjectProperty--')
         if (path.node.key.type === 'Identifier' && 
             path.node.key.name === 'current') {
            //替换节点
           path.replaceWith(t.objectProperty(t.identifier('myCurrent'), path.node.value));
         }
  	   }
```
> 其中我们用到了replaceWith方法，这个方法表示用一个ast节点来替换当前节点。
还有一个常用的replaceWithSourceString方法，表示用一个字符串来代替该ast节点，参数为一串代码字符串，如：'current : {type:String};'，感兴趣的，可以自己试试。

最后查看转换后的代码，发现'current'已经被我们替换成了'myCurrent'。

![](https://user-gold-cdn.xitu.io/2019/9/9/16d162c3cb59d542?w=644&h=320&f=png&s=25321)

到这里，一个完整的例子就演示完了。这里补充说明一下，在实际中可能会遇到嵌套结构比较深的ast结构。我们需要嵌套类型判断，比如：
```
ObjectProperty(path) {
     console.log(path,'ObjectProperty--')
      MemberExpression(memberPath) {
          console.log(path,'memberPath--')
      }
 }
```
因为遍历中的path指定的是当前匹配的节点信息。所以可以为不同的类型遍历指定不同的path参数，来获取当前遍历的节点信息，避免path覆盖，例如上面的path和memberPath。

到这里，babel的基本用法就差不多介绍完了，想要熟练掌握，还需要你在项目中反复练习和实践。想系统学习babel，并在实际项目中使用的同学可以先看看这篇babel的[介绍文档](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-traversal)，边写边查，巩固学习

## 实战：
> 使用组件库的时候，不想打包所有组件，只打包项目中引入的组件

### 组件库按需加载：
```
visitor: {
    ImportDeclaration(path, {opts})
    {
        const specifiers = path.node.specifiers;
        const source = path.node.source;

        // 判断传入的配置参数是否是数组形式
        if (Array.isArray(opts)) {
            opts.forEach(opt => {
                assert(opt.libraryName, 'libraryName should be provided');
            });
            if (!opts.find(opt => opt.libraryName === source.value)) return;
        } else {
            assert(opts.libraryName, 'libraryName should be provided');
            if (opts.libraryName !== source.value) return;
        }

        const opt = Array.isArray(opts) ? opts.find(opt => opt.libraryName === source.value) : opts;
        opt.camel2UnderlineComponentName = typeof opt.camel2UnderlineComponentName === 'undefined'
            ? false
            : opt.camel2UnderlineComponentName;
        opt.camel2DashComponentName = typeof opt.camel2DashComponentName === 'undefined'
            ? false
            : opt.camel2DashComponentName;

        if (!t.isImportDefaultSpecifier(specifiers[0]) && !t.isImportNamespaceSpecifier(specifiers[0])) {
            // 遍历specifiers生成转换后的ImportDeclaration节点数组
            const declarations = specifiers.map((specifier) => {
                // 转换组件名称
                const transformedSourceName = opt.camel2UnderlineComponentName
                    ? camel2Underline(specifier.imported.name)
                    : opt.camel2DashComponentName
                        ? camel2Dash(specifier.imported.name)
                        : specifier.imported.name;
                // 利用自定义的customSourceFunc生成绝对路径，然后创建新的ImportDeclaration节点
                return t.ImportDeclaration([t.ImportDefaultSpecifier(specifier.local)],
                    t.StringLiteral(opt.customSourceFunc(transformedSourceName)));
            });
            // 将当前节点替换成新建的ImportDeclaration节点组
            path.replaceWithMultiple(declarations);
        }
    }
}
```
然后安装babel-cli工具，将代码打包，发布到npm，就可以在项目中使用了。如果再优化完善下，是不是就可以把现有项目中ant-design的按需加载功能移除了。。。 

在项目中设置`.babelrc`文件，增加自定义插件配置

![](https://user-gold-cdn.xitu.io/2019/9/25/16d661d43916018a?w=2356&h=338&f=png&s=113368)

### 效果：
```
//之前
import { button, table } from 'union-design';

//现在
import button from 'union-design/src/components/button/index.js';
import table from 'union-design/src/components/table/index.js';
```

## 总结


在wx2中大量依赖babel提供的转译能力，对小程序间的语法差异进行转换和抹平。比如：

1. 自定义组件中的`relations`的差异

2. `getRelationNodes` 的API等价转换

3. transition动画数据结构的差异

4. `onLaunch`, `onShow`, `onLoad`中不支持使用`selectComponent`和`selectAllComponents`的处理

5. 微信的wxs语法的转换

6. 登录流程，百度系使用passport SDK的转换

7. 用户自定义函数的处理


熟悉掌握了AST的相关知识，并灵活运用，可以在实际工作中产生巨大的生产力。
