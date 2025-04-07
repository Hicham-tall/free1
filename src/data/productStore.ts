
import { Product } from '../context/CartContext';
import { products as initialProducts } from './products';
import { 
  openDB, 
  getAllItems, 
  saveItems, 
  getItemsByIndex,
  getItemById
} from '../utils/indexedDBUtils';

// Constants
const PRODUCTS_STORE = 'products';

// Cache data for quicker access
let productsData: Product[] = [];
let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

// Generate a unique ID for new products
const generateUniqueId = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${timestamp}-${random}`;
};

// Initialize products once
const initializeProducts = async (): Promise<void> => {
  if (isInitialized) return;
  
  // If already initializing, return the existing promise
  if (initializationPromise) return initializationPromise;
  
  // Create a new initialization promise
  initializationPromise = (async () => {
    try {
      // Try to load data from IndexedDB
      productsData = await getAllItems<Product>(PRODUCTS_STORE);
      
      // If no products in database, initialize with sample data
      if (productsData.length === 0) {
        productsData = [...initialProducts];
        await saveItems(PRODUCTS_STORE, productsData);
        console.log('Initialized database with sample products');
      }
      
      isInitialized = true;
      console.log(`Initialized with ${productsData.length} products`);
    } catch (error) {
      console.error('Error initializing products:', error);
      productsData = [...initialProducts];
      isInitialized = true; // Set to true so we don't keep retrying
    } finally {
      // Clear the initialization promise
      initializationPromise = null;
    }
  })();
  
  return initializationPromise;
};

// Save products to IndexedDB
const saveProductsToDatabase = async (): Promise<void> => {
  try {
    await saveItems(PRODUCTS_STORE, productsData);
    console.log(`Saved ${productsData.length} products to database`);
    
    // Dispatch a custom event to notify other tabs
    const event = new CustomEvent('productsUpdated', { detail: { timestamp: Date.now() } });
    window.dispatchEvent(event);
  } catch (error) {
    console.error('Failed to save products to database', error);
    throw error;
  }
};

// Public API - now with async functions
export const getProducts = async (): Promise<Product[]> => {
  if (!isInitialized) {
    await initializeProducts();
  }
  return productsData;
};

export const getProductsCached = (): Product[] => {
  // For non-async access when data is already loaded
  return productsData;
};

export const updateProductsData = async (products: Product[]): Promise<void> => {
  productsData = [...products];
  await saveProductsToDatabase();
};

export const addProduct = async (product: Product): Promise<void> => {
  if (!isInitialized) {
    await initializeProducts();
  }
  
  // Ensure product has a unique ID
  if (!product.id) {
    product.id = generateUniqueId();
  }
  
  // Check if product already exists
  const existingIndex = productsData.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    // Update existing product
    productsData[existingIndex] = {...product};
  } else {
    // Add new product
    productsData = [...productsData, product];
  }
  
  await saveProductsToDatabase();
};

export const deleteProduct = async (productId: string): Promise<void> => {
  if (!isInitialized) {
    await initializeProducts();
  }
  productsData = productsData.filter(product => product.id !== productId);
  await saveProductsToDatabase();
};

export const updateProduct = async (updatedProduct: Product): Promise<void> => {
  if (!isInitialized) {
    await initializeProducts();
  }
  
  const index = productsData.findIndex(p => p.id === updatedProduct.id);
  
  if (index >= 0) {
    productsData[index] = {...updatedProduct};
    productsData = [...productsData]; // Create new array reference
    await saveProductsToDatabase();
  }
};

// Product retrieval functions
export const getProductById = async (id: string): Promise<Product | undefined> => {
  if (!isInitialized) {
    await initializeProducts();
  }
  
  try {
    // Try to get directly from IndexedDB for freshest data
    const product = await getItemById<Product>(PRODUCTS_STORE, id);
    return product;
  } catch (error) {
    // Fall back to cache if IndexedDB access fails
    console.error('Error fetching product from DB, using cache:', error);
    return productsData.find(product => product.id === id);
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  if (!isInitialized) {
    await initializeProducts();
  }
  
  try {
    // Use index for better performance
    const products = await getItemsByIndex<Product>(PRODUCTS_STORE, 'category', category);
    return products;
  } catch (error) {
    // Fall back to filtering cache
    console.error('Error fetching products by category, using cache:', error);
    return productsData.filter(product => product.category === category);
  }
};

export const getFeaturedProducts = async (count: number = 3): Promise<Product[]> => {
  if (!isInitialized) {
    await initializeProducts();
  }
  return productsData.slice(-count).reverse();
};

// Initialize database connection
(async () => {
  try {
    await openDB();
    await initializeProducts();
  } catch (error) {
    console.error('Failed to initialize database', error);
  }
})();
