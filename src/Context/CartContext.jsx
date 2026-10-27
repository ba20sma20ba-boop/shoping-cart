
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

// 1. Create Context
const CartContext = createContext();

// 2. Create Provider
export const CartProvider = ({ children }) => {

  // 3. Create Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 4. Save Cart in Local Storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 5. Add To Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // 6. Decrease Quantity
  const decreaseQty = (id) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);
    });
  };

  // 7. Remove From Cart
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  // 8. Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // 9. Calculate Total Items
  const totalItems = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  // 10. Calculate Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // 11. Provide Values
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 12. Custom Hook
export const UseCart= () => {
  return useContext(CartContext);
};
