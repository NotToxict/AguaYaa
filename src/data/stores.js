// Mock stores data
export const stores = [
  {
    id: 'tienda-1',
    name: 'AguaYa Express',
    rating: 4.8,
    etaMin: 15,
    deliveryFee: 3000,
    description: 'Agua purificada y productos de primera calidad',
    image: 'https://via.placeholder.com/150x100/0077b6/ffffff?text=AguaYa+Express',
    products: [
      {
        id: 'agua-1',
        storeId: 'tienda-1',
        name: 'Agua Purificada 20L',
        price: 8000,
        description: 'Agua purificada en botellón de 20 litros',
        image: 'https://via.placeholder.com/150x150/0077b6/ffffff?text=Agua+20L',
        category: 'Agua',
        available: true,
        sizes: ['20L']
      },
      {
        id: 'agua-2',
        storeId: 'tienda-1',
        name: 'Agua Purificada 5L',
        price: 3500,
        description: 'Agua purificada en botellón de 5 litros',
        image: 'https://via.placeholder.com/150x150/0077b6/ffffff?text=Agua+5L',
        category: 'Agua',
        available: true,
        sizes: ['5L']
      },
      {
        id: 'hielo-1',
        storeId: 'tienda-1',
        name: 'Hielo en Bolsa 2kg',
        price: 2500,
        description: 'Hielo natural en bolsa de 2 kilogramos',
        image: 'https://via.placeholder.com/150x150/0077b6/ffffff?text=Hielo+2kg',
        category: 'Hielo',
        available: true,
        sizes: ['2kg']
      }
    ]
  },
  {
    id: 'tienda-2',
    name: 'HidroMax',
    rating: 4.5,
    etaMin: 25,
    deliveryFee: 2500,
    description: 'Distribuidora de agua y hielo al por mayor y menor',
    image: 'https://via.placeholder.com/150x100/FF5A00/ffffff?text=HidroMax',
    products: [
      {
        id: 'agua-3',
        storeId: 'tienda-2',
        name: 'Agua Natural 20L',
        price: 7500,
        description: 'Agua natural en botellón de 20 litros',
        image: 'https://via.placeholder.com/150x150/FF5A00/ffffff?text=Agua+Natural',
        category: 'Agua',
        available: true,
        sizes: ['20L']
      },
      {
        id: 'agua-4',
        storeId: 'tienda-2',
        name: 'Pack Agua 600ml x12',
        price: 15000,
        description: 'Pack de 12 botellas de agua de 600ml',
        image: 'https://via.placeholder.com/150x150/FF5A00/ffffff?text=Pack+12',
        category: 'Agua',
        available: true,
        sizes: ['600ml x12']
      }
    ]
  },
  {
    id: 'tienda-3',
    name: 'Aqua Fresh',
    rating: 4.2,
    etaMin: 30,
    deliveryFee: 4000,
    description: 'Agua fresca y productos para el hogar',
    image: 'https://via.placeholder.com/150x100/28a745/ffffff?text=Aqua+Fresh',
    products: [
      {
        id: 'agua-5',
        storeId: 'tienda-3',
        name: 'Agua Ozonizada 20L',
        price: 9000,
        description: 'Agua ozonizada premium en botellón de 20 litros',
        image: 'https://via.placeholder.com/150x150/28a745/ffffff?text=Agua+Premium',
        category: 'Agua',
        available: true,
        sizes: ['20L']
      }
    ]
  }
];

export const getStoreById = (id) => {
  return stores.find(store => store.id === id);
};

export const getProductsByStoreId = (storeId) => {
  const store = getStoreById(storeId);
  return store ? store.products : [];
};

export const getProductById = (productId) => {
  for (const store of stores) {
    const product = store.products.find(p => p.id === productId);
    if (product) return product;
  }
  return null;
};