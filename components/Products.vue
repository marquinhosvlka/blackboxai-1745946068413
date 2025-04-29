<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Products</h2>
    <form @submit.prevent="addOrUpdateProduct" class="mb-6 max-w-lg space-y-4">
      <div>
        <label class="block font-medium mb-1" for="name">Name</label>
        <input v-model="productForm.name" id="name" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block font-medium mb-1" for="price">Price</label>
        <input v-model.number="productForm.price" id="price" type="number" min="0" step="0.01" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block font-medium mb-1" for="stock">Stock</label>
        <input v-model.number="productForm.stock" id="stock" type="number" min="0" class="w-full border rounded px-3 py-2" required />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        {{ isEditing ? 'Update' : 'Add' }} Product
      </button>
      <button v-if="isEditing" type="button" @click="resetForm" class="ml-2 px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition">
        Cancel
      </button>
    </form>

    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Price</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Stock</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-100">
          <td class="border border-gray-300 px-4 py-2">{{ product.name }}</td>
          <td class="border border-gray-300 px-4 py-2">\${{ product.price.toFixed(2) }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ inventory[product.id] || 0 }}</td>
          <td class="border border-gray-300 px-4 py-2">
            <button @click="editProduct(product)" class="text-blue-600 hover:underline mr-2">Edit</button>
            <button @click="deleteProduct(product.id)" class="text-red-600 hover:underline">Delete</button>
          </td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="4" class="text-center py-4 text-gray-500">No products available.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from '../store';

const store = useStore();

const productForm = reactive({
  id: null,
  name: '',
  price: 0,
  stock: 0,
});

const isEditing = ref(false);

function resetForm() {
  productForm.id = null;
  productForm.name = '';
  productForm.price = 0;
  productForm.stock = 0;
  isEditing.value = false;
}

function addOrUpdateProduct() {
  if (isEditing.value) {
    store.updateProduct({ ...productForm });
  } else {
    const newProduct = {
      id: Date.now().toString(),
      name: productForm.name,
      price: productForm.price,
      stock: productForm.stock,
    };
    store.addProduct(newProduct);
  }
  resetForm();
}

function editProduct(product) {
  productForm.id = product.id;
  productForm.name = product.name;
  productForm.price = product.price;
  productForm.stock = product.stock;
  isEditing.value = true;
}

function deleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    store.removeProduct(productId);
  }
}

const products = store.products;
const inventory = store.inventory;
</script>
