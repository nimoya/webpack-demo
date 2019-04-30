const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
	// 指定打包模式
	mode: 'development',
	entry: {
		// 配置入口文件
		main: ["@babel/polyfill", path.resolve(__dirname,'../src/main.js')]
	},
	output: {
		// 配置打包文件输出的目录
		path: path.resolve(__dirname,'../dist'),
		// 生成的js文件名称
		filename: 'js/[name].[hash:8].js',
		// 生成的chunk名称
		chunkFilename: 'js/[name].[hash:8].js',
		// 资源引用的路径
		publicPath: './'
	},
	devServer: {
		hot: true,
		port: 3000,
		contentBase: './dist'
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.runtime.esm.js'
		},
	},
	module: {
		rules: [
		{
			test: /\.vue$/,
			use: [
			{
				loader: 'cache-loader'
			},
			{
				loader: 'thread-loader'
			},
			{
				loader: 'vue-loader',
				options: {
				compilerOptions: {
					preserveWhitespace: false
				},
				}
			}
			]
		},{
			test: /\.jsx?$/,
			use: [
			{
				loader: 'cache-loader'
			},
			{
				loader: 'thread-loader'
			},
			{
				loader: 'babel-loader'
			}
			]
		},{
			test: /\.(scss|sass)$/,
			use: [
			{
				loader: 'style-loader'
			},{
				loader: 'css-loader',
				options: {
					importLoaders: 2
				}
			},{
				loader: 'sass-loader',
				options: {
					implementation: require('dart-sass')
				}
			},{
				loader: 'postcss-loader'
			}
			]
		},{
			test: /\.(jpe?g|png|gif)$/i,
			use: [
			{
				loader: 'url-loader',
				options: {
					limit: 4096,
					fallback: {
						loader: 'file-loader',
						options: {
							name: 'img/[name].[hash:8].[ext]'
						}
					}
				}
			}
			]
		},{
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			use: [
			{
				loader: 'url-loader',
				options: {
					limit: 4096,
					fallback: {
						loader: 'file-loader',
						options: {
							name: 'media/[name].[hash:8].[ext]'
						}
					}
				}
			}
			]
		},{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
			use: [
			{
				loader: 'url-loader',
				options: {
					limit: 4096,
					fallback: {
						loader: 'file-loader',
						options: {
							name: 'fonts/[name].[hash:8].[ext]'
						}
					}
				}
			}
			]
		}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html')
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				VUE_APP_BASE_URL: JSON.stringify('http://localhost:3000')
			}
		})
	]
}