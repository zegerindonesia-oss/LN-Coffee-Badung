export type MainCategory = 'All Menu' | 'Beverage' | 'Food' | 'Snack' | 'Dessert' | 'Ice Cream';

export type SubCategory =
  | 'All'
  | 'Coffee'
  | 'Non Coffee'
  | 'Signature Beverage'
  | 'Main Course'
  | 'Signature Food'
  | 'Snack & Appetizer'
  | 'Dessert & Bakery'
  | 'Ice Cream & Gelato';

export type MenuItem = {
  id: number;
  slug: string;
  name: string;
  mainCategory: string; // 'Beverage' | 'Food' | 'Snack' | 'Dessert' | 'Ice Cream'
  subCategory: string;
  labels: string[];
  ingredients: string;
  price: number;
  size: string;
  image: string;
  spicyLevelAvailable?: boolean;
};

export type CartItem = {
  id: string; // unique item cart key (e.g. `${menuItem.id}-${level || ''}`)
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  selectedLevel?: string; // For Mie Goli Lv. 1-3
  subtotal: number;
};

export type OrderType = 'Dine In' | 'Take Away' | 'Delivery' | 'Pesanan Terjadwal';

export type CheckoutFormData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress?: string;
  tableNumber?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  orderTime: string;
  generalNotes?: string;
  agreedToTerms: boolean;
};

export type OrderSummary = {
  orderRef: string;
  orderDate: string;
  customerInfo: CheckoutFormData;
  items: CartItem[];
  totalAmount: number;
};
