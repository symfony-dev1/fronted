<template>
  <section class="h-100">
    <div class="container d-flex justify-content-center mt-50 mb-50">
      <div class="row">
        <div
          v-if="products.length > 0"
          v-for="product in products"
          :key="product"
          class="col-md-4 mt-2"
        >
          <RouterLink
            :to="{
              name: 'product_details',
              params: { slug: product.slug },
            }"
          >
            <div class="card">
              <div class="card-body">
                <div class="card-img-actions">
                  <img
                    :src="
                      axios.defaults.baseURL +
                      '/uploads/products/' +
                      product.product_image
                    "
                    class="card-img img-fluid"
                    width="96"
                    height="350"
                    alt=""
                  />
                </div>
              </div>

              <div class="card-body bg-light text-center">
                <div class="mb-2">
                  <h6 class="font-weight-semibold mb-2">
                    <a href="#" class="text-default mb-2" data-abc="true">{{
                      product.title
                    }}</a>
                  </h6>
                </div>

                <h3 class="mb-0 font-weight-semibold">${{ product.price }}</h3>

                <div>
                  <i class="fa fa-star star"></i>
                  <i class="fa fa-star star"></i>
                  <i class="fa fa-star star"></i>
                  <i class="fa fa-star star"></i>
                </div>

                <!-- <div class="text-muted mb-3">34 reviews</div> -->
                <!-- 
                <button type="button" class="btn bg-cart">
                  <i class="fa fa-cart-plus mr-2"></i> Add to cart
                </button> -->
              </div>
            </div>
          </RouterLink>
        </div>
        <div v-else>
          <h2 class="d-flex justify-content-center">Products Not Found!!!</h2>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
const products = ref([]);

onBeforeMount(async () => {
  await axios.get("/api/products").then((res) => {
    console.log(res);
    products.value = res.data.data;
  });
});
</script>
<style scoped>
body {
  margin: 0;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.5385;
  color: #333;
  text-align: left;
  background-color: #2196f3;
}

.mt-50 {
  margin-top: 50px;
}

.mb-50 {
  margin-bottom: 50px;
}

.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.1875rem;
}

.card-img-actions {
  position: relative;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
  text-align: center;
}

.card-img {
  width: 350px;
}

.star {
  color: red;
}

.bg-cart {
  background-color: orange;
  color: #fff;
}

.bg-cart:hover {
  color: #fff;
  background-color: green;
}

.bg-buy {
  background-color: green;
  color: #fff;
  padding-right: 29px;
}
.bg-buy:hover {
  color: #fff;
}

a {
  text-decoration: none !important;
}
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
