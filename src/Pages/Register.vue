<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-sm-6 mt-4">
        <div class="card">
          <div class="card-body">
            <h1 class="d-flex justify-content-center">Register</h1>
            <span
              v-if="authStore.registerPageError"
              class="text-danger text d-flex justify-content-center"
              >{{ authStore.registerPageError }}</span
            >
            <form
              class="registerForm"
              @submit.prevent="authStore.handleRegister(registerForm)"
            >
              <div class="mb-3">
                <label class="form-label" for="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="enter name"
                  class="form-control"
                  v-model="registerForm.name"
                />
                <span
                  class="text-danger"
                  v-if="authStore.registerValidationErrors"
                  v-for="(error, index) in authStore.registerValidationErrors.name"
                  :key="error"
                >
                  {{ error }}
                </span>
              </div>
              <div class="mb-3">
                <label class="form-label" for="email">Email:</label>
                <input
                  type="text"
                  v-model="registerForm.email"
                  id="email"
                  placeholder="enter email"
                  class="form-control"
                />
                <span
                  class="text-danger"
                  v-if="authStore.registerValidationErrors"
                  v-for="(error, index) in authStore.registerValidationErrors.email"
                  :key="error"
                >
                  {{ error }}
                </span>
              </div>
              <div class="mb-3">
                <label class="form-label" for="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="enter password"
                  v-model="registerForm.password"
                  class="form-control"
                />
                <span
                  class="text-danger"
                  v-if="authStore.registerValidationErrors"
                  v-for="(error, index) in authStore.registerValidationErrors.password"
                  :key="error"
                >
                  {{ error }}
                </span>
              </div>
              <div class="mb-3">
                <label class="form-label" for="cpassword">Confirm Password:</label>
                <input
                  type="password"
                  id="cpassword"
                  placeholder="re-enter password"
                  v-model="registerForm.cpassword"
                  class="form-control"
                />
                <span
                  class="text-danger"
                  v-if="authStore.registerValidationErrors"
                  v-for="(error, index) in authStore.registerValidationErrors.cpassword"
                  :key="error"
                >
                  {{ error }}
                </span>
              </div>
              <div class="mb-3">
                <button type="submit" class="form-control btn btn-primary">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useAuthStore } from "../Stores/auth.js";

const authStore = useAuthStore();
const registerForm = reactive({
  name: "",
  email: "",
  password: "",
  cpassword: "",
});
</script>
