import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'
import {hashIcon} from "./public/svg/Hash";
import {plumeIcon} from "./public/svg/Plume";

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: 'https://raw.githubusercontent.com/Pai3141/PictureBed/main/img/Hash.png',
  // your git repo url
  docsRepo: '',
  docsDir: 'docs',

  appearance: true,

  profile: {
    avatar: 'https://raw.githubusercontent.com/Pai3141/PictureBed/main/img/Hash.png',
    name: 'Hash',
    description: '',
    circle: true,
    location: 'Lake Baikal',
    // organization: '',
  },

  navbar,
  notes,
  social: [
    { icon: { svg: plumeIcon, name: 'plumeIcon' }, link: 'https://theme-plume.vuejs.press' },
    { icon: { svg: hashIcon, name: 'hashIcon' }, link: 'https://github.com/Pai3141/pai' },
    { icon: 'github', link: 'https://github.com' },
  ],
  navbarSocialInclude:['plumeIcon','hashIcon','github'],

  footer:{ message: '',copyright: '© Copyright 2024 All Rights Reserved. Proprietary Rights Reserved by Paiad.'},

  outline: [2,4]
})
