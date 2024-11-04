import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '🌕首页', link: '/' },
  { text: '🌖博客', link: '/blog/' },
  { text: '🌗标签', link: '/blog/tags/' },
  { text: '🌘归档', link: '/blog/archives/' },
  // {
  //   text: '笔记',
  //   items: [{ text: '示例', link: '/notes/demo/README.md' }]
  // },
])
