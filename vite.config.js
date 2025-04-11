import {
    defineConfig
} from 'vite'

export default defineConfig({
    base: '/web-project-2/',
    server: {
        historyApiFallback: true
    }
})