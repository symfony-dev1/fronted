<template>
  <div class="container">
    <div class="card" v-if="productStore.IsExists">
      <div class="container-fliud">
        <form @submit.prevent="productStore.handleAddToCart(addToCartForm)">
          <div class="wrapper row">
            <div class="preview col-md-6">
              <div class="preview-pic tab-content">
                <div class="tab-pane active" id="pic-1">
                  <img
                    :src="
                      axios.defaults.baseURL +
                      '/uploads/products/' +
                      productStore.details.product_image
                    "
                  />
                </div>
              </div>
              <!-- {{ productStore }} -->
            </div>
            <div class="details col-md-6">
              <strong
                ><span v-if="productStore.successMessage" class="text text-success">{{
                  productStore.successMessage
                }}</span>
                <span v-if="productStore.errorMessage" class="text text-danger">{{
                  productStore.errorMessage
                }}</span></strong
              >

              <h3 class="product-title">{{ productStore.details.title }}</h3>
              <div class="rating">
                <div class="stars">
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                </div>
              </div>
              <div
                v-html="productStore.details.description"
                class="product-description"
              ></div>
              <!-- {{ productStore.productHasVatiants }}
                {{ productStore.matchingVariant }} -->
              <!-- {{ productStore }} -->
              <h4
                class="price"
                v-if="productStore.productHasVatiants && productStore.matchingVariant"
              >
                current price:
                <span>${{ productStore.variantPrice }}</span>
              </h4>
              <h4 class="price" v-else-if="!productStore.productHasVatiants">
                current price:
                <span>${{ productStore.productPrice }}</span>
              </h4>
              <!-- <h5 class="sizes">
              sizes:
              <span class="size" data-toggle="tooltip" title="small">s</span>
              <span class="size" data-toggle="tooltip" title="medium">m</span>
              <span class="size" data-toggle="tooltip" title="large">l</span>
              <span class="size" data-toggle="tooltip" title="xtra large">xl</span>
            </h5>
            <h5 class="colors">
              colors:
              <span
                class="color orange not-available"
                data-toggle="tooltip"
                title="Not In store"
              ></span>
              <span class="color green"></span>
              <span class="color blue"></span>
            </h5> -->
              <div class="action">
                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                  <!-- Quantity -->
                  <div class="d-flex mb-4" style="max-width: 300px">
                    <button
                      type="button"
                      class="btn btn-primary px-3 me-2"
                      @click="counterStore.decrements"
                      :disabled="productStore.isDisable"
                    >
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <span class="form-outline px-2 py-1 my-1 mx-2">
                      {{ counterStore.count }}
                    </span>
                    <button
                      class="btn btn-primary px-3 ms-2"
                      type="button"
                      @click="counterStore.increments"
                      :disabled="productStore.isDisable"
                    >
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                  <!-- Quantity -->
                </div>

                <!--  -->
                <!-- {{ productStore.details.variants }} -->

                <!-- <div v-for="main in productStore.details.variants" :key="main.id">
                  <div>
                    <div
                      v-for="(field, index) in main.variant_attribute_terms"
                      :key="field.pivot.variant_id"
                    >
                      <div>
                        <input
                          type="radio"
                          :id="field.slug + index"
                          :value="field.pivot.variant_id"
                          v-model="productStore.selectedVariant"
                          :checked="field.pivot.variant_id == 1"
                          @change="onChnageVariantRadio(main.price)"
                        />
                        <label :for="field.slug + index"> Size : {{ field.name }}</label
                        ><br />
                      </div>
                    </div>
                  </div>
                </div> -->
                <!--  -->
                <!-- {{ productStore.details.variants }} -->
                <!-- {{ productStore.attrData }} -->
                <div
                  v-if="productStore.attrData"
                  v-for="(attrObject, attribute_name, index) in productStore.attrData"
                  :key="attribute_name"
                >
                  <label> {{ attribute_name }} </label>
                  <select
                    @change="productStore.onChnageAttributeRadio($event, attribute_name)"
                    class="p-2 m-2 form-control"
                    v-model="addToCartForm.attributeField[index]"
                  >
                    <option disabled selected value="">
                      Select {{ attribute_name }}
                    </option>
                    <option
                      v-for="(attr, attribute_term_id) in attrObject"
                      :value="attribute_term_id"
                    >
                      {{ attr }}
                    </option>
                  </select>
                </div>

                <!-- <div
                  v-for="singleVariantObject in productStore.details.variants"
                  :key="singleVariantObject.id"
                >
                  <div
                    v-for="(
                      variantAttribute, index
                    ) in singleVariantObject.variant_attribute_terms"
                    :key="variantAttribute.pivot.variant_id"
                  >
                    <input
                      type="radio"
                      :id="variantAttribute.slug + index"
                      :value="variantAttribute.pivot.variant_id"
                      v-model="productStore.selectedVariant"
                      :checked="variantAttribute.pivot.variant_id == 1"
                      @change="onChnageVariantRadio(singleVariantObject.price)"
                    />
                    <label :for="variantAttribute.slug + index">
                      {{
                        " " +
                        variantAttribute.attribute.name +
                        ": " +
                        variantAttribute.name
                      }} </label
                    ><br />
                  </div>
                </div> -->

                <!-- {{ loaderStotr }} -->
                <button
                  class="add-to-cart btn btn-default"
                  type="submit"
                  :disabled="productStore.isDisable"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-else>
      <NotFoundPage />
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useProductStore } from "../../Stores/product";
import { useCounterStore } from "../../Stores/counter";
import axios from "../../config/axios";
import NotFoundPage from "../404.vue";

const route = useRoute();
const counterStore = useCounterStore();
const productStore = useProductStore();

const addToCartForm = reactive({
  attributeField: [],
});

onBeforeMount(async () => {
  await productStore.getProductDetail(route.params.slug);
});
</script>
<style scoped>
body {
  font-family: "open sans";
  overflow-x: hidden;
}

img {
  max-width: 100%;
}

.preview {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
@media screen and (max-width: 996px) {
  .preview {
    margin-bottom: 20px;
  }
}

.preview-pic {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.preview-thumbnail.nav-tabs {
  border: none;
  margin-top: 15px;
}
.preview-thumbnail.nav-tabs li {
  width: 18%;
  margin-right: 2.5%;
}
.preview-thumbnail.nav-tabs li img {
  max-width: 100%;
  display: block;
}
.preview-thumbnail.nav-tabs li a {
  padding: 0;
  margin: 0;
}
.preview-thumbnail.nav-tabs li:last-of-type {
  margin-right: 0;
}

.tab-content {
  overflow: hidden;
}
.tab-content img {
  width: 100%;
  -webkit-animation-name: opacity;
  animation-name: opacity;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
}

.card {
  margin-top: 50px;
  background: #eee;
  padding: 3em;
  line-height: 1.5em;
}

@media screen and (min-width: 997px) {
  .wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
}

.details {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.colors {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.product-title,
.price,
.sizes,
.colors {
  text-transform: UPPERCASE;
  font-weight: bold;
}

.checked,
.price span {
  color: #ff9f1a;
}

.product-title,
.rating,
.product-description,
.price,
.vote,
.sizes {
  margin-bottom: 15px;
}

.product-title {
  margin-top: 0;
}

.size {
  margin-right: 10px;
}
.size:first-of-type {
  margin-left: 40px;
}

.color {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  height: 2em;
  width: 2em;
  border-radius: 2px;
}
.color:first-of-type {
  margin-left: 20px;
}

.add-to-cart,
.like {
  background: #ff9f1a;
  padding: 1.2em 1.5em;
  border: none;
  text-transform: UPPERCASE;
  font-weight: bold;
  color: #fff;
  -webkit-transition: background 0.3s ease;
  transition: background 0.3s ease;
}
.add-to-cart:hover,
.like:hover {
  background: #b36800;
  color: #fff;
}

.not-available {
  text-align: center;
  line-height: 2em;
}
.not-available:before {
  font-family: fontawesome;
  content: "\f00d";
  color: #fff;
}

.orange {
  background: #ff9f1a;
}

.green {
  background: #85ad00;
}

.blue {
  background: #0076ad;
}

.tooltip-inner {
  padding: 1.3em;
}

@-webkit-keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
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
/*# sourceMappingURL=style.css.map */
</style>
