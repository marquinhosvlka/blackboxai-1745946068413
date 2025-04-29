<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Inventory</h2>
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 px-4 py-2 text-left">Product</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-100">
          <td class="border border-gray-300 px-4 py-2">{{ product.name }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ inventory[product.id] || 0 }}</td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="2" class="text-center py-4 text-gray-500">No products available.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useStore } from '../store';

const store = useStore();

const products = store.products;
const inventory = store.inventory;
</script>
