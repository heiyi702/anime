// vue.config.js
const path = require('path');
const url = 'http://localhost:3000';


function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	lintOnSave: true,
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('layout', resolve('src/layout'))
			.set('base', resolve('src/base'))
			.set('static', resolve('src/static'))
	},
	devServer: {
		// 设置代理
		proxy: {
			'/api/': { //使用"/api"来代替"http://f.apiplus.c" 
				target: url, //源地址 
				changeOrigin: true, //改变源 
				pathRewrite: {
					'^/api/': '/api/' //路径重写 
				}
			}
		}
		// proxy: 'http://localhost:3000'
	}
}
