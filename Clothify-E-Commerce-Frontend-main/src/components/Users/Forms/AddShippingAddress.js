import React, { useEffect, useState } from "react";
import { getUserProfileAction, updateUserShippingAddressAction } from "../../../redux/slices/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";


const AddShippingAddress = () => {
  //user profile
  //dispatch
  const dispatch = useDispatch();

  //user profile
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  const { loading, error,profile } = useSelector((state) => state?.users);

  const user = profile?.user;
  // console.log(user?.hasShippingAddress);


  const [formData, setFormData] = useState({
    // firstName: user?.shippingAddress?.firstName,
    firstName:"",
    lastName: "",
    address: "",
    city: "",
    
    region: "",
    postalCode: "",
    phone: "",
    country: "",
  });
  //onchange
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onsubmit
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateUserShippingAddressAction(formData));
  };

  return (
    <>
     {error && <ErrorMsg message={error?.message} />}
      {/* shipping details */}
      {user?.hasShippingAddress ? (
        <div className="mt-6">
          <h1 className="text-4xl font-medium text-gray-900">
            Shipping Details
          </h1>

          <p className="mt-1 text-2xl text-gray-500">
            <b>Double check your information.</b>
          </p>
          <div className="bg-zinc-200	p-10 rounded-lg	">
            <p className="mt-1 text-lg text-black">
              <b>First Name :</b> {user?.shippingAddress?.firstName}
            </p>
            <p className="mt-1 text-lg  text-black">
              <b>Last Name :</b> {user?.shippingAddress?.lastName}
            </p>
            <p className="mt-1 text-lg  text-black">
             <b> Address :</b> {user?.shippingAddress?.address}
            </p>
            <p className="mt-1 text-lg  text-black">
              <b>City/Country :</b> {user?.shippingAddress?.city}
            </p>
            <p className="mt-1 text-lg  text-black">
              <b>Postal Code :</b> {user?.shippingAddress?.postalCode}
            </p>
            {/* <p className="mt-1 text-sm text-gray-500">
              Country : {user?.shippingAddress?.country}
            </p> */}
            <p className="mt-1 text-lg  text-black">
              <b>phone :</b> {user?.shippingAddress?.phone}
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="firstName"
                onChange={onChange}
                value={formData.firstName}
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300  p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="lastName"
                onChange={onChange}
                value={formData.lastName}
                className="block w-full rounded-md border-gray-300  p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="address"
                onChange={onChange}
                value={formData.address}
                autoComplete="street-address"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700">
              City/Country
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="city"
                onChange={onChange}
                value={formData.city}
                autoComplete="address-level2"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <div className="mt-1">
              <select
                id="country"
                name="country"
                autoComplete="country"
                value={formData.country}
                onChange={onChange}
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option value="INDIA">India</option>
                
              </select>
            </div>
          </div> */}

          {/* <div>
            <label
              htmlFor="region"
              className="block text-sm font-medium text-gray-700">
              State / Province
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="region"
                onChange={onChange}
                value={formData.region}
                autoComplete="address-level1"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div> */}

          <div>
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium text-gray-700">
              Postal code
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="postalCode"
                onChange={onChange}
                value={formData.postalCode}
                autoComplete="postal-code"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={onChange}
                value={formData.phone}
                autoComplete="tel"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
              Add Shipping Address
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default AddShippingAddress;
