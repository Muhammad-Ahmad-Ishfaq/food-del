import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState('');
  const [role, setRole] = useState(null);

  const url = "http://localhost:4000";

  // 🛒 Add to Cart
  const addToCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  // 🗑 Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) - 1,
    }));

    const token = localStorage.getItem("token");

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  // 🧹 Clear Cart (used after "Take Bill")
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
    // Optionally also send request to clear cart from DB if needed
  };

  // 💰 Total Price
  const getTotalCartAmount = () => {
    if (!cartItems || typeof cartItems !== 'object') return 0;

    return Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      const product = food_list.find((item) => item._id === itemId);
      return product ? total + product.price * qty : total;
    }, 0);
  };

  // 🍕 Fetch Food List
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response?.data?.food || []);
    } catch (error) {
      console.error("Failed to fetch food list", error);
    }
  };

  // 🛒 Load Cart
  const loadCart = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart", error);
      setCartItems({});
    }
  };

  // 🔐 Fetch User Role
  const fetchUserRole = async (token) => {
    try {
      const response = await axios.get(`${url}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userRole = response.data.role;
      setRole(userRole);
      localStorage.setItem("role", userRole);
    } catch (error) {
      console.error("Failed to fetch user role", error);
      setRole(null);
    }
  };

  // 🧠 On First Load
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCart(savedToken);
        await fetchUserRole(savedToken);
      }
    }
    loadData();
  }, []);

  const ContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart, // ✅ Expose clearCart to use in MyOrders
    getTotalCartAmount,
    url,
    token,
    setToken,
    role,
    setRole,
    loadCart,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
