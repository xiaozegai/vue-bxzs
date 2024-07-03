import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
	plugins: [vue(), WindiCSS()],
	base: '/baoxiao/',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
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
				target: 'http://39.100.28.20:10001',
				changeOrigin: true
			}
			// '/avatars': {
			// 	target: 'http://localhost:3333',
			// 	changeOrigin: true
			// },
			// '/pictures': {
			// 	target: 'http://localhost:3333',
			// 	changeOrigin: true
			// },
			// '/logos': {
			// 	target: 'http://localhost:3333',
			// 	changeOrigin: true
			// }
		}
	}
});
