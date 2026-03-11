export interface MenuItem {
  id: number;
  name: string;
  category: 'Rice' | 'Grilled' | 'Snacks' | 'Drinks';
  price: number;
  description: string;
  image: string;
  isSpecial?: boolean;
  discount?: number;
  rating: number;
  prepTime: string;
  isPopular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  studentName: string;
  studentId: string;
  items: CartItem[];
  pickupTime: string;
  notes?: string;
  total: number;
  status: 'received' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'completed';
