// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Projects/ackj/%E5%8D%97%E5%A4%A7-%E6%8A%A5%E9%94%80%E5%8A%A9%E6%89%8B/web+h5/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Projects/ackj/%E5%8D%97%E5%A4%A7-%E6%8A%A5%E9%94%80%E5%8A%A9%E6%89%8B/web+h5/node_modules/@vitejs/plugin-vue2/dist/index.mjs";
import WindiCSS from "file:///D:/Projects/ackj/%E5%8D%97%E5%A4%A7-%E6%8A%A5%E9%94%80%E5%8A%A9%E6%89%8B/web+h5/node_modules/vite-plugin-windicss/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Projects/ackj/%E5%8D%97%E5%A4%A7-%E6%8A%A5%E9%94%80%E5%8A%A9%E6%89%8B/web+h5/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    minify: "terser",
    // 必须开启：使用terserOptions才有效果
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
      "/api": {
        target: "http://192.168.1.233:8014",
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
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxhY2tqXFxcXFx1NTM1N1x1NTkyNy1cdTYyQTVcdTk1MDBcdTUyQTlcdTYyNEJcXFxcd2ViK2g1XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxhY2tqXFxcXFx1NTM1N1x1NTkyNy1cdTYyQTVcdTk1MDBcdTUyQTlcdTYyNEJcXFxcd2ViK2g1XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0cy9hY2tqLyVFNSU4RCU5NyVFNSVBNCVBNy0lRTYlOEElQTUlRTklOTQlODAlRTUlOEElQTklRTYlODklOEIvd2ViK2g1L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUyJztcclxuaW1wb3J0IFdpbmRpQ1NTIGZyb20gJ3ZpdGUtcGx1Z2luLXdpbmRpY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0cGx1Z2luczogW3Z1ZSgpLCBXaW5kaUNTUygpXSxcclxuXHRyZXNvbHZlOiB7XHJcblx0XHRhbGlhczoge1xyXG5cdFx0XHQnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0YnVpbGQ6IHtcclxuXHRcdG1pbmlmeTogJ3RlcnNlcicsIC8vIFx1NUZDNVx1OTg3Qlx1NUYwMFx1NTQyRlx1RkYxQVx1NEY3Rlx1NzUyOHRlcnNlck9wdGlvbnNcdTYyNERcdTY3MDlcdTY1NDhcdTY3OUNcclxuXHRcdHRlcnNlck9wdGlvbnM6IHtcclxuXHRcdFx0Y29tcHJlc3M6IHtcclxuXHRcdFx0XHQvL1x1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NjVGNlx1NzlGQlx1OTY2NGNvbnNvbGVcclxuXHRcdFx0XHRkcm9wX2NvbnNvbGU6IHRydWUsXHJcblx0XHRcdFx0ZHJvcF9kZWJ1Z2dlcjogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRzZXJ2ZXI6IHtcclxuXHRcdHByb3h5OiB7XHJcblx0XHRcdCcvYXBpJzoge1xyXG5cdFx0XHRcdHRhcmdldDogJ2h0dHA6Ly8xOTIuMTY4LjEuMjMzOjgwMTQnLFxyXG5cdFx0XHRcdGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyAnL2F2YXRhcnMnOiB7XHJcblx0XHRcdC8vIFx0dGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMzMzJyxcclxuXHRcdFx0Ly8gXHRjaGFuZ2VPcmlnaW46IHRydWVcclxuXHRcdFx0Ly8gfSxcclxuXHRcdFx0Ly8gJy9waWN0dXJlcyc6IHtcclxuXHRcdFx0Ly8gXHR0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMzMzMnLFxyXG5cdFx0XHQvLyBcdGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG5cdFx0XHQvLyB9LFxyXG5cdFx0XHQvLyAnL2xvZ29zJzoge1xyXG5cdFx0XHQvLyBcdHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzMzMycsXHJcblx0XHRcdC8vIFx0Y2hhbmdlT3JpZ2luOiB0cnVlXHJcblx0XHRcdC8vIH1cclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlVLFNBQVMsZUFBZSxXQUFXO0FBQzVXLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7QUFIMEosSUFBTSwyQ0FBMkM7QUFLaE8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3JEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ04sUUFBUTtBQUFBO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDZCxVQUFVO0FBQUE7QUFBQSxRQUVULGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNoQjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBYUQ7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
