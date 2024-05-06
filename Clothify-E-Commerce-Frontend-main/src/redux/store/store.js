import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../slices/users/userSlice';
import productReducer from '../slices/products/productSlices';
import categoryReducer from '../slices/categories/categoriesSlice';
import brandsReducer from '../slices/categories/brandsSlice';
import colorsReducer from '../slices/categories/colorsSlice';
import cartReducer from '../slices/cart/cartSlices';
import couponsReducer from '../slices/coupons/couponsSlice';
import ordersReducer from '../slices/orders/ordersSlices';
import reviewsReducer from '../slices/reviews/reviewsSlice';


const store = configureStore({
  reducer:{
    users:userReducer,
    products:productReducer,
    categories:categoryReducer,
    brands:brandsReducer,
    colors:colorsReducer,
    carts:cartReducer,
    coupons: couponsReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,


  },
});


export default store;