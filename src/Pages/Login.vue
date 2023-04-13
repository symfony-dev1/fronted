<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-sm-6 mt-4">
        <div class="card">
          <div class="card-body">
            <h1 class="d-flex justify-content-center">Login</h1>
            <span
              v-if="authStore.loginPageError"
              class="text-danger text d-flex justify-content-center"
              >{{ authStore.loginPageError }}</span
            >
            <form class="form" @submit.prevent="authStore.handleLogin(loginForm)">
              <div class="mb-3">
                <label class="form-label" for="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  placeholder="enter email"
                  class="form-control"
                  v-model="loginForm.email"
                />
                <span
                  class="text-danger"
                  v-if="authStore.loginValidationErrors"
                  v-for="(error, index) in authStore.loginValidationErrors.email"
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
                  class="form-control"
                  v-model="loginForm.password"
                />
                <span
                  class="text-danger"
                  v-if="authStore.loginValidationErrors"
                  v-for="(error, index) in authStore.loginValidationErrors.password"
                  :key="error"
                >
                  {{ error }}
                </span>
              </div>
              <div class="mb-3">
                <button type="submit" class="form-control btn btn-primary">Login</button>
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
const loginForm = reactive({
  email: "",
  password: "",
});
</script>
