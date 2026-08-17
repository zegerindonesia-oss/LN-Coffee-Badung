'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, MenuItem, OrderSummary } from '@/types/menu';

type ToastInfo = {
  id: string;
  message: string;
  itemName: string;
  image?: string;
  visible: boolean;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, notes?: string, selectedLevel?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  updateNotes: (cartItemId: string, notes: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewItem: MenuItem | null;
  setQuickViewItem: (item: MenuItem | null) => void;
  toast: ToastInfo | null;
  hideToast: () => void;
  lastOrder: OrderSummary | null;
  setLastOrder: (order: OrderSummary | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ln_fortunate_cart_v1';
const LAST_ORDER_STORAGE_KEY = 'ln_fortunate_last_order';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [toast, setToast] = useState<ToastInfo | null>(null);
  const [lastOrder, setLastOrderState] = useState<OrderSummary | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
      const storedOrder = localStorage.getItem(LAST_ORDER_STORAGE_KEY);
      if (storedOrder) {
        setLastOrderState(JSON.parse(storedOrder));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [cart, isLoaded]);

  const setLastOrder = (order: OrderSummary | null) => {
    setLastOrderState(order);
    if (order) {
      localStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order));
    } else {
      localStorage.removeItem(LAST_ORDER_STORAGE_KEY);
    }
  };

  const showToastNotification = (itemName: string, image?: string) => {
    setToast({
      id: Math.random().toString(),
      message: 'Ditambahkan ke keranjang',
      itemName,
      image,
      visible: true,
    });
  };

  const hideToast = () => {
    setToast(null);
  };

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    notes = '',
    selectedLevel = ''
  ) => {
    const cartItemId = selectedLevel ? `${item.id}-${selectedLevel}` : `${item.id}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((ci) => ci.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const current = updated[existingIndex];
        const newQty = current.quantity + quantity;
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          notes: notes || current.notes,
          subtotal: newQty * item.price,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          menuItem: item,
          quantity,
          notes,
          selectedLevel: selectedLevel || undefined,
          subtotal: quantity * item.price,
        };
        return [...prevCart, newItem];
      }
    });

    showToastNotification(
      item.name + (selectedLevel ? ` (${selectedLevel})` : ''),
      item.image
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            subtotal: newQuantity * item.menuItem.price,
          };
        }
        return item;
      })
    );
  };

  const updateNotes = (cartItemId: string, notes: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, notes };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateNotes,
        clearCart,
        totalItems,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewItem,
        setQuickViewItem,
        toast,
        hideToast,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
