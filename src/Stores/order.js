import { defineStore } from "pinia"
import axios from "../config/axios.js"
import { useAuthStore } from "./auth.js";
import { useLoaderStore } from "./loader.js";

export const useOrderStore = defineStore("order", {

    state: () => {
        return {
            exceptionError: null,
            successMessage: null,
            errorMessage: null
        }
    },

    getters: {

    },
    actions: {

    }
})