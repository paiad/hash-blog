import {defineThemeConfig} from 'vuepress-theme-plume'
import {navbar} from './navbar'
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
        {icon: 'github', link: 'https://github.com'},
        {icon:'discord',link:"https://discord.gg/psrws4UF"},
        // {icon: {svg: '<span class="vpi-social-emoji"></span>', name: 'emoji'}, link: 'https://getemoji.com'},
        // {icon: {svg: '<span class="vpi-social-iconify"></span>', name: 'iconify'}, link: 'https://icon-sets.iconify.design/'},
        {
            icon: {svg: '<span class="vpi-social-grok"></span>', name: 'grok'},
            link: 'https://grok.com/chat/'
        },
        {
            icon: {svg: '<span class="vpi-social-settings"></span>', name: 'settings'},
            link: 'https://theme-plume.vuejs.press/guide/intro/'
        },
    ],
    navbarSocialInclude: ['github','grok','settings'],

    footer: {
        message: '🍀𝓣𝓱𝓮 𝓼𝓮𝓬𝓸𝓷𝓭 𝓫𝓮𝓼𝓽 𝓽𝓲𝓶𝓮 𝓲𝓼 𝓷𝓸𝔀.🍀',
        copyright: `© Copyright ${new Date().getFullYear()} All Rights Reserved. Proprietary Rights Reserved by <a href="https://discord.gg/psrws4UF" target="_blank" class="rotating-star">𝑷𝒂𝒊𝒂𝒅</a>.`
    },

    outline: [2, 4]
})
