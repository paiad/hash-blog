import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const pythonNote = defineNoteConfig({
  dir: 'python',
  link: '/python',
  sidebar: [''],
})


export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [pythonNote],
})
