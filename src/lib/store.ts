import fs from "fs";
import path from "path";
import { Product, Category, HeroBanner, SiteSettings, Order, ProductReview } from "@/types";
import { initialCategories, initialProducts, initialBanners, initialSiteSettings } from "./initialData";

interface StoreData {
  categories: Category[];
  products: Product[];
  banners: HeroBanner[];
  settings: SiteSettings;
  orders: Order[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

function ensureDataFile(): StoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      const defaultData: StoreData = {
        categories: initialCategories,
        products: initialProducts,
        banners: initialBanners,
        settings: initialSiteSettings,
        orders: [
          {
            id: "ord-1001",
            orderNumber: "ULI-2025-1001",
            customerName: "Олена Ковальська",
            customerPhone: "+38 (098) 111-22-33",
            customerEmail: "olena.k@example.com",
            deliveryMethod: "nova_poshta",
            deliveryAddress: "Київ, відділення Нової Пошти №142",
            paymentMethod: "card_online",
            totalAmount: 780,
            status: "PAID",
            notes: "Прошу упакувати надійно з пухирчастою плівкою",
            items: [
              {
                id: "item-1",
                orderId: "ord-1001",
                productId: "prod-1",
                variantId: "v-1-1",
                title: "Камуфлююча база Cover Base «Royal Nude»",
                variantName: "15 мл",
                price: 290,
                quantity: 1,
              },
              {
                id: "item-2",
                orderId: "ord-1001",
                productId: "prod-2",
                variantId: "v-2-2",
                title: "Глянцевий топ Crystal Diamond No Wipe",
                variantName: "30 мл",
                price: 490,
                quantity: 1,
              },
            ],
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          },
        ],
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading store data, using defaults:", e);
    return {
      categories: initialCategories,
      products: initialProducts,
      banners: initialBanners,
      settings: initialSiteSettings,
      orders: [],
    };
  }
}

function saveStoreData(data: StoreData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing store data:", e);
  }
}

export const store = {
  // Categories
  getCategories(): Category[] {
    const data = ensureDataFile();
    return data.categories.map((cat) => {
      const count = data.products.filter((p) => p.categoryId === cat.id && p.isActive !== false).length;
      return { ...cat, productCount: count };
    });
  },

  getCategoryBySlug(slug: string): Category | undefined {
    return this.getCategories().find((c) => c.slug === slug);
  },

  saveCategory(cat: Category): Category {
    const data = ensureDataFile();
    const idx = data.categories.findIndex((c) => c.id === cat.id);
    if (idx >= 0) {
      data.categories[idx] = cat;
    } else {
      data.categories.push(cat);
    }
    saveStoreData(data);
    return cat;
  },

  deleteCategory(id: string): boolean {
    const data = ensureDataFile();
    data.categories = data.categories.filter((c) => c.id !== id);
    saveStoreData(data);
    return true;
  },

  // Products
  getProducts(): Product[] {
    const data = ensureDataFile();
    return data.products;
  },

  getProductBySlug(slug: string): Product | undefined {
    const data = ensureDataFile();
    return data.products.find((p) => p.slug === slug);
  },

  getProductById(id: string): Product | undefined {
    const data = ensureDataFile();
    return data.products.find((p) => p.id === id);
  },

  saveProduct(prod: Product): Product {
    const data = ensureDataFile();
    const idx = data.products.findIndex((p) => p.id === prod.id);
    if (idx >= 0) {
      data.products[idx] = prod;
    } else {
      data.products.push(prod);
    }
    saveStoreData(data);
    return prod;
  },

  deleteProduct(id: string): boolean {
    const data = ensureDataFile();
    data.products = data.products.filter((p) => p.id !== id);
    saveStoreData(data);
    return true;
  },

  // Reviews
  addReview(productId: string, review: Omit<ProductReview, "id" | "isApproved" | "createdAt">): ProductReview {
    const data = ensureDataFile();
    const prod = data.products.find((p) => p.id === productId);
    const newRev: ProductReview = {
      ...review,
      id: `rev-${Date.now()}`,
      productId,
      isApproved: false,
      createdAt: new Date().toISOString(),
    };
    if (prod) {
      if (!prod.reviews) prod.reviews = [];
      prod.reviews.unshift(newRev);
      saveStoreData(data);
    }
    return newRev;
  },

  getAllReviews(): (ProductReview & { productTitleUa: string })[] {
    const data = ensureDataFile();
    const all: (ProductReview & { productTitleUa: string })[] = [];
    data.products.forEach((p) => {
      (p.reviews || []).forEach((r) => {
        all.push({ ...r, productTitleUa: p.titleUa });
      });
    });
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  approveReview(id: string): boolean {
    const data = ensureDataFile();
    for (const prod of data.products) {
      const rev = (prod.reviews || []).find((r) => r.id === id);
      if (rev) {
        rev.isApproved = true;
        saveStoreData(data);
        return true;
      }
    }
    return false;
  },

  deleteReview(id: string): boolean {
    const data = ensureDataFile();
    for (const prod of data.products) {
      if (prod.reviews) {
        prod.reviews = prod.reviews.filter((r) => r.id !== id);
      }
    }
    saveStoreData(data);
    return true;
  },

  // Orders
  getOrders(): Order[] {
    const data = ensureDataFile();
    return data.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  createOrder(orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "status">): Order {
    const data = ensureDataFile();
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `ULI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };
    data.orders.unshift(newOrder);
    saveStoreData(data);
    return newOrder;
  },

  updateOrderStatus(orderId: string, status: Order["status"]): Order | null {
    const data = ensureDataFile();
    const order = data.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      saveStoreData(data);
      return order;
    }
    return null;
  },

  // Banners
  getBanners(): HeroBanner[] {
    const data = ensureDataFile();
    return data.banners;
  },

  saveBanner(banner: HeroBanner): HeroBanner {
    const data = ensureDataFile();
    const idx = data.banners.findIndex((b) => b.id === banner.id);
    if (idx >= 0) {
      data.banners[idx] = banner;
    } else {
      data.banners.push(banner);
    }
    saveStoreData(data);
    return banner;
  },

  deleteBanner(id: string): boolean {
    const data = ensureDataFile();
    data.banners = data.banners.filter((b) => b.id !== id);
    saveStoreData(data);
    return true;
  },

  // Settings
  getSettings(): SiteSettings {
    const data = ensureDataFile();
    return data.settings;
  },

  updateSettings(settings: SiteSettings): SiteSettings {
    const data = ensureDataFile();
    data.settings = settings;
    saveStoreData(data);
    return settings;
  },
};
