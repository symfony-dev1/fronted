<template>
  <div class="container">
    <div class="row py-5">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your order</span>
          <span class="badge badge-secondary badge-pill">3</span>
        </h4>
        <!-- {{ checkoutForm }} -->
        <!-- {{ cartStore.carts }} -->
        <!-- {{ cartStore }} -->
        <ul class="list-group mb-3">
          <li
            v-if="cartStore.carts"
            v-for="cart in cartStore.carts"
            class="list-group-item d-flex justify-content-between lh-condensed"
          >
            <div>
              <h6 class="my-0">{{ cart.product.title }}</h6>
              <small class="text-muted"> {{ cart.quantity }} Quantity</small>
            </div>
            <span class="text-muted"
              >${{
                (cart.variant ? cart.variant.price : cart.product.price) * cart.quantity
              }}</span
            >
          </li>
          <!-- <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Second product</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Third item</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Promo code</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span class="text-success">-$5</span>
          </li> -->

          <li class="list-group-item d-flex justify-content-between">
            <span>SubTotal (USD)</span>
            <strong>${{ cartStore.subTotal }}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Shipping Charge (USD)</span>
            <strong>${{ cartStore.shippingCharge }}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>${{ cartStore.total }}</strong>
          </li>
        </ul>

        <!-- <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code" />
            <div class="input-group-append">
              <button type="submit" class="btn btn-secondary">Redeem</button>
            </div>
          </div>
        </form> -->
      </div>

      <div class="col-md-8 order-md-1">
        <strong
          ><span v-if="checkoutStore.successMessage" class="text text-success">{{
            checkoutStore.successMessage
          }}</span>
          <span v-if="checkoutStore.errorMessage" class="text text-danger">{{
            checkoutStore.errorMessage
          }}</span>
          <span v-if="checkoutStore.exceptionError" class="text text-danger">{{
            checkoutStore.exceptionError
          }}</span></strong
        >
        <h4 class="mb-3">Billing address</h4>

        <form
          class="needs-validation"
          @submit.prevent="checkoutStore.handleCheckout(checkoutForm)"
        >
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input
                type="text"
                v-model="checkoutForm.firstName"
                placeholder="Enter first name"
                class="form-control"
                id="firstName"
              />
              <span
                class="text-danger"
                v-if="checkoutStore.checkoutValidationErrors"
                v-for="error in checkoutStore.checkoutValidationErrors.firstName"
                :key="error"
              >
                {{ error }}
              </span>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input
                type="text"
                class="form-control"
                v-model="checkoutForm.lastName"
                id="lastName"
                placeholder="Enter last name"
              />
              <span
                class="text-danger"
                v-if="checkoutStore.checkoutValidationErrors"
                v-for="error in checkoutStore.checkoutValidationErrors.lastName"
                :key="error"
              >
                {{ error }}
              </span>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 mb-3">
              <label for="email">Email </label>
              <input
                type="text"
                v-model="checkoutForm.email"
                class="form-control"
                id="email"
                placeholder="Enter email"
                autocomplete="off"
              />
              <span
                class="text-danger"
                v-if="checkoutStore.checkoutValidationErrors"
                v-for="error in checkoutStore.checkoutValidationErrors.email"
                :key="error"
              >
                {{ error }}
              </span>
            </div>

            <!-- <div class="col-md-6 mb-3">
              <label for="password">Acccount password </label>
              <input
                type="password"
                v-model="checkoutForm.password"
                class="form-control"
                id="password"
                placeholder="*********"
                autocomplete="off"
              />
              <span
                class="text-danger"
                v-if="checkoutStore.checkoutValidationErrors"
                v-for="error in checkoutStore.checkoutValidationErrors.password"
                :key="error"
              >
                {{ error }}
              </span>
            </div> -->
          </div>

          <div class="mb-3">
            <label for="address">Street and house no</label>
            <input
              type="text"
              class="form-control"
              v-model="checkoutForm.address"
              id="address"
              placeholder="1234 Main St"
            />
            <span
              class="text-danger"
              v-if="checkoutStore.checkoutValidationErrors"
              v-for="error in checkoutStore.checkoutValidationErrors.address"
              :key="error"
            >
              {{ error }}
            </span>
          </div>

          <div class="row">
            <div class="col-md-5 mb-3">
              <label for="country">Country</label>
              <select
                v-model="checkoutForm.country"
                class="form-control custom-select d-block w-100"
                id="country"
              >
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <span
                class="text-danger"
                v-if="checkoutStore.checkoutValidationErrors"
                v-for="error in checkoutStore.checkoutValidationErrors.country"
                :key="error"
              >
                {{ error }}
              </span>
            </div>
            <div class="col-md-4 mb-3">
              <label for="city">City </label>

              <input
                type="text"
                class="form-control"
                id="city"
                v-model="checkoutForm.city"
                placeholder="Enter city"
                autocomplete="off"
              />
              <span
                class="text-danger"
                v-if="checkoutStore.checkoutValidationErrors"
                v-for="error in checkoutStore.checkoutValidationErrors.city"
                :key="error"
              >
                {{ error }}
              </span>
            </div>
            <div class="col-md-3 mb-3">
              <label for="zip">Zip</label>
              <input
                type="text"
                v-model="checkoutForm.zip"
                class="form-control"
                id="zip"
                placeholder="Enter zip code"
              />
              <span
                class="text-danger"
                v-if="checkoutStore.checkoutValidationErrors"
                v-for="error in checkoutStore.checkoutValidationErrors.zip"
                :key="error"
              >
                {{ error }}
              </span>
            </div>
          </div>

          <div class="mb-3">
            <label for="extra-note">Extra Note </label>
            <input
              type="text"
              class="form-control"
              id="extra-note"
              placeholder="Enter note..."
            />
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="password">Phone </label>
              <input
                type="text"
                v-model="checkoutForm.phone"
                class="form-control"
                id="phone"
                placeholder="111-111-1111"
                autocomplete="off"
              />
              <span
                class="text-danger"
                v-if="checkoutStore.checkoutValidationErrors"
                v-for="error in checkoutStore.checkoutValidationErrors.phone"
                :key="error"
              >
                {{ error }}
              </span>
            </div>
            <div class="col-md-6 mb-3">
              <label for="extra-note">State </label>
              <input
                type="text"
                class="form-control"
                id="state"
                placeholder="Enter state..."
                v-model="checkoutForm.state"
              />
              <span
                class="text-danger"
                v-if="checkoutStore.checkoutValidationErrors"
                v-for="error in checkoutStore.checkoutValidationErrors.state"
                :key="error"
              >
                {{ error }}
              </span>
            </div>
          </div>

          <hr class="mb-4" />

          <h4 class="mb-3">Payment</h4>

          <div class="d-block my-3">
            <!-- <div class="custom-control custom-radio">
              <input
                id="credit"
                name="paymentMethod"
                type="radio"
                class="custom-control-input"
                checked
              />
              <label class="custom-control-label" for="credit">iDEAL</label>
            </div> -->
            <div class="custom-control custom-radio">
              <input
                id="debit"
                name="paymentMethod"
                type="radio"
                class="custom-control-input"
                value="cod"
                v-model="checkoutForm.paymentMethod"
              />
              <label class="custom-control-label" for="debit">Pay on pickup</label>
              <span
                class="text-danger"
                v-if="checkoutStore.checkoutValidationErrors"
                v-for="error in checkoutStore.checkoutValidationErrors.paymentMethod"
                :key="error"
              >
                {{ error }}
              </span>
            </div>
          </div>
          <!-- <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cc-name">Name on card</label>
              <input
                type="text"
                class="form-control"
                id="cc-name"
                placeholder=""
                required
              />
              <small class="text-muted">Full name as displayed on card</small>
              <div class="invalid-feedback">Name on card is required</div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="cc-number">Credit card number</label>
              <input
                type="text"
                class="form-control"
                id="cc-number"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Credit card number is required</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="cc-expiration">Expiration</label>
              <input
                type="text"
                class="form-control"
                id="cc-expiration"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Expiration date required</div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="cc-cvv">CVV</label>
              <input
                type="text"
                class="form-control"
                id="cc-cvv"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Security code required</div>
            </div>
          </div> -->
          <hr class="mb-4" />
          <button class="btn btn-success btn-lg btn-block" type="submit">
            Place Order And Pay
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCheckoutStore } from "../../Stores/checkout";
import { useCartStore } from "../../Stores/cart";
import { useAuthStore } from "../../Stores/auth";
import { ref, onBeforeMount, reactive, onMounted } from "vue";
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const authStore = useAuthStore();

onBeforeMount(async () => {
  if (authStore.isLoggedIn) {
    await authStore.getUser;
    await cartStore.getCart();
  }
});

const checkoutForm = reactive({
  firstName: null,
  lastName: null,
  phone: null,
  city: null,
  country: null,
  paymentMethod: null,
  extraNote: null,
  email: null,
  password: null,
  zip: null,
  address: null,
  user_id: null,
  total_amount: null,
  state: null,
});

onMounted(async () => {
  if (authStore.isLoggedIn) {
    await authStore.getUser;
    await cartStore.getCart();
    await cartStore.getCartCalculationByCartId(cartStore.currentCartId);
    checkoutForm.firstName = authStore.user.name;
    checkoutForm.email = authStore.user.email;
    checkoutForm.user_id = authStore.user.id;
    checkoutForm.total_amount = cartStore.subTotal;
  }
});
onMounted(() => {
  console.log("Component mounted!");
});
</script>
<style scoped>
/* @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap"); */
/* @import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"); */
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 15px;
  background: #eee;
}
.intro {
  background: #fff;
  padding: 60px 30px;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.5;
  text-align: center;
}
.intro h1 {
  font-size: 18pt;
  padding-bottom: 15px;
}
.intro p {
  font-size: 14px;
}

.action {
  text-align: center;
  display: block;
  margin-top: 20px;
}

a.btn {
  text-decoration: none;
  color: #666;
  border: 2px solid #666;
  padding: 10px 15px;
  display: inline-block;
  margin-left: 5px;
}
a.btn:hover {
  background: #666;
  color: #fff;
  transition: 0.3s;
  -webkit-transition: 0.3s;
}
.btn:before {
  font-family: FontAwesome;
  font-weight: normal;
  margin-right: 10px;
}
.github:before {
  content: "\f09b";
}
.down:before {
  content: "\f019";
}
.back:before {
  content: "\f112";
}
.credit {
  background: #fff;
  padding: 12px;
  font-size: 9pt;
  text-align: center;
  color: #333;
  margin-top: 40px;
}
.credit span:before {
  font-family: FontAwesome;
  color: #e41b17;
  content: "\f004";
}
.credit a {
  color: #333;
  text-decoration: none;
}
.credit a:hover {
  color: #1dbf73;
}
.credit a:hover:after {
  font-family: FontAwesome;
  content: "\f08e";
  font-size: 9pt;
  position: absolute;
  margin: 3px;
}
main {
  background: #fff;
  padding: 20px;
}

article li {
  color: #444;
  font-size: 15px;
  margin-left: 33px;
  line-height: 1.5;
  padding: 5px;
}
article h1,
article h2,
article h3,
article h4,
article p {
  padding: 14px;
  color: #333;
}
article p {
  font-size: 15px;
  line-height: 1.5;
}

@media only screen and (min-width: 1280px) {
  main {
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
    padding: 24px;
  }
}

.set-overlayer,
.set-glass,
.set-sticky {
  cursor: pointer;
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  color: #333;
  font-size: 16px;
}
.set-overlayer:after,
.set-glass:after,
.to-active:after,
.set-sticky:after {
  font-family: FontAwesome;
  font-size: 18pt;
  position: relative;
  float: right;
}
.set-overlayer:after,
.set-glass:after,
.set-sticky:after {
  content: "\f204";
  transition: 0.6s;
}

.to-active:after {
  content: "\f205";
  color: #008080;
  transition: 0.6s;
}
.set-overlayer,
.set-glass,
.set-sticky,
.source,
.theme-tray {
  margin: 10px;
  background: #f2f2f2;
  border-radius: 5px;
  border: 2px solid #f1f1f1;
  box-sizing: border-box;
}
/* Syntax Highlighter*/

pre.prettyprint {
  padding: 15px !important;
  margin: 10px;
  border: 0 !important;
  background: #f2f2f2;
  overflow: auto;
}

.source {
  white-space: pre;
  overflow: auto;
  max-height: 400px;
}
code {
  border: 1px solid #ddd;
  padding: 2px;
  border-radius: 2px;
}
</style>
