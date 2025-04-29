<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Store Information</h2>
    <form @submit.prevent="updateStoreInfo" class="space-y-4 max-w-md">
      <div>
        <label class="block font-medium mb-1" for="name">Name</label>
        <input v-model="localStore.name" id="name" type="text" class="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block font-medium mb-1" for="address">Address</label>
        <input v-model="localStore.address" id="address" type="text" class="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block font-medium mb-1" for="phone">Phone</label>
        <input v-model="localStore.phone" id="phone" type="text" class="w-full border rounded px-3 py-2" />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Save</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import { useStore } from '../store';

const store = useStore();

const localStore = reactive({ ...store.storeInfo });

function updateStoreInfo() {
  store.storeInfo.name = localStore.name;
  store.storeInfo.address = localStore.address;
  store.storeInfo.phone = localStore.phone;
  store.saveData();
  alert('Store information updated.');
}
</script>
