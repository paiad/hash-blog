import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import {notes} from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: './image/Hash.png',

  appearance: true,
  profile: {
    avatar: 'https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/Hash.png',
    name: 'Paiad',
    description: '',
    circle: true,
    location: 'Lake Baikal',
    // organization: '',
  },

  navbar,
  notes,
  social: [
    // { icon: { svg: plumeIcon, name: 'plumeIcon' }, link: 'https://theme-plume.vuejs.press' },
    // { icon: { svg: hashIcon, name: 'hashIcon' }, link: 'https://github.com/Pai3141/pai' },
    { icon: 'github', link: 'https://github.com' },
    { icon: {svg: '<span class="vpi-social-settings"></span>', name: 'settings'}, link: 'https://theme-plume.vuejs.press/config/intro' },
    { icon: {svg:'<span class="vpi-social-emoji"></span>', name:'emoji'}, link: 'https://getemoji.com' },
  ],
  navbarSocialInclude:['github','settings','emoji'],

  footer:{
    message: '🍀The second best time is now.🍀',
    copyright: '© Copyright 2024 All Rights Reserved. Proprietary Rights Reserved by Paiad.'
  },

  outline: [2,4]
})
