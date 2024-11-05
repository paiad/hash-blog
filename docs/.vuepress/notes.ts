import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const rustNote = defineNoteConfig({
  dir: 'rust',
  link: '/rust',
  sidebar: ['', 'a_小小计算器', 'b_冒泡排序'],
})

const pythonNote = defineNoteConfig({
  dir: 'python',
  link: '/python',
  sidebar: ['', 'a_小小计算器'],
})


export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [rustNote,pythonNote],
})
