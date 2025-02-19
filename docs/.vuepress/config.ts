import {viteBundler} from '@vuepress/bundler-vite'
import {defineUserConfig} from 'vuepress'
import {plumeTheme} from 'vuepress-theme-plume'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: '𝑯𝒂𝒔𝒉',
    description: '',
    head: [
        // 设置 favor.ico，.vuepress/public 下
        [
            'link', {rel: 'icon', href: 'https://raw.githubusercontent.com/Pai3141/PictureBed/main/img/Hash.png'}
        ],

        // 引入自定义字体
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css'
            }
        ],

        // 引入 Google 字体 Dancing Script
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap'
            }
        ]
    ],

    bundler: viteBundler(),
    shouldPrefetch: false,

    theme: plumeTheme({
        // 添加您的部署域名, 开启sitemap
        hostname: 'http://paiad.online',

        //配置锁的页面
        locales: {
            '/': {
                encryptButtonText: '确认',
                encryptPlaceholder: '请输入密码',
                encryptPageText: '访问这篇文章需要联系管理员(@2369538173qq.com)',
                // notFound:{"code":"404","title":"页面未找到","quote":"但是，如果你不改变方向，并且一直寻找，最终可能会到达你要去的地方。","linkText":"返回首页"}
            },
        },

        //加密
        encrypt: {
            rules: {
                //路由&交换
                // '/article/o6pj1ty3/': ['h3c123456'],
                //Website
                // '/article/76px1e7z/': 'website123456',
                //all project
                // '^/article/pj[^/]+/$': 'dwh_pj_123456',
            }
        },

        blog:{
            //分页
            pagination: 8,
        },

        // bulletin: {
        //     layout: 'bottom-right',
        //     title: 'Try to scan it',
        //     lifetime: "once",
        //     content: '<center><img src="https://raw.githubusercontent.com/Pai3141/PictureBed/main/img/qrcode_with_logo.png" width="150rpx"></center>',
        //     contentType: "text"
        // },

        plugins: {
            watermark: {
                enabled: false,
            },
            /**
             * Shiki 代码高亮
             * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
             */
            shiki: {
                //强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
                languages: ['shell', 'mermaid', 'bash', 'typescript', 'javascript', 'java', 'rust', 'python', 'c++', 'c', 'vue'],
                theme: {light: 'github-light', dark: 'github-dark'},
            },

            /**
             * markdown enhance
             * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
             */
            markdownEnhance: {
                demo: false,
                mermaid: true,
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
                demo: true,
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
            comment: {
              provider: "Giscus",
              comment: true,
              repo: "Pai3141/pai",
              repoId: "R_kgDONKKpfg",
              category: "General",
              categoryId: "DIC_kwDONKKpfs4Ckx4R",
              mapping: 'pathname',
              reactionsEnabled: true,
              inputPosition: 'top',
            },

            /**
             * Algolia DocSearch
             */
            docsearch: {
                appId: "64GTZ021MP",
                apiKey: "2d04158638978b8d8ac72c1c74210ad0",
                indexName: "paiad",
            }
        },
    }),
})
