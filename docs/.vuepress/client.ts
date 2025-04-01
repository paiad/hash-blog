import { defineClientConfig } from 'vuepress/client';
import { h } from 'vue';
import NotFound from "./layouts/NotFound.vue";
import HelloWorld from "./theme/components/HelloWorld.vue";
import FileUpload from "./theme/components/FileUpload.vue";
import Paiad from "./theme/components/Paiad.vue";
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue';
import {createCursorEffect} from "./theme/utils/cursorEffect";
import { adjustIframeHeight } from './theme/utils/iframeUtils';
import './theme/styles/index.css';
import './theme/styles/custom.css';
import './theme/styles/search.css';
import './theme/styles/markdown.scss';
import './theme/styles/tailwind.css';

export default defineClientConfig({
    enhance({ app }) {
        app.component('HelloWorld', HelloWorld);
        app.component('FileUpload', FileUpload);
        app.component('RepoCard', RepoCard);
        app.component('Paiad', Paiad);
        // 可以启用光标效果函数
        // createCursorEffect();
    },

    // 404 no-found
    layouts: {
        NotFound: () => h(NotFound, null, {
            'not-found': () => h(NotFound),
        }),
    },

    setup() {
        // 调用从 iframeUtils 导入的调整 iframe 高度的函数
        adjustIframeHeight();
    },
});
