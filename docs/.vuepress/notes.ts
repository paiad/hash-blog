import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

const pythonNote = defineNoteConfig({
    dir: 'python',
    link: '/python',
    // sidebar: "auto",
    sidebar: [
        // {
        //     icon: 'skill-icons:nix-light',
        //     text: 'Hash Learning',
        // },
        // {
        //     dir: 'base',
        //     text: 'Python Base',
        //     link: '/python/base/',
        //     items: ['Basic-learning', 'Deep-shallow-copy', 'Iterator-generator', 'Immutable-object.md'],
        //     collapsed: true
        // },
        {
            dir: 'machine-learning',
            text: 'Machine Learning',
            link: '/python/ml/',
            items: ['Linear-Regression','Gradient-Descent','Cross-Validation',
                'Confusion-Matrix','Logistic-Regression','Clustering-Algorithm',
                'Decision-Tree','Ensemble-Learning','Support-Vector-Machine',"KNN"],
            collapsed: false
        },
        {
            dir: 'deep-learning',
            text: 'Deep Learning',
            link: '/python/dl/',
            items: ['Softmax-Classifier','Neural-Network','Deep-Learning'],
            collapsed: false
        },
    ]
})

const networkNote = defineNoteConfig({
    dir: 'network',
    link: '/network',
    // sidebar: "auto"
    sidebar: [
        // {
        //     icon: 'logos:ink',
        //     text: 'Network Learning',
        // },
        {
            dir: '30',
            text: '大三上',
            link: '/network/30/',
            items: ['NetworkSecurity', 'OperatingSystem', 'RT-SW', 'Rust', 'SDN', 'Snmp'],
            collapsed: true
        },
        {
            dir: '31',
            text: '大三下',
            link: '/network/31/',
            items: ['CyberDefense', 'MachineLearning', 'CloudComputing', 'IoT', 'English'],
            collapsed: false
        },

    ]
})

const websiteNote = defineNoteConfig({
    dir: 'web',
    link: '/web',
})

const modelNote = defineNoteConfig({
    dir: 'model',
    link: '/article/model',
    sidebar: [
        {
            text: '大模型',
            link: '/article/model/',
            items: ['Begin'],
            collapsed: true
        },
    ]
})


export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [networkNote, pythonNote, websiteNote],
})

