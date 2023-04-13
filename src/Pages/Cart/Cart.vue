<template>
  <section class="h-100">
    <div class="container py-5">
      <div class="row d-flex justify-content-center my-4">
        <div class="col-md-8">
          <strong
            ><span v-if="cartStore.successMessage" class="text text-success">{{
              cartStore.successMessage
            }}</span>
            <span v-if="cartStore.errorMessage" class="text text-danger">{{
              cartStore.errorMessage
            }}</span></strong
          >
          <div class="card mb-4">
            <div class="card-header">
              <div class="row">
                <div class="col-sm-6">
                  <h5 class="float-start">Cart Items</h5>
                </div>
                <div class="col-sm-6 text text-danger">
                  <p class="float-end">
                    <button
                      type="button"
                      v-if="cartStore.currentCartId"
                      data-mdb-toggle="tooltip"
                      class="btn btn-warning btn-sm justify-content-end"
                      title="Remove item"
                      @click="
                        cartStore.removeItemCart(
                          cartStore.currentCartId,
                          null,
                          null,
                          true
                        )
                      "
                    >
                      Empty Cart
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <!-- {{ cartStore.carts }} -->
            <div class="card-body">
              <!-- Single item -->
              <div
                v-if="cartStore.carts.length > 0"
                v-for="cart in cartStore.carts"
                :key="cart.id"
                class="row"
              >
                <!-- {{ cart }} -->
                <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                  <!-- Image -->
                  <div
                    class="bg-image hover-overlay hover-zoom ripple rounded"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      :src="axios.defaults.baseURL + '/uploads/products/' + cart.image"
                      class="w-100"
                      alt="Blue Jeans Jacket"
                    />
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
                    <strong>{{ cart.product.title }}</strong>
                  </p>
                  <!-- <p>Color: blue</p> -->
                  <p
                    v-if="cart.variant"
                    v-for="(atr, index) in cart.variant.variant_attribute_terms"
                  >
                    <span> {{ atr.attribute.name }}: {{ atr.name }} </span>
                  </p>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm me-1 mb-2"
                    data-mdb-toggle="tooltip"
                    title="Remove item"
                    @click="
                      cartStore.removeItemCart(
                        cart.id,
                        cart.product.id,
                        cart.variant ? cart.variant.id : null
                      )
                    "
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                  <!-- <button
                    type="button"
                    class="btn btn-danger btn-sm mb-2"
                    data-mdb-toggle="tooltip"
                    title="Move to the wish list"
                  >
                    <FontAwesomeIcon icon="heart" />
                  </button> -->
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
                      <strong
                        >Price : ${{
                          (cart.variant ? cart.variant.price : cart.product.price) *
                          cart.quantity
                        }}</strong
                      >
                      <!-- <p class="text-start text-md-center">
                    <strong>Price : ${{ cart.product.price }}</strong>
                  </p> -->
                    </div>
                  </div>
                  <!-- Price -->
                </div>
                <hr class="my-4" />
              </div>
              <div v-else class="row d-flex justify-content-center">Cart is empty!</div>

              <!-- Single item -->
            </div>
          </div>
        </div>
        <div v-if="cartStore.carts.length > 0" class="col-md-4">
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
              <RouterLink
                :to="{ name: 'checkout' }"
                type="button"
                class="btn btn-primary btn-lg btn-block"
              >
                Go to checkout
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useCartStore } from "../../Stores/cart.js";
import { RouterLink } from "vue-router";
import { useLoaderStore } from "../../Stores/loader";
import axios from "@/config/axios";

const cartStore = useCartStore();
const loaderStore = useLoaderStore();
onBeforeMount(async () => {
  loaderStore.setLoading(true);
  await cartStore.getCart();
  await cartStore.getCartCalculationByCartId(cartStore.currentCartId);
  loaderStore.setLoading(false);
});
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
