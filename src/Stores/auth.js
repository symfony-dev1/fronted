import { defineStore } from "pinia"
import axios from "../config/axios.js"
import router from "../Router";

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            authenticated: localStorage.getItem('access-token') ? "Bearer " + localStorage.getItem('access-token') : null,
            loginValidationErrors: null,
            registerValidationErrors: null,
            exceptionErrors: null,
            loginPageError: null,
            registerPageError: null,
            user: null,
            globalSubTotalAmount: 0,
            globalQuantityCount: 0
        }
    },

    getters: {
        // getUser: (state) => state.user,
        async getUser() {
            if (this.authenticated) {
                const res = await axios.get('/api/user');
                this.user = res.data.data;
            }
        },
        // userData: (state) => state.user,
        isLoggedIn: (state) => state.authenticated,
    },
    actions: {
        async getToken() {
            await axios.get("/sanctum/csrf-cookie");
        },
        async handleLogin(formData) {
            await this.getToken();
            await axios
                .post("/api/login", formData, { withCredentials: true })
                .then((res) => {
                    if (res.data.success) {
                        localStorage.setItem('access-token', res.data.data.token)
                        this.authenticated = localStorage.getItem('access-token');
                        this.user = res.data.data;
                        router.push({ name: "home" });
                    } else {
                        this.loginValidationErrors = res.data.data;
                        this.loginPageError = res.data.message;
                    }
                })
                .catch((e) => {
                    this.loginPageError = e.message;
                });


        },
        async handleRegister(formData) {
            // await this.getToken();
            await axios
                .post("/api/register", formData)
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.authenticated = localStorage.getItem('access-token');
                        router.push({ name: "login" });
                    } else {
                        this.registerValidationErrors = res.data.data;
                        this.registerPageError = res.data.message;
                    }
                })
                .catch((e) => {
                    this.registerPageError = e.message;
                });

        },
        async handleLogout() {
            await axios
                .post("/api/logout", [], {
                    headers: { Authorization: `Bearer ${this.authenticated}` },
                })
                .then((res) => {
                    if (res.data.success) {
                        localStorage.removeItem('access-token');
                        this.authenticated = null;
                        this.user = null;
                        router.push({ name: "login" });
                    } else {
                        this.loginPageError = e.message;
                    }
                })
                .catch((e) => {
                    this.exceptionErrors = e.message;
                });
            await this.getCartGlobalCount();


        },
        async getCartGlobalCount() {
            const data = {
                user_id: this.user ? this.user.id : null
            }
            await axios
                .post("/api/cart/cartGlobalCount", data, { withCredentials: true })
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        this.globalQuantityCount = res.data.data.globalQuantityCount;
                        this.globalSubTotalAmount = res.data.data.globalSubTotalAmount;

                    } else {

                    }
                })
                .catch((e) => {
                    this.exceptionErrors = e.message;
                });

        }
    }
})