import { defineStore } from 'pinia'

export const useLoaderStore = defineStore("loader", {
    id: 'app',
    state: () => ({
        isLoading: false
    }),
    actions: {
        setLoading(loading) {
            this.isLoading = loading
        }
    }
})