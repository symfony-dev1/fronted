import { defineStore } from "pinia"
import axios from "../config/axios.js"
import { useAuthStore } from "./auth.js"
import { useLoaderStore } from "./loader.js"
import Swal from "sweetalert2"

export const useCartStore = defineStore("cart", {
    state: () => {
        return {
            currentCartId: null,
            cartsState: [],
            shippingChargeState: 0,
            subTotalState: 0,
            totalState: 0,
            exceptionError: null,
            successMessage: null,
            errorMessage: null,
            isShowMiniCart: false

        }
    },
    getters: {
        carts: (state) => state.cartsState,
        shippingCharge: (state) => state.shippingChargeState,
        subTotal: (state) => state.subTotalState,
        total: (state) => state.totalState,
    },
    actions: {
        async getCart() {
            const authStore = useAuthStore();
            const loaderStore = useLoaderStore();
            loaderStore.setLoading(true)
            if (authStore.isLoggedIn) {
                await authStore.getUser;
            }
            // console.log(authStore.user.name)
            const url = authStore.isLoggedIn ? "/api/cart?Id=" + authStore.user.id : "/api/cart";
            await axios
                .get(url, { withCredentials: true })
                .then((res) => {
                    if (res.data.success) {
                        this.cartsState = res.data.data;
                        if (res.data.data.length > 0) {
                            this.currentCartId = this.cartsState[0].id
                        }
                    } else {
                        this.errorMessage = res.data.message;
                    }
                })
                .catch((err) => {
                    this.exceptionError = err.message;
                }).finally(() => {
                    loaderStore.setLoading(false)
                });
        },
        async getCartCalculationByCartId(cart_id) {
            const url = "/api/cart/cartCalculation";
            const data = {
                cart_id: cart_id,
            };
            await axios
                .post(url, data, { withCredentials: true })
                .then((res) => {
                    if (res.data.success) {
                        console.log(res.data.data);
                        this.shippingChargeState = parseInt(res.data.data.shippingCharge);
                        this.subTotalState = res.data.data.subTotal;
                        this.totalState = res.data.data.total;
                        // successMessage.value = res.data.message;
                    } else {
                        this.errorMessage = res.data.message;
                    }
                })
                .catch((err) => {
                    this.exceptionError = err.message;
                });
        },
        async onChangeQuantity(cart, event) {
            console.log(cart)
            console.log(event.target.value)
            // alert("ll");
            const authStore = useAuthStore();
            const loaderStore = useLoaderStore();
            loaderStore.setLoading(true)
            console.log(cart);
            console.log(event.target.value);
            const url = "/api/cart/onChangeQuantity";
            const data = {
                cart_id: cart.id,
                quantity: event.target.value,
                product_id: cart.product.id,
                variant_id: cart.variant ? cart.variant.id : null
            };
            await axios
                .post(url, data, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.getCart();
                        this.getCartCalculationByCartId(cart.id);
                        this.successMessage = res.data.message;
                        // authStore.getCartGlobalCount();


                    } else {
                        this.errorMessage = res.data.message;
                    }
                })
                .catch((err) => {
                    this.exceptionError = err.message;
                }).finally(() => {
                    loaderStore.setLoading(false)
                });
            await authStore.getCartGlobalCount();


        },

        async removeItemCart(cart_id, product_id = null, variant_id = null, removeAll = false) {
            const authStore = useAuthStore();
            const loaderStore = useLoaderStore();
            loaderStore.setLoading(true)
            const url = "/api/cart/removeItemCart";
            const data = {
                cart_id: cart_id,
                product_id: product_id,
                variant_id: variant_id,
                removeAll: removeAll
            };

            Swal.fire({
                title: "Warning!",
                text: "Are you sure ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post(url, data, { withCredentials: true })
                        .then((res) => {
                            console.log(res);
                            if (res.data.success) {
                                if (removeAll) {
                                    this.currentCartId = null
                                };
                                this.getCart();
                                this.getCartCalculationByCartId(cart_id);
                                this.successMessage = res.data.message;
                                // authStore.getCartGlobalCount();
                            } else {
                                this.errorMessage = res.data.message;
                            }
                        })
                }
            }).catch((err) => {
                this.exceptionError = err.message;
            }).finally(() => {
                authStore.getCartGlobalCount();
                loaderStore.setLoading(false)
            });;


            // if (confirm("Do you really want to perform this action?")) {
            //     await axios
            //         .post(url, data, { withCredentials: true })
            //         .then((res) => {
            //             console.log(res);
            //             if (res.data.success) {
            //                 this.getCart();
            //                 this.getCartCalculationByCartId(cart_id);
            //                 this.successMessage = res.data.message;
            //                 // authStore.getCartGlobalCount();
            //             } else {
            //                 this.errorMessage = res.data.message;
            //             }
            //         })
            //         .catch((err) => {
            //             this.exceptionError = err.message;
            //         }).finally(() => {
            //             loaderStore.setLoading(false)
            //         });
            //     await authStore.getCartGlobalCount();

        }
    }
})