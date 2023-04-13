<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <RouterLink
          :to="{ name: 'home' }"
          class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
        >
          <!-- <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap"></use>
          </svg> -->
          <FontAwesomeIcon icon="shopping-cart" />
        </RouterLink>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <RouterLink :to="{ name: 'home' }" class="nav-link px-2 text-secondary"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink :to="{ name: 'products' }" class="nav-link px-2 text-secondary"
              >All Products</RouterLink
            >
          </li>
          <li>
            <RouterLink :to="{ name: 'orders' }" class="nav-link px-2 text-secondary"
              >My Orders</RouterLink
            >
          </li>
          <!-- <li>
            <RouterLink :to="#" class="nav-link px-2 text-white">Features</RouterLink>
          </li>
          <li>
            <RouterLink :to="#" class="nav-link px-2 text-white">Pricing</RouterLink>
          </li>
          <li>
            <RouterLink :to="#" class="nav-link px-2 text-white">FAQs</RouterLink>
          </li>
          <li>
            <RouterLink :to="#" class="nav-link px-2 text-white">About</RouterLink>
          </li> -->
        </ul>

        <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input
            type="search"
            class="form-control form-control-dark"
            placeholder="Search..."
            aria-label="Search"
          />
        </form> -->
        <div class="text-end">
          <template v-if="!authStore.isLoggedIn">
            <RouterLink
              :to="{ name: 'login' }"
              type="button"
              class="btn btn-outline-light me-2"
              >Login</RouterLink
            >
            <RouterLink
              :to="{ name: 'register' }"
              type="button"
              class="btn btn-warning me-2"
              >Register</RouterLink
            >
          </template>
          <template v-else>
            <FontAwesomeIcon icon="user" />
            <b class="me-2"> {{ authStore.user ? authStore.user.first_name : null }} </b>
            <Logout />
          </template>
          <!-- <RouterLink :to="{ name: 'cart' }" class="btn btn-sm text-white">
            <FontAwesomeIcon icon="shopping-cart" />
          </RouterLink> -->

          <RouterLink
            :to="{ name: 'cart' }"
            type="button"
            class="btn btn-primary position-relative me-2"
            @mouseover="cartStore.isShowMiniCart = true"
          >
            <FontAwesomeIcon icon="shopping-cart" />
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ authStore.globalQuantityCount }}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
  <div v-if="cartStore.isShowMiniCart === true && cartStore.carts.length > 0">
    <div class="shopping-cart">
      <div class="row">
        <div class="col-sm-6">
          <p class="float-start">
            <strong>
              <span class="lighter-text">Total: </span>
              <span class="main-color-text"
                >${{ authStore.globalSubTotalAmount }}</span
              ></strong
            >
          </p>
        </div>
        <div class="col-sm-6 text text-danger">
          <p class="float-end">
            <FontAwesomeIcon
              @click="cartStore.isShowMiniCart = false"
              icon="times"
              title="Close Cart"
            />
          </p>
        </div>
      </div>

      <tbody>
        <tr v-for="(item, index) in cartStore.carts" :key="index" class="m-4 p-4">
          <td class="p-2 m-2">
            <img
              :src="axios.defaults.baseURL + '/uploads/products/' + item.image"
              alt="item1"
              height="60"
              width="60"
            />
          </td>
          <td class="text text-secondary p-2 m-2">
            <span class="p-1 m-1">{{ item.product.title }}</span
            ><br />
            Price:
            <span class="text text-primary p-1 m-1"
              >${{ item.variant ? item.variant.price : item.product.price }} </span
            ><br />
            <span class="p-1 m-1"
              >Quantity: <span class="text text-primary"> {{ item.quantity }}</span></span
            >
          </td>

          <td class="text text-secondary p-4 m-4">
            <FontAwesomeIcon
              @click="
                cartStore.removeItemCart(
                  item.id,
                  item.product.id,
                  item.variant ? item.variant.id : null
                )
              "
              icon="times"
              title="Remove Item"
            />
          </td>
        </tr>
      </tbody>

      <!--end shopping-cart-header -->

      <button @click="clickToCheckout" class="form-control btn btn-primary p-2 m-2">
        Checkout
      </button>
    </div>
    <!--end shopping-cart -->
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useAuthStore } from "../../Stores/auth";
import { useCartStore } from "../../Stores/cart";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import Logout from "../Logout.vue";
import axios from "@/config/axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const cartStore = useCartStore();
const authStore = useAuthStore();
const route = useRoute();

onBeforeMount(async () => {
  if (authStore.authenticated) {
    await authStore.getUser;
  }
  await cartStore.getCart();
  await authStore.getCartGlobalCount();
});

const clickToCheckout = () => {
  cartStore.isShowMiniCart = false;
  route.push({ name: "checkout" });
};
</script>

<style scoped>
.lighter-text {
  color: #abb0be;
}

.main-color-text {
  color: #6394f8;
}

.container {
  margin: auto;
  width: 80%;
  border-radius: 20;
}

.badge {
  background-color: #6394f8;
  border-radius: 10px;
  color: white;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 3px 7px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
}

.shopping-cart {
  margin: 20px 0;
  float: right;
  background: white;
  width: 320px;
  position: relative;
  border-radius: 3px;
  padding: 20px;
}
shopping-cart-header {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 15px;
}
.shopping-cart-total {
  float: right;
}

.shopping-cart-items {
  padding-top: 20px;
}
.shopping-cart-items li {
  margin-bottom: -20px;
}

.shopping-cart-items img {
  float: left;
  margin-right: 12px;
}

.item-name {
  /* display: block; */
  /* padding-top: 10px;
  font-size: 16px; */
}

.item-price {
  color: #6394f8;
  margin-right: 8px;
}

.item-quantity {
  color: #abb0be;
}

.shopping-cart:after {
  bottom: 100%;
  left: 96%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: white;
  border-width: 8px;
  margin-left: -8px;
}

.cart-icon {
  float: left;
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
</style>
