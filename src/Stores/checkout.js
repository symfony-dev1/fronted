import { defineStore } from "pinia"
import axios from "../config/axios.js"
import { useAuthStore } from "./auth.js";
import { useLoaderStore } from "./loader.js";

export const useCheckoutStore = defineStore("checkout", {

    state: () => {
        return {
            cartsState: [],
            shippingChargeState: 0,
            subTotalState: 0,
            totalState: 0,
            exceptionError: null,
            successMessage: null,
            checkoutValidationErrors: null,
            errorMessage: null
        }
    },

    getters: {

    },
    actions: {
        async handleCheckout(formData) {
            const authStore = useAuthStore();
            const loaderStore = useLoaderStore();
            loaderStore.setLoading(true)
            await axios
                .post("/api/checkout", formData, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.errorMessage = null;
                        this.successMessage = res.data.message
                        authStore.getCartGlobalCount();
                    } else {
                        this.successMessage = null
                        this.checkoutValidationErrors = res.data.data;
                        this.errorMessage = res.data.message;
                        this.exceptionError = null
                    }
                })
                .catch((e) => {
                    this.exceptionError = e.message;
                }).finally(() => {
                    loaderStore.setLoading(false)
                });

        },
    }
})