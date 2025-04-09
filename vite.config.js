import { defineConfig } from 'vite'

export default defineConfig({
    base: '/fake-store/',
    server: {
        historyApiFallback: true
    }
})