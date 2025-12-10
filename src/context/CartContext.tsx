import { createContext, useContext, useEffect, useState } from "react";

/* ================= TYPES ================= */
export interface CartItem {
  id: number | string;
  subtitle?: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

/* Product data without quantity (used for addToCart) */
type AddToCartItem = Omit<CartItem, "quantity">;

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: AddToCartItem) => void;
  removeFromCart: (id: number | string) => void;
  increaseQty: (id: number | string) => void;
  decreaseQty: (id: number | string) => void;
  clearCart: () => void;
  totalItems: number;
}

/* ================= CONTEXT ================= */
const CartContext = createContext<CartContextType | null>(null);

/* ================= PROVIDER ================= */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  /* Load cart from localStorage */
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  /* Save cart to localStorage */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= ACTIONS ================= */

  /* Add to cart */
  const addToCart = (product: AddToCartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /* Increase quantity */
  const increaseQty = (id: number | string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /* Decrease quantity (minimum 1) */
  const decreaseQty = (id: number | string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  /* Remove item */
  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /* Clear cart */
  const clearCart = () => {
    setCart([]);
  };

  /* Total item count */
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
