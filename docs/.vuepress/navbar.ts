import {defineNavbarConfig} from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
    {icon:'solar:home-smile-linear',text: '首页', link: '/'},
    {icon:'hugeicons:note-edit',text: '博客', link: '/blog/'},
    {icon:'codicon:tag',text: '标签', link: '/blog/tags/'},
    {icon:'svg-spinners:clock',text: '归档', link: '/blog/archives/'},
    {
        icon:'tabler:windmill',
        text: '笔记',
        items: [
            {icon: 'skill-icons:python-light', text: 'Python', link: '/notes/python/README.md'},
            {icon: 'skill-icons:spring-light', text: 'Network', link: '/notes/network/Z-README.md'},
            {icon: 'skill-icons:vite-light', text: 'Website', link: '/notes/website/Z-README.md'},],
    },
])
