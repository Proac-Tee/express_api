<template>
  <nav
    class="flex justify-between items-center py-[1.5rem] text-[1rem] font-[400] text-[#D6D3D1]"
  >
    <div class="text-[2rem] font-700"><h1>Demo</h1></div>
    <ul class="flex gap-[2rem] justify-between items-center">
      <li v-if="!decoded || !decoded.uid">
        <router-link
          to="/login"
          class="hover:text-[#D09E72] ffont-[600] text-[1rem] cursor-pointer"
        >
          Login
        </router-link>
      </li>
      <li v-if="!decoded || !decoded.uid">
        <router-link
          to="/signup"
          class="hover:text-[#D09E72] font-[600] text-[1rem] cursor-pointer"
        >
          Get started
        </router-link>
      </li>
      <li v-if="decoded && decoded.uid">
        <p
          @click="logOut"
          class="hover:text-[#D09E72] font-[600] text-[1rem] cursor-pointer"
        >
          Logout
        </p>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { jwtDecode } from "jwt-decode";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { useStore } from "vuex";

interface JwtPayload {
  email: string;
  uid: string;
}

const store = useStore(); // Access the Vuex store instance

// Map getters to access token from the store
const { getters } = store;

const token = getters.getToken;

const toast = useToast();

// Reactive variable to store decoded token
const decoded = ref<JwtPayload | null>(null);

// Function to update decoded value when token changes
function updateDecoded(token: string | null) {
  if (token) {
    decoded.value = jwtDecode(token);
  } else {
    decoded.value = null;
  }
}

// Watch for changes in token and update decoded token accordingly
watch(() => getters.getToken, updateDecoded);

// Call updateDecoded initially to set the value
updateDecoded(token);

async function logOut() {
  try {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful, display message to the user

      // Clear token in Vuex store
      store.commit("clearToken", "");

      // Store token in local storage
      localStorage.removeItem("expressApiToken");

      // Display success toast
      toast.success(data.message);

      // Redirect user to dashboard or perform other actions
    } else {
      // Display error toast
      toast.error(data.message);
    }
  } catch (error: unknown) {
    // Display error toast
    toast.error("Error logging out");
  }
}
</script>

<style></style>
