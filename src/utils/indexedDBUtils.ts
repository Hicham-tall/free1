
/**
 * IndexedDB utility functions for storing and retrieving data
 */

const DB_NAME = 'aidaStoreDB';
const DB_VERSION = 1;
const PRODUCTS_STORE = 'products';
// We'll add more stores as needed in the future

// Open the database connection
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      console.error("IndexedDB error:", request.error);
      reject(request.error);
    };
    
    request.onsuccess = (event) => {
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = request.result;
      
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(PRODUCTS_STORE)) {
        const productStore = db.createObjectStore(PRODUCTS_STORE, { keyPath: 'id' });
        // Create indexes for common queries
        productStore.createIndex('category', 'category', { unique: false });
      }
    };
  });
};

// Generic function to get all items from a store
export const getAllItems = async <T>(storeName: string): Promise<T[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
};

// Generic function to add/update items in a store - fixed version
export const saveItems = async <T>(storeName: string, items: T[]): Promise<void> => {
  if (items.length === 0) return Promise.resolve();
  
  const db = await openDB();
  
  // We'll use separate transactions for clearing and adding
  // Clear existing items first
  await clearStore(storeName);
  
  // Now add items in a new transaction
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    
    let completed = 0;
    let errors = 0;
    
    // Set up transaction completion handlers
    transaction.oncomplete = () => {
      console.log(`Successfully saved ${completed} items`);
      resolve();
    };
    
    transaction.onerror = () => {
      reject(new Error(`Transaction failed: ${transaction.error}`));
    };
    
    // Add each item
    items.forEach((item) => {
      try {
        const request = store.add(item);
        
        request.onsuccess = () => {
          completed++;
        };
        
        request.onerror = (event) => {
          console.error("Error adding item:", request.error);
          errors++;
          // Prevent the error from bubbling up and aborting the transaction
          event.preventDefault();
        };
      } catch (error) {
        console.error("Error in add operation:", error);
        errors++;
      }
    });
  });
};

// Clear a store
export const clearStore = async (storeName: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    
    const request = store.clear();
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
};

// Generic function to get items by an index
export const getItemsByIndex = async <T>(
  storeName: string, 
  indexName: string, 
  value: any
): Promise<T[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    const request = index.getAll(value);
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
};

// Get a single item by its key
export const getItemById = async <T>(
  storeName: string, 
  id: string
): Promise<T | undefined> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(id);
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
};
