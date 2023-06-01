import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
import { userReducer } from "./slices/usersSlice";
import { sellerReducer } from "./slices/sellersSlice";
import { orderReducer } from "./slices/ordersSlice";
import { cartReducer } from "./slices/cartSlice";
import { eventReducer } from "./slices/eventSlice";
import wishlistSlice from "./slices/wishlistSlice";


const store = configureStore({
  reducer: {
    order: orderReducer,
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    cart: cartReducer,
    events:eventReducer,
    wishlist:wishlistSlice
  },
});

export default store;
