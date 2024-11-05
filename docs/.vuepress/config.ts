import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  base: '/pai/',
  lang: 'zh-CN',
  title: 'Hash Site',
  description: '',
  head: [
    // 设置 favor.ico，.vuepress/public 下
    [
      'link', { rel: 'icon', href: 'https://himg.bdimg.com/sys/portrait/item/wise.1.f350032f.kpL0_u2d3DABVaMFBTRlLg.jpg?time=6077\u0026tieba_portrait_time=6077\u0026tieba_portrait_time=6077' }
    ]
  ],

  bundler: viteBundler(),

  theme: plumeTheme({
    // 添加您的部署域名
    // hostname: 'https://your_site_url',

    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        //强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
        languages: ['shell', 'bash', 'typescript', 'javascript','java','rust','python','c++','c','vue'],
        theme: { light: 'github-light', dark: 'github-dark' },
      },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
      //   include: true,
      //   chart: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      markdownPower: {
        pdf: true,
        caniuse: true,
        plot: true,
        bilibili: true,
        youtube: true,
        icons: true,
        codepen: true,
        replit: true,
        codeSandbox: true,
        jsfiddle: true,
        repl: {
          go: true,
          rust: true,
          kotlin: true,
        },
      },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
    },
  }),
})
