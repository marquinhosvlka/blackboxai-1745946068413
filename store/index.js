import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useStore = defineStore('main', () => {
  // Store info
  const storeInfo = ref({
    name: 'My Store',
    address: '123 Main St',
    phone: '123-456-7890',
  });

  // Products
  const products = ref([]);

  // Sales
  const sales = ref([]);

  // Inventory (productId -> quantity)
  const inventory = ref({});

  // Add product
  function addProduct(product) {
    products.value.push(product);
    inventory.value[product.id] = product.stock || 0;
    saveData();
  }

  // Update product
  function updateProduct(updatedProduct) {
    const index = products.value.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products.value[index] = updatedProduct;
      inventory.value[updatedProduct.id] = updatedProduct.stock || 0;
      saveData();
    }
  }

  // Remove product
  function removeProduct(productId) {
    products.value = products.value.filter(p => p.id !== productId);
    delete inventory.value[productId];
    saveData();
  }

  // Record sale
  function recordSale(sale) {
    sales.value.push(sale);
    // Decrease inventory
    if (inventory.value[sale.productId] !== undefined) {
      inventory.value[sale.productId] -= sale.quantity;
      if (inventory.value[sale.productId] < 0) {
        inventory.value[sale.productId] = 0;
      }
    }
    saveData();
  }

  // Computed total sales amount
  const totalSalesAmount = computed(() => {
    return sales.value.reduce((sum, sale) => sum + sale.price * sale.quantity, 0);
  });

  // Save data to localStorage
  function saveData() {
    localStorage.setItem('storeInfo', JSON.stringify(storeInfo.value));
    localStorage.setItem('products', JSON.stringify(products.value));
    localStorage.setItem('sales', JSON.stringify(sales.value));
    localStorage.setItem('inventory', JSON.stringify(inventory.value));
  }

  // Load data from localStorage
  function loadData() {
    const storedStoreInfo = localStorage.getItem('storeInfo');
    if (storedStoreInfo) storeInfo.value = JSON.parse(storedStoreInfo);

    const storedProducts = localStorage.getItem('products');
    if (storedProducts) products.value = JSON.parse(storedProducts);

    const storedSales = localStorage.getItem('sales');
    if (storedSales) sales.value = JSON.parse(storedSales);

    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) inventory.value = JSON.parse(storedInventory);
  }

  loadData();

  return {
    storeInfo,
    products,
    sales,
    inventory,
    addProduct,
    updateProduct,
    removeProduct,
    recordSale,
    totalSalesAmount,
  };
});
