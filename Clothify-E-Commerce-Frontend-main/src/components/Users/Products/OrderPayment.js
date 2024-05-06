import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import AddShippingAddress from "../Forms/AddShippingAddress";
import { getCartItemsFromLocalStorageAction } from "../../../redux/slices/cart/cartSlices";
import { getUserProfileAction } from "../../../redux/slices/users/userSlice";
import { placeOrderAction } from "../../../redux/slices/orders/ordersSlices";


export default function OrderPayment() {
  //get data from location
  const location = useLocation();
  const { sumTotalPrice } = location.state;
  const calculateTotalDiscountedPrice = () => {};
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);
  //get cart items from store
  const { cartItems } = useSelector((state) => state?.carts);

  //user profile
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  const { loading, error, profile } = useSelector((state) => state?.users);
  const user = profile?.user;

  //place order action
  //get shipping address
  const shippingAddress = user?.shippingAddress;

  const placeOrderHandler = () => {
    dispatch(
      placeOrderAction({
        shippingAddress,
        orderItems: cartItems,
        totalPricefinal: sumTotalPrice,
        
      })
    );

    //clear cart
    // localStorage.removeItem("cartItems");
  };
  const { loading: orderLoading, error: orderErr } = useSelector(
    (state) => state?.orders
  );

  return (
    <>
      {orderErr && <ErrorMsg message={orderErr?.message} />}
      <div className="bg-gray-50">
        <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div>
                <div className="mt-10 border-t border-gray-200 pt-10">
                  {/* shipping Address */}
                  <AddShippingAddress />
                </div>
              </div>

              {/* Order summary */}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    {cartItems?.map((product) => (
                      <li key={product._id} className="flex py-6 px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product._id}
                            className="w-20 rounded-md"
                          />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <p className="mt-1 text-sm text-gray-500">
                                {product.name}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.size}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.color}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              Rs {product?.price} X {product?.qty} = Rs {product?.totalPrice}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        Rs 0.00
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-base font-medium">Sub Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        Rs {sumTotalPrice}.00
                      </dd>
                    </div>
                  </dl>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    {orderLoading ? (
                      <LoadingComponent />
                    ) : (
                      <button
                        onClick={placeOrderHandler}
                        className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                        Confirm Payment - Rs {sumTotalPrice}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}




















// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import ErrorMsg from "../../ErrorMsg/ErrorMsg";
// import LoadingComponent from "../../LoadingComp/LoadingComponent";
// import SuccessMsg from "../../SuccessMsg/SuccessMsg";
// import { getUserProfileAction, updateUserShippingAddressAction } from "../../../redux/slices/users/userSlice";
// const AddShippingAddress = () => {
//   //dispatch
//   const dispatch = useDispatch();
//   //user profile
//   useEffect(() => {
//     dispatch(getUserProfileAction());
//   }, [dispatch]);
//   const { loading, error, profile } = useSelector((state) => state?.users);
//   const user = profile?.user;
//   console.log(user?.hasShippingAddress);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     country: "",
//     region: "",
//     postalCode: "",
//     phone: "",
//   });
//   //onchange
//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   //onsubmit
//   const onSubmit = (e) => {
//     console.log(formData);
//     e.preventDefault();
//     dispatch(updateUserShippingAddressAction(formData));
//   };

//   return (
//     <>
//       {error && <ErrorMsg message={error?.message} />}
//       {/* shipping details */}
//       {user?.hasShippingAddress ? (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium text-gray-900">
//             Shipping details
//           </h3>

//           <p className="mt-1 text-sm text-gray-500">
//             Double check your information.
//           </p>
//           <div>
//             <p className="mt-1 text-sm text-gray-500">
//               First Name : {user?.shippingAddress?.firstName}
//             </p>
//             <p className="mt-1 text-sm text-gray-500">
//               Last Name : {user?.shippingAddress?.lastName}
//             </p>
//             <p className="mt-1 text-sm text-gray-500">
//               Address : {user?.shippingAddress?.address}
//             </p>
//             <p className="mt-1 text-sm text-gray-500">
//               City : {user?.shippingAddress?.city}
//             </p>
//             <p className="mt-1 text-sm text-gray-500">
//               Country : {user?.shippingAddress?.country}
//             </p>
//             <p className="mt-1 text-sm text-gray-500">
//               phone : {user?.shippingAddress?.phone}
//             </p>
//           </div>
//         </div>
//       ) : (
//         <form
//           onSubmit={onSubmit}
//           className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//           <div>
//             <label
//               htmlFor="first-name"
//               className="block text-sm font-medium text-gray-700">
//               First name
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="firstName"
//                 onChange={onChange}
//                 value={formData.firstName}
//                 autoComplete="given-name"
//                 className="block w-full rounded-md border-gray-300  p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="last-name"
//               className="block text-sm font-medium text-gray-700">
//               Last name
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="lastName"
//                 onChange={onChange}
//                 value={formData.lastName}
//                 className="block w-full rounded-md border-gray-300  p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-2">
//             <label
//               htmlFor="address"
//               className="block text-sm font-medium text-gray-700">
//               Address
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="address"
//                 onChange={onChange}
//                 value={formData.address}
//                 autoComplete="street-address"
//                 className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="city"
//               className="block text-sm font-medium text-gray-700">
//               City
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="city"
//                 onChange={onChange}
//                 value={formData.city}
//                 autoComplete="address-level2"
//                 className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="country"
//               className="block text-sm font-medium text-gray-700">
//               Country
//             </label>
//             <div className="mt-1">
//               <select
//                 id="country"
//                 name="country"
//                 autoComplete="country"
//                 value={formData.country}
//                 onChange={onChange}
//                 className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
//                 <option value="USA">United States</option>
//                 <option value="CAN">Canada</option>
//                 <option value="MEX">Mexico</option>
//                 <option value="Ghana">Ghana</option>
//                 <option value="Nigeria">Nigeria</option>
//                 <option value="South Africa">South Africa</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="region"
//               className="block text-sm font-medium text-gray-700">
//               State / Province
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="region"
//                 onChange={onChange}
//                 value={formData.region}
//                 autoComplete="address-level1"
//                 className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="postal-code"
//               className="block text-sm font-medium text-gray-700">
//               Postal code
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="postalCode"
//                 onChange={onChange}
//                 value={formData.postalCode}
//                 autoComplete="postal-code"
//                 className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-2">
//             <label
//               htmlFor="phone"
//               className="block text-sm font-medium text-gray-700">
//               Phone
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="phone"
//                 id="phone"
//                 onChange={onChange}
//                 value={formData.phone}
//                 autoComplete="tel"
//                 className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>
//           {loading ? (
//             <LoadingComponent />
//           ) : (
//             <button
//               type="submit"
//               className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
//               Add Shipping Address
//             </button>
//           )}
//         </form>
//       )}
//     </>
//   );
// };

// export default AddShippingAddress;

























// // import { useDispatch, useSelector } from "react-redux";
// // import { getCartItemsFromLocalStorageAction } from "../../../redux/slices/cart/cartSlices";
// // import AddShippingAddress from "../Forms/AddShippingAddress";
// // import { useEffect } from "react";
// // import { useLocation } from "react-router-dom";
// // import { placeOrderAction } from "../../../redux/slices/orders/ordersSlices";
// // import { getUserProfileAction } from "../../../redux/slices/users/userSlice";
// // import LoadingComponent from "../../LoadingComp/LoadingComponent";
// // import ErrorMsg from "../../ErrorMsg/ErrorMsg";
// // import SuccessMsg from "../../SuccessMsg/SuccessMsg";



// // export default function OrderPayment() {
// //   //---get cart items from store---
// //   //get data from location
// //   const location = useLocation();
// //   console.log(location);
// //   const { sumTotalPrice } = location.state;

// //   const calculateTotalDiscountedPrice = () => {};

// //   //dispatch
// //   const dispatch = useDispatch();
// //   useEffect(() => {
// //     dispatch(getCartItemsFromLocalStorageAction());
// //   }, [dispatch]);

// //   //GET DATA FROM STORE
// //   const { cartItems } = useSelector((state) => state?.carts);

// //   //create order submit handler
// //   const createOrderSubmitHandler = (e) => {
// //     e.preventDefault();
// //   };
// //   useEffect(() => {
// //     dispatch(getUserProfileAction());
// //   }, [dispatch]);

// //   const { loading, error, profile } = useSelector((state) => state?.users);
// //   const user = profile?.user;
// //   //place order action
// //   const shippingAddress = user?.shippingAddress;

// //   const placeOrderHandler = () => {
// //     dispatch(
// //       placeOrderAction({
// //         shippingAddress,
// //         orderItems: cartItems,
// //         totalPrice: sumTotalPrice,
// //       })
// //     );
// //     // localStorage.removeItem("cartItems");
// //   };

// //   const { loading: orderLoading, error: orderErr } = useSelector(
// //     (state) => state?.orders
// //   );

// //   return (
// //     <>
// //     {orderErr && <ErrorMsg message={orderErr?.message} />}
// //     <div className="bg-gray-50">
// //       <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
// //         <div className="mx-auto max-w-2xl lg:max-w-none">
// //           <h1 className="sr-only">Checkout</h1>

// //           <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
// //             <div>
// //               <div className="mt-10 border-t border-gray-200 pt-10">
// //                 {/* shipping Address */}
// //                 <AddShippingAddress />
// //               </div>
// //             </div>

// //             {/* Order summary */}
// //             <div className="mt-10 lg:mt-0">
// //               <h2 className="text-lg font-medium text-gray-900">
// //                 Order summary
// //               </h2>

// //               <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
// //                 <h3 className="sr-only">Items in your cart</h3>
// //                 <ul role="list" className="divide-y divide-gray-200">
// //                   {cartItems?.map((product) => (
// //                     <li key={product._id} className="flex py-6 px-4 sm:px-6">
// //                       <div className="flex-shrink-0">
// //                         <img
// //                           src={product.image}
// //                           alt={product.name}
// //                           className="w-20 rounded-md"
// //                         />
// //                       </div>

// //                       <div className="ml-6 flex flex-1 flex-col">
// //                         <div className="flex">
// //                           <div className="min-w-0 flex-1">
// //                             <p className="mt-1 text-sm text-gray-500">
// //                               {product.name}
// //                             </p>
// //                             <p className="mt-1 text-sm text-gray-500">
// //                               {product.size}
// //                             </p>
// //                             <p className="mt-1 text-sm text-gray-500">
// //                               {product.color}
// //                             </p>
// //                           </div>
// //                         </div>

// //                         <div className="flex flex-1 items-end justify-between pt-2">
// //                           <p className="mt-1 text-sm font-medium text-gray-900">
// //                             $ {product?.price} X {product?.qty} =$
// //                             {product?.totalPrice}{" "}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </ul>
// //                 <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
// //                   <div className="flex items-center justify-between">
// //                     <dt className="text-sm">Taxes</dt>
// //                     <dd className="text-sm font-medium text-gray-900">$0.00</dd>
// //                   </div>
// //                   <div className="flex items-center justify-between border-t border-gray-200 pt-6">
// //                     <dt className="text-base font-medium">Sub Total</dt>
// //                     <dd className="text-base font-medium text-gray-900">
// //                       ${sumTotalPrice}.00
// //                     </dd>
// //                   </div>
// //                 </dl>

// //                 <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                
// //                 {orderLoading ? (
// //                       <LoadingComponent />
// //                     ) : (
// //                       <button
// //                         onClick={placeOrderHandler}
// //                         className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
// //                         Confirm Payment - ${sumTotalPrice}
// //                       </button>
// //                     )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //     </>
// //   );
// // }
