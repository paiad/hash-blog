import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

const pythonNote = defineNoteConfig({
    dir: 'python',
    link: '/python',
    sidebar: [{text: 'Python', items: ['Deep_and_shallow_copy', 'Examination', 'LeetCode101'], collapsed: true},
    ]
})


export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [pythonNote],
})
