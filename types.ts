
export interface Product {
  id: string;
  name: string;
  category: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastMovement: string;
  supplier: string;
  imageUrl: string;
  // New Inventory Fields
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  location: string;
}

export interface RevenueData {
  name: string;
  value: number;
  color: string;
}

export interface SourceData {
  name: string;
  value: number;
  color: string;
}

export interface Sale {
  id: string;
  dateTime: string;
  product: string;
  category: string;
  quantity: number;
  totalAmount: number;
  channel: 'In-store' | 'Online' | 'Other';
  status: 'Completed' | 'Refunded';
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  categories: string[];
  leadTime: number; // days
  email: string;
  status: 'Active' | 'On Hold';
}

export interface PurchaseOrderItem {
  productName: string;
  quantity: number;
  unitCost: number;
  total: number;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  itemsCount: number;
  totalAmount: number;
  status: 'Pending' | 'Received' | 'Cancelled';
  expectedDelivery: string;
  items: PurchaseOrderItem[];
}
