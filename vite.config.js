import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
	plugins: [vue(), WindiCSS()],
	base: '/',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
	build: {
		minify: 'terser', // 必须开启：使用terserOptions才有效果
		terserOptions: {
			compress: {
				//生产环境时移除console
				drop_console: true,
				drop_debugger: true
			}
		}
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://111.229.0.210:30000/',
        // target: 'http://192.168.1.233:8014',
				changeOrigin: true,
				pathRewrite: {"^/api": ""}
			}
		}
	}
});
