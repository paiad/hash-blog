import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/Hash.png',
  // your git repo url
  docsRepo: '',
  docsDir: 'docs',

  appearance: true,

  profile: {
    avatar: '/Hash.png',
    name: 'Hash',
    description: '',
    circle: true,
    location: 'Lake Baikal',
    // organization: '',
  },

  navbar,
  notes,
  social: [
    { icon: 'github', link: 'https://theme-plume.vuejs.press' },
    { icon: 'twitter', link: 'https://github.com/Pai3141/pai' },
  ],

  footer:false,

  outline: [2,4]
})
