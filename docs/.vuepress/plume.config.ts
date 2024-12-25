import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'
import {hashIcon} from "./public/svg/Hash";

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
    { icon: { svg: hashIcon, name: 'hashIcon' }, link: 'https://github.com/Pai3141/pai' },
  ],
  navbarSocialInclude:['github','hashIcon'],

  footer:{ message: '',copyright: '© Copyright 2024 All Rights Reserved. Proprietary Rights Reserved by Paiad.'},

  outline: [2,4]
})
