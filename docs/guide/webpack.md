# Webpack

## 核心概念
- 入口(entry)
  - 入口起点(entry point)指示 webpack 应该使用哪个模块,来作为构建其内部依赖图的开始。进入入口起点后,webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。每个依赖项随即被处理,最后输出到称之为 bundles 的文件中
- 输出(output)
  - output 属性告诉 webpack 在哪里输出它所创建的 bundles,以及如何命名这些文件,默认值为 ./dist。基本上,整个应用程序结构,都会被编译到你指定的输出路径的文件夹中
- 加载器(loader)
  - loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块,然后你就可以利用 webpack 的打包能力,对它们进行处理。本质上,webpack loader 将所有类型的文件,转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块
- 插件(plugins)
  - loader 被用于转换某些类型的模块,而插件则可以用于执行范围更广的任务。插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量。插件接口功能极其强大,可以用来处理各种各样的任务

## 构建流程
- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- 确定入口：根据配置中的 entry 找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

## 常见的Loader
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- image-loader：加载并且压缩图片文件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- eslint-loader：通过 ESLint 检查 JavaScript 代码

## 常见的Plugin
- define-plugin：定义环境变量
- html-webpack-plugin：简化html文件创建
- uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码
- webpack-parallel-uglify-plugin: 多核压缩,提高压缩速度
- webpack-bundle-analyzer: 可视化webpack输出文件的体积
- mini-css-extract-plugin: CSS提取到单独的文件中,支持按需加载

## 性能优化
- treeShaking
- 动态引入polyfill
- 压缩
- CDN
- 提取公共代码库（SplitChunksPlugin）
- sourceMap（devtool的合理）
  - 保存源代码映射关系的文件
- 持久化缓存（保证 hash 值的唯一性，即为每个打包后的资源生成一个独一无二的 hash 值，只要打包内容不一致，那么 hash 值就不一致。）
- 打包分析工具（webpack-bundle-analyzer）

## 构建速度
- 使用高版本的 Webpack 和 Node.js
- 多线程压缩（happy-pack/thread-loader/parallel-webpack）
- 分包（使用html-webpack-externals-plugin指定引入包CDN）
- DLLPlugin（把不太变化的代码打包成静态资源）
- 缩小构建目标
  - exclude/include (确定 loader 规则范围，有些包本来就是压缩的)
  - resolve.modules（用于配置 webpack 去哪些目录下寻找第三方模块）
  - 指明第三方模块的绝对路径 (减少不必要的查找)
  - resolve.mainFields (有一些第三方模块会针对不同环境提供几份代码，mainFields的配置去决定优先采用哪一份代码）
  - resolve.extensions (尽可能减少后缀尝试的可能性）
  - noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)
  - IgnorePlugin (完全排除模块)
  - 合理使用alias
- 开启缓存  
  - babel-loader 开启缓存
  - terser-webpack-plugin 开启缓存
  - 使用 cache-loader 或者 hard-source-webpack-plugin

## 介绍bundle，chunk，module
- bundle：是由webpack打包出来的文件
- chunk：代码块，一个chunk由多个模块组合而成，用于代码的合并和分割
- module：是开发中的单个模块，在webpack的世界，一切皆模块，一个模块对应一个文件，webpack会从配置的entry中递归开始找出所有依赖的模块

## Loader和Plugin的不同
- 作用
  - Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析_非JavaScript文件_的能力。
  - Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
- 用法
  - Loader在module.rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）
  - Plugin在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。

## Tree-Shaking原理
- ES6的模块引入是静态分析的，故而可以在编译时正确判断到底加载了什么代码
- 分析程序流，判断哪些变量未被使用、引用，进而删除此代码

## 按需加载的原理
定义installedChunks对象，存储异步js的promise回调，如果已经加载过，则返回一个空数组的promise.all([])，如果在加载过程中，则返回已经存储过的此文件对应的promise

## webpack的热更新原理
- webpack-dev-server启动本地服务
- 修改webpack.config.js的entry配置
- 监听webpack编译结束
- webpack监听文件变化
- 浏览器接收到热更新的通知

## 如何编写一个 Loader
- 新建一个loaders目录
- 目录下新建一个replaceLoader.js文件
```
const loaderUtils = require('loader-utils');
module.exports = function(source) {
	return source.replace('blue', 'black');
}
```
- 目录下新建一个replaceLoaderAsync.js文件
```
const loaderUtils = require('loader-utils');
module.exports = function(source) {
	const options = loaderUtils.getOptions(this);
	const callback = this.async();
	setTimeout(() => {
		const result = source.replace('dalao', options.name);
		callback(null, result);
	}, 1000);
}
```
- webpack.config.js的配置文件
```
const path = require('path');
module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	resolveLoader: {
		modules: ['node_modules', './loaders']
	},
	module: {
		rules: [{
			test: /\.js/,
			use: [
				// {
				// 	loader: 'replaceLoader',
				// },
				// {
				// 	loader: 'replaceLoaderAsync',
				// 	options: {
				// 		name: 'uncle'
				// 	}
				// },
				{
					loader: path.resolve(
            __dirname, 
            './loaders/replaceLoader.js'
          )
				},
				{
					loader: path.resolve(
            __dirname,
            './loaders/replaceLoaderAsync.js'
          ),
					options: {
						name: 'uncle'
					}
				}
			]
		}]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	}
}
```


## 如何编写一个 plugins
- 新建一个plugins目录
- 目录下新建一个copyright-webpack-plugin.js文件
```
class CopyrightWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compile.tap('CopyrightWebpackPlugin',
      (compilation) => {
        console.log('compiler');
      }
    )
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',
      (compilation, cb) => {
        debugger;
        compilation.assets['copyright.txt'] = {
          source: function () {
            return 'copyright by black uncle'
          },
          size: function () {
            return 24;
          }
        };
        cb();
      }
    )
  }
}
module.exports = CopyrightWebpackPlugin;
```
- webpack.config.js的配置文件
```
const path = require('path');
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	plugins: [
		new CopyRightWebpackPlugin()
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	}
}
```