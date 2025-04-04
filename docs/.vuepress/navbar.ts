import {defineNavbarConfig} from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
    {icon: 'solar:home-smile-linear', text: '首页', link: '/'},
    {icon: 'hugeicons:note-edit', text: '博客', link: '/blog/'},
    // {icon:'codicon:tag',text: '标签', link: '/blog/tags/'},
    {icon: 'svg-spinners:clock', text: '归档', link: '/blog/archives/'},
    // 笔记
    {
        icon: 'tabler:windmill',
        text: '笔记',
        items: [
            {
                text: 'Cloud',
                icon: 'logos:google-cloud',
                items: [
                    {icon: 'material-symbols:cloud-outline', text: 'X-Learning', link: '/notes/python/Z-ml-README.md'},
                    // { icon: 'proicons:python', text: 'Python', link: '/notes/python/Z-ml-README.md' },
                ],
            },
            {
                text: 'Leaf',
                icon: 'emojione-v1:four-leaf-clover',
                items: [
                    {icon: 'carbon:network-public', text: 'Network', link: '/notes/network/Z-README-30.md'},
                    {icon: 'simple-icons:leetcode', text: 'LeetCode', link: '/notes/leetcode/README.md'},
                ],
            },
        ],
    },
    // 更多
    {
        icon: 'mdi:more-circle-outline',
        text: '更多',
        items: [
            {
                text: 'Crabapple',
                icon: 'unjs:std-env',
                items: [
                {
                    text: '站点导航',
                    icon: 'gravity-ui:paper-plane',
                    link: '/site/guide/'
                },
                {
                    text: 'Github Repo',
                    icon: 'mdi:github',
                    link: '/github/guide/'
                }],
            }
        ],
    },
    // 留言板
    {
        icon: 'fluent:chat-24-regular',
        text: '留言板',
        link: '/chat/'
    },
])
