import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

const pythonNote = defineNoteConfig({
    dir: 'python',
    link: '/python',
    sidebar: [
        {
            icon: 'fluent-color:clipboard-text-edit-32',
            text: 'Hash Learning',
        },
        {
        text: '🐛Python',
        link: '/python/',
        items: ['Basic_learning', 'Deep_and_shallow_copy', 'Iterator_and_generator', 'Examination', 'LeetCode101'],
        collapsed: true
    },
    ]
})

const networkNote = defineNoteConfig({
    dir: 'network',
    link: '/network',
    sidebar: [
        {
            icon: 'fluent-color:clipboard-text-edit-32',
            text: 'Hash Learning',
        },
        {
            text: 'Network',
            link: '/network/',
            items: ['NetworkSecurity','OperatingSystem','RT-SW','SDN','Snmp','Rust'],
            collapsed: true
        },
    ]
})

const websiteNote = defineNoteConfig({
    dir: 'website',
    link: '/website',
})


export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [networkNote, pythonNote, websiteNote],
})
