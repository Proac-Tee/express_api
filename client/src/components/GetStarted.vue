<template>
  <section
    class="h-full w-full mt-[2rem] bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 mx-auto px-[1rem] py-[2rem] rounded-[0.2rem] max-w-[400px] grid grid-cols-1 justify-center items-center gap-[1rem]"
  >
    <form @submit.prevent="getStartedHandler" class="w-[100%]">
      <div class="grid grid-cols-1 w-[100%] gap-[0.75rem]">
        <label for="signup_email_Address" class="text-[0.85rem] text-white"
          >Email address</label
        >
        <input
          type="email"
          v-model="email"
          id="signup_email_Address"
          placeholder="Please enter your email"
          class="focus:outline-none placeholder:text-white bg-[#584d44] text-[16px] p-[0.5rem] border-[1px] border-gray-[300] rounded-[0.75rem]"
        />
      </div>
      <div class="grid grid-cols-1 w-[100%] gap-[0.75rem]">
        <label for="signup_password" class="text-[0.85rem] text-white"
          >Password</label
        >

        <input
          type="password"
          v-model="password"
          id="signup_password"
          placeholder="Please enter your password"
          class="focus:outline-none placeholder:text-white bg-[#584d44] text-[16px] p-[0.5rem] border-[1px] border-gray-[300] rounded-[0.75rem]"
        />
      </div>
      <div class="grid grid-cols-1 w-[100%] gap-[0.75rem]">
        <label for="signup_confrim_password" class="text-[0.85rem] text-white"
          >Confrim password</label
        >
        <input
          type="password"
          v-model="confirmPassword"
          id="signup_confrim_password"
          placeholder="Please confirm your password"
          class="focus:outline-none text-[16px] placeholder:text-white bg-[#584d44] p-[0.5rem] border-[1px] border-gray-[300] rounded-[0.75rem]"
        />
      </div>
      <button
        type="submit"
        class="p-[0.75rem] w-[100%] hover:brightness-125 text-white text-[1.2rem] font-[600] bg-[#C39368] mt-[1rem] rounded-[0.75rem]"
      >
        Submit
      </button>
    </form>
    <router-link to="/login" class="text-[0.75rem] text-white">
      Already have an account ?
      <span class="pl-[0.5rem]"
        ><button class="text-[#a37642] font-[700]">Log In</button></span
      >
    </router-link>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const router = useRouter(); // Initialize useRouter

const toast = useToast();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

async function getStartedHandler() {
  // Extract the form data
  const formData = {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  // Check if passwords match
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    // You can also show an error message to the user if needed
    return;
  }

  // If passwords match, proceed with the form data
  const inputData = {
    email: formData.email,
    password: formData.password,
  };

  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    const data = await response.json();

    if (response.ok) {
      // Login successful, display message to the user

      // Display success toast
      toast.success(data.message);

      // Redirect user to login page
      router.push("/login");

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
