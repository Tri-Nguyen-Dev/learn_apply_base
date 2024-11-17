import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import 'highlight.js/styles/github-dark.css';

import App from './App.vue'
import router from './router'


const renderApp = () => {
    const app = createApp(App)

    app.use(router)

    app.use(naive)

    app.use(createPinia())
    app.mount('#app')

}

renderApp()






