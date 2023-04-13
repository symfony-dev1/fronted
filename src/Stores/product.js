import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "../config/axios.js"
import { useAuthStore } from "./auth.js"
import { useCounterStore } from "./counter.js"
import { useLoaderStore } from "./loader";
import Swal from 'sweetalert2';

export const useProductStore = defineStore("product", {
    state: () => {
        return {
            detailsState: {},
            exceptionError: null,
            successMessage: null,
            errorMessage: null,
            selectedVarint: ref(null),
            productPrice: null,
            variantPrice: null,
            attrData: {},
            noOfAttrData: 0,
            getVariantId: null,
            attributeFieldArr: [],
            isDisable: false,
            productHasVatiants: false,
            matchingVariant: false,
            IsExists: true
        }
    },

    getters: {
        details: (state) => state.detailsState,
    },
    actions: {
        // async getProductDetail(productSlug) {
        //     const loaderStore = useLoaderStore();
        //     loaderStore.setLoading(true);
        //     const authStore = useAuthStore();
        //     if (authStore.isLoggedIn) {
        //         await authStore.getUser;
        //     }
        //     await axios
        //         .get("/api/product/" + productSlug)
        //         .then((res) => {
        //             if (res.data.success) {
        //                 console.log(res.data.data);
        //                 this.detailsState = res.data.data;
        //                 this.productPrice = res.data.data.price;
        //                 this.variantPrice = res.data.data.variants.length > 0 ? res.data.data.variants[0].price : null;
        //                 // this.successMessage = res.data.message;

        //             } else {
        //                 console.log(res.data.message);
        //                 this.errorMessage = res.data.message;
        //             }
        //         })
        //         .catch((err) => {
        //             this.exceptionError = err.message;

        //         }).finally(() => {
        //             loaderStore.setLoading(false);
        //         });
        // },
        async getProductDetail(productSlug) {
            const loaderStore = useLoaderStore();
            loaderStore.setLoading(true);
            // const authStore = useAuthStore();
            // if (authStore.isLoggedIn) {
            //     await authStore.getUser;
            // }
            await axios
                .get("/api/product/" + productSlug)
                .then((res) => {
                    if (res.data.success) {
                        console.log(res.data.data);
                        this.detailsState = res.data.data.product;
                        this.productPrice = res.data.data.product.price;
                        // this.variantPrice = res.data.data.product.variants.length > 0 ? res.data.data.product.variants[0].price : null;
                        this.attrData = res.data.data.attrData;
                        this.noOfAttrData = res.data.data.noOfAttrData
                        this.productHasVatiants = res.data.data.product.variants.length > 0 ? true : false;
                        this.succssMessage = null;
                        this.errorMessage = null;

                    } else {
                        console.log(res.data.message);
                        this.errorMessage = res.data.message;
                    }
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        this.IsExists = false;
                    }

                    this.exceptionError = err.message;

                }).finally(() => {
                    loaderStore.setLoading(false);
                });
        },
        // async handleAddToCart() {
        //     const loaderStore = useLoaderStore();
        //     loaderStore.setLoading(true);
        //     if (this.detailsState.variants.length > 0) {
        //         if (!this.selectedVariant) {
        //             this.successMessage = null;
        //             loaderStore.setLoading(false);
        //             return this.errorMessage = "please select variant";
        //         }
        //     }
        //     const authStore = useAuthStore();
        //     const counterStore = useCounterStore();
        //     const url = "/api/cart";
        //     const data = {
        //         quantity: counterStore.count,
        //         product_id: this.detailsState.id,
        //         user_id: authStore.isLoggedIn ? authStore.user.id : null,
        //         variant_id: this.selectedVariant,
        //     };
        //     await axios
        //         .post(url, data, { withCredentials: true })
        //         .then((res) => {
        //             console.log(res);
        //             if (res.data.success) {
        //                 this.errorMessage = null;
        //                 this.successMessage = res.data.message;
        //             } else {
        //                 this.successMessage = null;
        //                 this.errorMessage = res.data.message;
        //             }
        //         })
        //         .catch((err) => {
        //             this.exceptionError = err.message;
        //         }).finally(() => {
        //             loaderStore.setLoading(false);
        //         });
        //     await authStore.getCartGlobalCount();

        // },
        async onChnageAttributeRadio(event, attributeName) {
            const loaderStore = useLoaderStore();

            // // Sample array
            // let items = [
            //     { id: 1, name: 'Item 1' },
            //     { id: 2, name: 'Item 2' },
            //     { id: 3, name: 'Item 3' }
            // ];

            // New item to add to the array
            let newItem = { attribute_name: attributeName, attribute_term_id: event.target.value };

            // Check if an item with the same key already exists in the array
            let index = this.attributeFieldArr.findIndex(item => item.attribute_name === newItem.attribute_name);
            // alert(index);

            if (index !== -1) {
                // // Item already exists, update the existing item
                // const attribute_name = attributeName
                // // const itemIndex = items.findIndex(item => item.id === itemId)
                // const attributeNamefind = this.attributeFieldArr.findIndex(item => item.attribute_name === attributeName)
                this.attributeFieldArr.splice(index, 1, { ...this.attributeFieldArr[index], attribute_term_id: event.target.value })

            } else {
                // Item doesn't exist, push the new item to the array
                this.attributeFieldArr.push(newItem);
            }


            // if (!this.attributeFieldArr.includes(attributeName)) {
            //     this.attributeFieldArr.push(attributeName);
            // }
            // console.log(this.attributeFieldArr);

            // if (this.attributeFieldArr.indexOf(attributeName) === -1) this.attributeFieldArr.push(event.target.value);
            if (this.attributeFieldArr.length != this.noOfAttrData) {
                this.successMessage = null;
                this.isDisable = true;
                return this.errorMessage = "please select attribute value";
            } else {
                loaderStore.setLoading(true);
                //check variant availabiliry
                const attributeFieldIds = this.attributeFieldArr.map(item => item.attribute_term_id);
                console.log(attributeFieldIds);
                console.log("--------------------------");

                await axios
                    .post("/api/product/checkVariantAvail", { "attributeField": attributeFieldIds, "noOfAttrData": this.noOfAttrData }, { withCredentials: true })
                    .then((res) => {
                        console.log(res);
                        // alert(res.data.data.variant.price);
                        if (res.data.success) {
                            this.isDisable = false;
                            this.matchingVariant = true;
                            this.errorMessage = null;
                            this.getVariantId = res.data.data.variant.id;
                            this.variantPrice = res.data.data.variant.price;
                        } else {
                            this.successMessage = null;
                            this.getVariantId = null;
                            this.isDisable = true;
                            this.matchingVariant = false
                            return this.errorMessage = res.data.message;
                        }
                    })
                    .catch((err) => {
                        loaderStore.setLoading(false);
                        this.successMessage = null;
                        this.exceptionError = err.message;
                    }).finally(() => {
                        loaderStore.setLoading(false);
                    });
            }

        },
        async handleAddToCart(formData) {
            const loaderStore = useLoaderStore();
            if (formData.attributeField.length != this.noOfAttrData) {
                this.successMessage = null;
                this.isDisable = true;
                return this.errorMessage = "please select attribute value";
            }
            loaderStore.setLoading(true);
            // if (this.noOfAttrData != formData.attributeField.length) {
            //     this.successMessage = null;
            //     loaderStore.setLoading(false);
            //     return this.errorMessage = "please select variant";
            // }

            //check variant availabiliry
            // await axios
            //     .post("/api/product/checkVariantAvail", { "attributeField": formData.attributeField }, { withCredentials: true })
            //     .then((res) => {
            //         console.log(res);
            //         if (res.data.success) {
            //             this.getVariantId = res.data.data.variant_id;
            //         } else {
            //             this.successMessage = null;
            //             loaderStore.setLoading(false);
            //             return this.errorMessage = res.data.message;
            //         }
            //     })
            //     .catch((err) => {
            //         this.exceptionError = err.message;
            //     }).finally(() => {
            //         loaderStore.setLoading(false);
            //     });
            const authStore = useAuthStore();
            const counterStore = useCounterStore();
            const url = "/api/cart";
            const data = {
                'product_id': this.detailsState.id,
                'user_id': authStore.isLoggedIn ? authStore.user.id : null,
                'quantity': counterStore.count,
                'attributeField': formData.attributeField,
                "variant_id": this.getVariantId ? this.getVariantId : null
            };
            await axios
                .post(url, data, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.isDisable = false;
                        this.errorMessage = null;
                        this.successMessage = res.data.message;
                    } else {
                        this.successMessage = null;
                        loaderStore.setLoading(false);
                        this.errorMessage = res.data.message;
                    }
                })
                .catch((err) => {
                    this.exceptionError = err.message;
                }).finally(() => {
                    loaderStore.setLoading(false);
                });
            await authStore.getCartGlobalCount();


        }
    }
});