import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodlist] = useState([]);
    const [token, setToken] = useState("");
    const url = "https://backend-food-qi5u.onrender.com";

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    };

    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const itemInfo = food_list.find((product) => product._id === item);
            if (!itemInfo) {
                console.error(`Item with ID ${item} not found in food_list`);
                continue;
            }
            totalAmount += itemInfo.price * cartItems[item];
        }
        console.log('Total Amount:', totalAmount);
        return totalAmount;
    };

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);

    const fetchFoodlist = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodlist(response.data.data);
        } catch (error) {
            console.error("Failed to fetch food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Failed to load cart data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodlist();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (food_list.length > 0) {
            console.log("Food list loaded", food_list);
            console.log("Total cart amount:", getTotalCartAmount());
        }
    }, [food_list, cartItems]);

    return (
        <StoreContext.Provider value={{ food_list, removeFromCart, addToCart, cartItems, getTotalCartAmount, url, token, setToken }}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
