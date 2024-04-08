<template>
  <section
    class="h-full w-full mt-[2rem] bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 mx-auto px-[1rem] py-[2rem] rounded-[0.2rem] max-w-[400px] grid grid-cols-1 justify-center items-center gap-[1rem]"
  >
    <form @submit.prevent="loginHandler">
      <div class="grid grid-cols-1 w-[100%] gap-[0.75rem]">
        <label for="signin_email_Address" class="text-[0.85rem] text-white"
          >Email address</label
        >
        <input
          type="email"
          v-model="email"
          id="signin_email_Address"
          placeholder="Please enter your email"
          class="focus:outline-none placeholder:text-white bg-[#584d44] text-[16px] p-[0.5rem] border-[1px] border-gray-[300] rounded-[0.75rem]"
        />
      </div>
      <div class="grid grid-cols-1 w-[100%] gap-[0.75rem]">
        <label for="signin_password" class="text-[0.85rem] text-white"
          >Password</label
        >

        <input
          type="password"
          v-model="password"
          id="signin_password"
          placeholder="Please enter your password"
          class="focus:outline-none placeholder:text-white bg-[#584d44] text-[16px] p-[0.5rem] border-[1px] border-gray-[300] rounded-[0.75rem]"
        />
      </div>
      <button
        type="submit"
        class="p-[0.75rem] w-[100%] hover:brightness-125 text-white text-[1.2rem] font-[600] bg-[#C39368] mt-[1rem] rounded-[0.75rem]"
      >
        Submit
      </button>
    </form>
    <router-link to="/signup" class="text-[0.75rem] text-white">
      Don't have an account ?
      <span class="pl-[0.5rem]"
        ><button class="text-[#a37642] font-[700]">Get Started</button></span
      >
    </router-link>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { useStore } from "vuex";

const router = useRouter(); // Initialize useRouter

const store = useStore(); // Access the Vuex store instance

const toast = useToast();

const email = ref("");
const password = ref("");

async function loginHandler() {
  const formData = {
    email: email.value,
    password: password.value,
  };

  // If passwords match, proceed with the form data
  const inputData = {
    email: formData.email,
    password: formData.password,
  };

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful, display message to the user

      // Optionally, you can also access the JWT token
      const accessToken = data.accessToken;

      // Store token in local storage
      localStorage.setItem("expressApiToken", accessToken);

      // Commit mutation to update Vuex state
      store.commit("setToken", accessToken);

      // Display success toast
      toast.success(data.message);

      // Redirect user to login page
      router.push("/");

      // Redirect user to dashboard or perform other actions
    } else {
      // Display error toast
      toast.error(data.message);
    }
  } catch (error: unknown) {
    // Display error toast
    toast.error("Error signing in");
  }
}
</script>

<style></style>
