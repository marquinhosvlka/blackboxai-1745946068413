<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Sales</h2>
    <form @submit.prevent="recordSale" class="mb-6 max-w-lg space-y-4">
      <div>
        <label class="block font-medium mb-1" for="product">Product</label>
        <select v-model="saleForm.productId" id="product" class="w-full border rounded px-3 py-2" required>
          <option value="" disabled>Select a product</option>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="block font-medium mb-1" for="quantity">Quantity</label>
        <input v-model.number="saleForm.quantity" id="quantity" type="number" min="1" class="w-full border rounded px-3 py-2" required />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Record Sale</button>
    </form>

    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 px-4 py-2 text-left">Product</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Quantity</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Price</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Total</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in sales" :key="sale.id" class="hover:bg-gray-100">
          <td class="border border-gray-300 px-4 py-2">{{ getProductName(sale.productId) }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ sale.quantity }}</td>
          <td class="border border-gray-300 px-4 py-2">\${{ sale.price.toFixed(2) }}</td>
          <td class="border border-gray-300 px-4 py-2">\${{ (sale.price * sale.quantity).toFixed(2) }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ new Date(sale.date).toLocaleString() }}</td>
        </tr>
        <tr v-if="sales.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500">No sales recorded.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from '../store';

const store = useStore();

const saleForm = reactive({
  productId: '',
  quantity: 1,
});

function recordSale() {
  const product = store.products.find(p => p.id === saleForm.productId);
  if (!product) {
    alert('Invalid product selected.');
    return;
  }
  if (saleForm.quantity <= 0) {
    alert('Quantity must be greater than zero.');
    return;
  }
  if ((store.inventory[saleForm.productId] || 0) < saleForm.quantity) {
    alert('Insufficient stock for this sale.');
    return;
  }
  const sale = {
    id: Date.now().toString(),
    productId: saleForm.productId,
    quantity: saleForm.quantity,
    price: product.price,
    date: new Date().toISOString(),
  };
  store.recordSale(sale);
  saleForm.productId = '';
  saleForm.quantity = 1;
}

function getProductName(productId) {
  const product = store.products.find(p => p.id === productId);
  return product ? product.name : 'Unknown';
}

const products = store.products;
const sales = store.sales;
</script>
