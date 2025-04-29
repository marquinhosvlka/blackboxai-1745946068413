<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <nav class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-blue-600">Store Management</h1>
      <ul class="flex space-x-6 text-gray-700">
        <li><router-link to="/" class="hover:text-blue-600" exact>Home</router-link></li>
        <li><router-link to="/store" class="hover:text-blue-600">Store</router-link></li>
        <li><router-link to="/products" class="hover:text-blue-600">Products</router-link></li>
        <li><router-link to="/sales" class="hover:text-blue-600">Sales</router-link></li>
        <li><router-link to="/inventory" class="hover:text-blue-600">Inventory</router-link></li>
        <li><router-link to="/reports" class="hover:text-blue-600">Reports</router-link></li>
      </ul>
    </nav>
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
</style>
