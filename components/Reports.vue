<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Reports</h2>
    <div class="mb-6 max-w-lg space-y-4">
      <div>
        <h3 class="text-xl font-semibold mb-2">Total Sales Amount</h3>
        <p class="text-lg">\${{ totalSalesAmount.toFixed(2) }}</p>
      </div>
      <div>
        <h3 class="text-xl font-semibold mb-2">Products Sold</h3>
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-4 py-2 text-left">Product</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Quantity Sold</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(quantity, productId) in productsSold" :key="productId" class="hover:bg-gray-100">
              <td class="border border-gray-300 px-4 py-2">{{ getProductName(productId) }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ quantity }}</td>
            </tr>
            <tr v-if="Object.keys(productsSold).length === 0">
              <td colspan="2" class="text-center py-4 text-gray-500">No sales data available.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '../store';

const store = useStore();

const totalSalesAmount = store.totalSalesAmount;

const productsSold = computed(() => {
  const sold = {};
  store.sales.forEach(sale => {
    if (!sold[sale.productId]) {
      sold[sale.productId] = 0;
    }
    sold[sale.productId] += sale.quantity;
  });
  return sold;
});

function getProductName(productId) {
  const product = store.products.find(p => p.id === productId);
  return product ? product.name : 'Unknown';
}
</script>
