<template>
  <div class="container">
    <div class="row py-5">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your order</span>
          <span class="badge badge-secondary badge-pill">3</span>
        </h4>
        <!-- {{ cartStore }} -->
        <ul class="list-group mb-3">
          <li
            v-for="cart in cartStore.carts"
            class="list-group-item d-flex justify-content-between lh-condensed"
          >
            <div>
              <h6 class="my-0">{{ cart.title }}</h6>
              <small class="text-muted"> {{ cart.quantity }} Quantity</small>
            </div>
            <span class="text-muted">${{ cart.price * cart.quantity }}</span>
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
        <h4 class="mb-3">Billing address</h4>
        <form class="needs-validation" novalidate>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                placeholder=""
                value=""
                required
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                placeholder=""
                value=""
                required
              />
              <div class="invalid-feedback">Valid last name is required.</div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="email">Email </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="you@example.com"
                autocomplete="off"
              />
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="password">Acccount password </label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="*********"
                autocomplete="off"
              />
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="address">Street and house no</label>
            <input
              type="text"
              class="form-control"
              id="address"
              placeholder="1234 Main St"
              required
            />
            <div class="invalid-feedback">Please enter your shipping address.</div>
          </div>

          <div class="row">
            <div class="col-md-5 mb-3">
              <label for="country">Country</label>
              <select
                class="form-control custom-select d-block w-100"
                id="country"
                required
              >
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <div class="invalid-feedback">Please select a valid country.</div>
            </div>
            <div class="col-md-4 mb-3">
              <label for="city">City </label>

              <input
                type="text"
                class="form-control"
                id="city"
                placeholder="enter city"
                autocomplete="off"
              />
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="zip">Zip</label>
              <input type="text" class="form-control" id="zip" placeholder="" required />
              <div class="invalid-feedback">Zip code required.</div>
            </div>
          </div>

          <!-- <div class="mb-3">
            <label for="extra-note">Extra Note </label>
            <input
              type="text"
              class="form-control"
              id="extra-note"
              placeholder="Enter note..."
            />
          </div> -->

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="password">Phone </label>
              <input
                type="phone"
                class="form-control"
                id="phone"
                placeholder="111-111-1111"
                autocomplete="off"
              />
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="extra-note">Extra Note </label>
              <textarea
                type="text"
                class="form-control"
                id="extra-note"
                placeholder="Enter note..."
              ></textarea>
            </div>
          </div>

          <hr class="mb-4" />

          <h4 class="mb-3">Payment</h4>

          <div class="d-block my-3">
            <div class="custom-control custom-radio">
              <input
                id="credit"
                name="paymentMethod"
                type="radio"
                class="custom-control-input"
                checked
                required
              />
              <label class="custom-control-label" for="credit">Credit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input
                id="debit"
                name="paymentMethod"
                type="radio"
                class="custom-control-input"
                required
              />
              <label class="custom-control-label" for="debit">Debit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input
                id="paypal"
                name="paymentMethod"
                type="radio"
                class="custom-control-input"
                required
              />
              <label class="custom-control-label" for="paypal">PayPal</label>
            </div>
          </div>
          <div class="row">
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
          </div>
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
import { ref, onBeforeMount } from "vue";

import { useAuthStore } from "../../Stores/auth";
import { useCartStore } from "../../Stores/cart";

const authStore = useAuthStore();
const cartStore = useCartStore();

onBeforeMount(() => {
  cartStore.getCart();
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
