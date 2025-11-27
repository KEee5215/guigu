import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite' //vue3 set up 命名插件

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vueSetupExtend({}),
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        enable: command === 'serve',
        mockPath: 'mock', // ✅ 指定 mock 文件目录
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 👈 配置 @ 指向 src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 如果你用的是 Dart Sass（推荐），不需要 javascriptEnabled
          // javascriptEnabled: true, // ❌ 这是 node-sass 的选项，Dart Sass 不需要
          // ✅ 关键：自动注入全局变量
          additionalData: '@import "@/styles/variable.scss";',
        },
      },
    },

    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          // target: 'http://192.168.100.128:10086',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
