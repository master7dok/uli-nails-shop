export type Locale = "ua" | "pl";

export interface ProductVariant {
  id: string;
  productId: string;
  nameUa: string;
  namePl: string;
  sku: string;
  price: number;
  oldPrice?: number | null;
  stock: number;
  colorCode?: string | null;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId?: string | null;
  authorName: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  titleUa: string;
  titlePl: string;
  descriptionUa: string;
  descriptionPl: string;
  usageUa?: string;
  usagePl?: string;
  ingredients?: string;
  images: string[];
  isHit?: boolean;
  isNew?: boolean;
  isSeason?: boolean;
  isActive?: boolean;
  categoryId: string;
  subCategoryId?: string | null;
  variants: ProductVariant[];
  reviews?: ProductReview[];
}

export interface SubCategory {
  id: string;
  slug: string;
  nameUa: string;
  namePl: string;
  categoryId: string;
  sortOrder?: number;
}

export interface Category {
  id: string;
  slug: string;
  nameUa: string;
  namePl: string;
  descriptionUa?: string;
  descriptionPl?: string;
  image?: string;
  sortOrder?: number;
  subCategories: SubCategory[];
  productCount?: number;
}

export interface CartItem {
  id: string; // unique item id (e.g. productId_variantId)
  productId: string;
  variantId?: string;
  title: string;
  variantName?: string;
  image: string;
  price: number;
  oldPrice?: number | null;
  quantity: number;
  sku: string;
  maxStock: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  title: string;
  variantName?: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryMethod: "nova_poshta" | "inpost" | "courier";
  deliveryAddress: string;
  paymentMethod: "card_online" | "invoice" | "cod";
  totalAmount: number;
  status: "NEW" | "PAID" | "SHIPPED" | "COMPLETED" | "CANCELLED";
  notes?: string;
  items: OrderItem[];
  createdAt: string;
}

export interface HeroBanner {
  id: string;
  titleUa: string;
  titlePl: string;
  subUa?: string;
  subPl?: string;
  buttonUa?: string;
  buttonPl?: string;
  link: string;
  imageUrl: string;
  isActive: boolean;
}

export interface SiteSettings {
  phone: string;
  email: string;
  workingHoursUa: string;
  workingHoursPl: string;
  addressUa: string;
  addressPl: string;
  instagramUrl: string;
  telegramUrl: string;
  viberUrl: string;
  freeShippingThreshold: number;
}
