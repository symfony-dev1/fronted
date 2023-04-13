<template>
  <div class="container mt-5">
    <h1 class="mb-5">My Orders</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Orders List</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="orders" v-for="(order, index) in orders" :key="order">
          <div class="accordion" id="tableAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#row-' + index"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Order #{{ order.id }}
                </button>
              </h2>
              <div
                :id="'row-' + index"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#tableAccordion"
              >
                <div class="accordion-body">
                  <div class="container mt-5">
                    <div class="row">
                      <div class="col-md-6">
                        <h3>Order Information</h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td>Order Number:</td>
                              <td>#{{ order.id }}</td>
                            </tr>
                            <tr>
                              <td>Order Date:</td>
                              <td>{{ order.created_at }}</td>
                            </tr>
                            <tr>
                              <td>Order Status:</td>
                              <td>
                                <span :class="'badge' + order.bgClass">{{
                                  order.order_status
                                }}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Total:</td>
                              <td>${{ order.total_amount }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="col-md-6">
                        <h3>Shipping Information</h3>
                        <address>
                          {{ order.shipping_first_name }} {{ order.shipping_last_name
                          }}<br />
                          {{ order.address }}<br />
                          {{ order.shipping_state }}, {{ order.shipping_country }}
                          {{ order.shipping_pincode }}<br />
                          Email: {{ order.email }}<br />
                          Phone: {{ order.phone_no }}
                        </address>
                      </div>
                    </div>
                    <h3>Order Items</h3>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="order.items" v-for="item in order.items" :key="item">
                          <td>{{ item.product.title }}</td>
                          <td>{{ item.quantity }}</td>
                          <td>${{ item.unit_amount }}</td>
                          <td>${{ item.unit_amount * item.quantity }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import axios from "../../config/axios";
import { useAuthStore } from "../../Stores/auth";
import { useLoaderStore } from "../../Stores/loader";

const orders = ref([]);
const authStore = useAuthStore();
const loaderStore = useLoaderStore();
onBeforeMount(async () => {
  loaderStore.setLoading(true);
  if (authStore.isLoggedIn) {
    await authStore.getUser;
  }
  await axios.get("/api/orders").then((res) => {
    loaderStore.setLoading(false);
    orders.value = res.data.data;
  });
});
</script>
