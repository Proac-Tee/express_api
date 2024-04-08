<template>
  <section class="p-[1rem] w-[100%] h-[100%]">
    <section
      class="relative text-white max-w-[700px] h-[80vh] mx-auto bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 px-[1rem] py-[2rem] rounded-[0.2rem]"
    >
      <section class="py-[1rem] h-[90%] overflow-y-auto">
        <section class="grid grid-cols-1 gap-[1rem]">
          <div
            v-for="dataItem in data"
            :key="dataItem.id"
            :class="{
              'flex flex-wrap gap-[1rem] mx-[1rem]': true,
              'justify-end': dataItem.addedBy === uid,
              'justify-start': dataItem.addedBy !== uid,
            }"
          >
            <div class="min-w-[30px] max-w-[60%]">
              <div
                :class="{
                  'bg-blue-500': dataItem.addedBy !== uid,
                  'bg-green-500': dataItem.addedBy === uid,
                  'p-[1rem] rounded-[1rem] w-[100%]': true,
                }"
              >
                <p>
                  {{ dataItem.chat }}
                </p>
              </div>

              <div>
                <p class="text-[0.7rem] pt-[0.3rem] italic text-green-700">
                  {{ dataItem.username }}
                </p>
                <p class="text-[0.7rem] pt-[0.3rem] italic text-blue-700">
                  {{ formatDateTime(dataItem.createdAt) }}
                </p>
              </div>
              <div
                @click="
                  () => {
                    updateToggle = '';
                  }
                "
                v-if="updateToggle === dataItem._id"
                class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-30"
              >
                <div
                  @click.stop
                  class="relative bg-white w-[350px] h-[100px] p-8 rounded-lg z-40 flex justify-center items-center gap-[1rem]"
                >
                  <input
                    type="text"
                    name="updatedChat"
                    id="updatedChat"
                    v-model="updatedChat"
                    class="bg-white text-black border-[1px] flex-1 border-gray-500 focus:outline-none px-2 py-1 rounded-md"
                  />

                  <button
                    @click="() => updateHandler(dataItem._id)"
                    class="bg-[#a37642] text-[0.875rem] p-[0.5rem] rounded-[0.75rem] font-[500] hover:brightness-125"
                  >
                    Send
                  </button>

                  <button
                    @click="
                      () => {
                        updateToggle = '';
                      }
                    "
                    class="text-black text-[1.5rem] absolute top-0 right-[1rem]"
                  >
                    x
                  </button>
                </div>
              </div>
            </div>

            <div
              v-if="decoded && decoded.uid"
              :class="{
                'grid grid-cols-1': true,
                block: dataItem.addedBy === uid,
                hidden: dataItem.addedBy !== uid,
              }"
            >
              <button
                @click="() => deleteHandler(dataItem._id)"
                class="group relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-red-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
                <span
                  class="absolute bottom-[1rem] right-[2rem] hidden group-hover:block w-[150px] bg-red-200 text-red-700 text-[0.75rem] font-[700] p-[0.3rem] rounded-[0.75rem]"
                  >Delete chat</span
                >
              </button>
              <button
                @click="() => updateInputPopUp(dataItem._id)"
                class="group relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-green-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span
                  class="absolute bottom-[1rem] text-[0.75rem] font-[700] right-[2rem] hidden group-hover:block w-[150px] bg-green-200 text-green-700 p-[0.3rem] rounded-[0.75rem]"
                  >Update chat</span
                >
              </button>
            </div>
          </div>
        </section>
      </section>
      <section class="absolute bottom-0 left-0 w-[100%] p-[1rem]">
        <div v-if="decoded && decoded.uid">
          <form
            @submit.prevent="submitChatHandler"
            class="w-[100%] flex gap-[1rem]"
          >
            <input
              type="text"
              name="chatMessage"
              id="chatMessage"
              v-model="chatMessage"
              placeholder="type a message ..."
              class="focus:outline-none w-[100%] bg-black px-[1rem] py-[0.5rem] text-[16px] rounded-[1rem]"
            />
            <button
              class="bg-[#a37642] text-[0.875rem] p-[0.5rem] rounded-[0.75rem] font-[500] hover:brightness-125"
            >
              Send
            </button>
          </form>
        </div>
        <div
          v-if="!decoded || !decoded.uid"
          class="flex justify-center items-center"
        >
          <p>please login to send chat..</p>
        </div>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { jwtDecode } from "jwt-decode";
import { onMounted, ref, watch } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import { useStore } from "vuex";

interface JwtPayload {
  email: string;
  uid: string;
  username: string;
}

const store = useStore(); // Access the Vuex store instance

// Map getters to access token from the store
const { getters } = store;

const token = getters.getToken;
const toast = useToast();
// Define chatMessage as a Ref<string>
const chatMessage = ref<string>("");
const updateToggle = ref<string>("");
const updatedChat = ref({});
const data = ref<any[]>([]);
const decoded = ref<JwtPayload | null>(null);

let uid: string | null = null;

let username: string | null = null;

// Function to update decoded value when token changes
function updateDecoded(token: string | null) {
  if (token) {
    decoded.value = jwtDecode(token);
    if (decoded.value) {
      uid = decoded.value.uid; // Assign uid directly here
      username = decoded.value.username;
    }
  } else {
    decoded.value = null;
  }
}

// Watch for changes in token and update decoded token accordingly
watch(() => getters.getToken, updateDecoded);

// Call updateDecoded initially to set the value
updateDecoded(token);

onMounted(async () => {
  try {
    const response = await fetch("http://127.0.0.1:3000/api/chat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    data.value = await response.json();

    // Initialize the updateToggle property for each item in the data array
    data.value.forEach((item) => {
      item.updateToggle = false;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

async function submitChatHandler() {
  const formData = {
    chatMessage: chatMessage.value,
    uid,

    username,
  };

  // If passwords match, proceed with the form data
  const inputData = {
    chat: formData.chatMessage,
    addedBy: formData.uid,
    username: formData.username,
  };

  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(inputData),
    });

    const responseData = await response.json();

    if (response.ok) {
      // Login successful, display message to the user
      // Redirect user to dashboard or perform other actions

      // Add the new chat message to the UI
      data.value.push(responseData.newChat);

      // Clear input field after successful submission
      chatMessage.value = "";

      toast.success(responseData.message);
    } else {
      // Display error toast
      toast.error(responseData.message);
    }
  } catch (error) {
    // Display error toast
    toast.error("Error saving chat");
  }
}

async function deleteHandler(id: string) {
  // Optimistically remove the item from the UI
  const index = data.value.findIndex((item) => item._id === id);
  if (index !== -1) {
    data.value.splice(index, 1);
  }

  try {
    const response = await fetch(`http://localhost:3000/api/chat/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      // Login successful, display message to the user
      // Redirect user to dashboard or perform other actions

      toast.success(responseData.message);
    } else {
      // If deletion fails, revert the UI changes
      if (index !== -1) {
        // Add the deleted item back to the UI
        data.value.splice(index, 0, data.value[index]);
      }

      // Display error toast
      toast.error(responseData.message);
    }
  } catch (error) {
    // Display error toast
    toast.error("Error deleting chat");
  }
}

const updateInputPopUp = (dataItem: any) => {
  const prepopulate = data.value.find((item) => item._id === dataItem);

  updatedChat.value = prepopulate.chat;

  updateToggle.value = dataItem;
};

async function updateHandler(id: string) {
  // If passwords match, proceed with the form data
  const inputData = {
    chat: updatedChat.value,
    addedBy: uid,
  };

  try {
    const response = await fetch(`http://localhost:3000/api/chat/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    });

    const responseData = await response.json();

    if (response.ok) {
      updateToggle.value = "";

      // Find the index of the updated chat message in the data array
      const updatedIndex = data.value.findIndex((item) => item._id === id);

      // Update the chat message in the data array with the updated one
      if (updatedIndex !== -1) {
        data.value.splice(updatedIndex, 1, responseData.updatedChat);
      }

      updatedChat.value = "";

      // Display success toast
      toast.success(responseData.message);
    } else {
      // Display error toast
      toast.error(responseData.message);
    }
  } catch (error) {
    // Display error toast
    toast.error("Error updating chat");
  }
}

// Function to format date and time
function formatDateTime(dateTimeString: string | number | Date) {
  const dateTime = new Date(dateTimeString);

  return dateTime.toLocaleString();
}
</script>

<style></style>
