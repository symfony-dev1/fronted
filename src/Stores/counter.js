import { defineStore } from "pinia"

export const useCounterStore = defineStore("counter", {
    state: () => {
        return {
            count: 1
        }
    },
    getters: {
        tripleCount: (state) => state.count * 3
    },
    actions: {
        increments() {
            this.count++;
        },
        decrements() {
            this.count > 1 ? this.count-- : 1;
        },
    }
})