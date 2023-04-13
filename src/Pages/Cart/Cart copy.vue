<template>
  <section class="h-100">
    <div class="container py-5">
    {{ cartStore.carts.value }}
      <div class="row d-flex justify-content-center my-4">
        <span v-if="cartStore.successMessage" class="text text-success">{{
          cartStore.successMessage
        }}</span>
        <span v-if="cartStore.errorMessage" class="text text-danger">{{
          cartStore.errorMessage
        }}</span>
        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-header py-3">
              <h5 class="mb-0">Cart Items</h5>
            </div>

            <div class="card-body">
              <!-- Single item -->
              <div v-for="cart in cartStore.carts" :key="cart" class="row">
                <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                  <!-- Image -->
                  <div
                    class="bg-image hover-overlay hover-zoom ripple rounded"
                    data-mdb-ripple-color="light"
                  >
                    <img :src="cart.image" class="w-100" alt="Blue Jeans Jacket" />
                    <a href="#!">
                      <div
                        class="mask"
                        style="background-color: rgba(251, 251, 251, 0.2)"
                      ></div>
                    </a>
                  </div>
                  <!-- Image -->
                </div>
                <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                  <!-- Data -->
                  <p>
                    <strong>{{ cart.title }}</strong>
                  </p>
                  <p>Color: blue</p>
                  <p>Size: M</p>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm me-1 mb-2"
                    data-mdb-toggle="tooltip"
                    title="Remove item"
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm mb-2"
                    data-mdb-toggle="tooltip"
                    title="Move to the wish list"
                  >
                    <!-- <i class="fas fa-heart"></i> -->
                    <FontAwesomeIcon icon="heart" />
                  </button>
                  <!-- Data -->
                </div>

                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                  <!-- Quantity -->
                  <div class="d-flex mb-4" style="max-width: 300px">
                    <div class="form-outline">
                      <strong>Quantity:</strong>
                      <input
                        min="1"
                        name="quantity"
                        v-model="cart.quantity"
                        style="width: 7em"
                        type="number"
                        class="form-control"
                        @change="cartStore.onChangeQuantity(cart, $event)"
                        autocomplete="off"
                      />
                      <!-- <label class="form-label" for="form1">Quantity</label> -->
                    </div>
                  </div>
                  <!-- Quantity -->

                  <!-- Price -->
                  <div class="d-flex mb-4" style="max-width: 300px">
                    <div class="form-outline">
                      <strong>Price : ${{ cart.price * cart.quantity }}</strong>
                      <!-- <p class="text-start text-md-center">
                    <strong>Price : ${{ cart.product.price }}</strong>
                  </p> -->
                    </div>
                  </div>
                  <!-- Price -->
                </div>
                <hr class="my-4" />
              </div>
              <!-- Single item -->
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-header py-3">
              <h5 class="mb-0">Summary</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                >
                  Sub Total
                  <span>${{ cartStore.subTotal }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                >
                  Shipping Charge
                  <span>${{ cartStore.shippingCharge }}</span>
                </li>

                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3"
                >
                  <div>
                    <strong>Total amount</strong>
                  </div>
                  <span
                    ><strong>${{ cartStore.total }}</strong></span
                  >
                </li>
              </ul>
              <button type="button" class="btn btn-primary btn-lg btn-block">
                Go to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "../../config/axios.js";
import { useAuthStore } from "../../Stores/auth";
import { useRouter, useRoute } from "vue-router";
import { useCartStore } from "../../Stores/cart.js";

const userStore = useAuthStore();
const carts = ref([]);
const authUser = ref({});
const router = useRouter();
const route = useRoute();
const exceptionError = ref(null);
const successMessage = ref(null);
const errorMessage = ref(null);
const shippingCharge = ref(0);
const subTotal = ref(0);
const total = ref(0);
const cartStore = useCartStore();

onBeforeMount(async () => {
  // get login userId
  // if (userStore.authenticated) {
  //   await userStore.getUser;
  //   authUser.value = userStore.user;
  // }
  // const url = authUser.authenticated
  //   ? "/api/cart?Id=" + authUser.value
  //     ? authUser.value.id
  //     : null
  //   : "/api/cart";
  // await axios
  //   .get(url, { withCredentials: true })
  //   .then((res) => {
  //     if (res.data.success) {
  //       carts.value = res.data.data.cart;
  //       shippingCharge.value = parseInt(res.data.data.shippingCharge);
  //       subTotal.value = res.data.data.subTotal;
  //       total.value = res.data.data.total;
  //       // successMessage.value = res.data.message;
  //     } else {
  //       errorMessage.value = res.data.message;
  //     }
  //   })
  //   .catch((err) => {
  //     exceptionError.value = err.message;
  //   });

  await cartStore.getCart();
});

// const onChangeQuantity = async (cart, event) => {
//   console.log(cart);
//   console.log(event.target.value);
//   const url = "/api/cart/onChangeQuantity";
//   const data = {
//     cart_id: cart.id,
//     quantity: event.target.value,
//   };

//   await axios
//     .post(url, data, { withCredentials: true })
//     .then((res) => {
//       console.log(res);
//       if (res.data.success) {
//         // console.log(res);
//         location.reload();
//         // successMessage.value = res.data.message;
//         // route.push({ name: "cart" });
//       } else {
//         errorMessage.value = res.data.message;
//       }
//     })
//     .catch((err) => {
//       exceptionError.value = err.message;
//     });
// };
</script>
<style scoped>
.gradient-custom {
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(106, 17, 203, 1),
    rgba(37, 117, 252, 1)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
}
</style>
