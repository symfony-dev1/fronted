import { createRouter, createWebHistory } from 'vue-router'
import Home from "../Pages/Home.vue";
import Login from "../Pages/Login.vue";
import Logout from "../Pages/Logout.vue";
import Register from "../Pages/Register.vue";
import Products from "../Pages/Product/Products.vue";
import ProductDetail from "../Pages/Product/ProductDetail.vue";
import Profile from "../Pages/Profile.vue";
import Cart from "../Pages/Cart/Cart.vue";
import Checkout from "../Pages/Checkout/Checkout.vue";
import Orders from "../Pages/Order/Orders.vue";
import { useAuthStore } from "../Stores/auth";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            middleware: "guest",
            title: "Home"
        },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            middleware: "guest",
            title: "Login"
        }
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        path: "/logout",
        name: "logout",
        component: Logout,
        meta: {
            middleware: "auth",
            title: `Logout`
        }
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
        meta: {
            middleware: "guest",
            title: `profile`
        }
    },
    {
        path: "/products",
        name: "products",
        component: Products,
        meta: {
            middleware: "guest",
            title: `products`
        }
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart,
        meta: {
            middleware: "guest",
            title: `carts`
        }
    },
    {
        path: "/checkout",
        name: "checkout",
        component: Checkout,
        meta: {
            middleware: "auth",
            title: `checkout`
        }
    },
    {
        path: "/orders",
        name: "orders",
        component: Orders,
        meta: {
            middleware: "auth",
            title: `orders`
        }
    },
    {
        path: "/product/:slug",
        name: "product_details",
        component: ProductDetail,
        meta: {
            middleware: "guest",
            title: `Product Detail`
        }
    }
];

// const router = createRouter({
//     history: createWebHistory(import.meta.env.BASE_URL),
//     routes,
// })

// worked like middleware
// router.beforeEach((to, from) => {
//     console.log(to);
//     if (to.meta.requiresAuth && store.getters.getToken == 0) {
//         alert("lll");

//         router.push({ name: "login" })
//     }


//     if (!to.meta.requiresAuth && store.getters.getToken != 0) {
//         alert("llleee");

//         router.push({ name: "dashboard" })
//     }
// });
const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    const useStore = useAuthStore()
    if (to.meta.middleware == "guest") {
        // if (useStore.authenticated) {
        //     next({ name: "profile" })
        // }
        next()
    } else {
        if (useStore.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})
export default router

// export default router;



// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import Posts from '../views/posts/Index.vue'
// import PostCreate from '../views/posts/Create.vue'
// import PostEdit from '../views/posts/Edit.vue'


// const router = createRouter({
//     history: createWebHistory(import.meta.env.BASE_URL),
//     routes: [
//         {
//             path: '/',
//             name: 'home',
//             component: HomeView
//         },
//         {
//             path: '/posts',
//             name: 'posts',
//             component: Posts
//         },
//         {
//             path: '/posts/create',
//             name: 'posts.create',
//             component: PostCreate
//         },
//         {
//             path: '/posts/:id',
//             name: 'posts.edit',
//             component: PostEdit
//         },
//         {
//             path: '/about',
//             name: 'about',
//             // route level code-splitting
//             // this generates a separate chunk (About.[hash].js) for this route
//             // which is lazy-loaded when the route is visited.
//             component: () => import('../views/AboutView.vue')
//         }
//     ]
// })

// export default router

