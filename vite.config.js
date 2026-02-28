import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                suite: resolve(__dirname, 'suite.html'),
                library: resolve(__dirname, 'library.html'),
                journal: resolve(__dirname, 'journal.html'),
            }
        }
    }
})
