import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandsAction } from "../../../redux/slices/categories/brandsSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { Link } from "react-router-dom";





const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];
export default function BrandsList() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);
  const {
    brands: { brands },
    loading,
    error,
  } = useSelector((state) => state?.brands);

  //delete category handler
  const deleteCategoryHandler = (id) => {};
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            All Brands Categories [{brands?.length}]
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/admin/add-category"
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Add New Category
          </Link>
        </div>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorMsg message={error?.message} />
      ) : brands?.length <= 0 ? (
        <NoDataFound />
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {brands?.map((brand) => (
                      <tr key={brand?._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {brand?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(brand?.createdAt).toLocaleDateString()}
                        </td>
                        {/* edit icon */}
                        {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                          <Link
                            to={`/admin/edit-category/${category?._id}`}
                            state={{
                              categoryName: category?.name,
                            }}
                            className="text-indigo-600 hover:text-indigo-900">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>

                            <span className="sr-only">, {category?.name}</span>
                          </Link>
                        </td> */}
                        {/* delete icon */}
                        {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => deleteCategoryHandler(category?._id)}
                            className="text-indigo-600 hover:text-indigo-900">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// export default function BrandsList() {

//     //dispatch
//     const dispatch = useDispatch();
//     useEffect(() => {
//       dispatch(fetchBrandsAction());
//     }, [dispatch]);
//     const {
//       brands: { brands },
//       loading,
//       error,
//     } = useSelector((state) => state?.brands);

//     const deleteCategoryHandler = (id) => {};



//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="sm:flex sm:items-center"></div>

//       <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
//         Recent Oders
//       </h3>
//       <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
//                 Order ID
//               </th>
//               <th
//                 scope="col"
//                 className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
//                 Payment Method
//               </th>
//               <th
//                 scope="col"
//                 className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
//                 Oder Date
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Delivery Date
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Status
//               </th>

//               <th
//                 scope="col"
//                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Total
//               </th>
//               {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
//                 <span className="sr-only">Edit</span>
//               </th> */}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {people.map((person) => (
//               <tr key={person.email}>
//                 <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
//                   {person.name}
//                   <dl className="font-normal lg:hidden">
//                     <dt className="sr-only">Title</dt>
//                     <dd className="mt-1 truncate text-gray-700">
//                       {person.title}
//                     </dd>
//                     <dt className="sr-only sm:hidden">Email</dt>
//                     <dd className="mt-1 truncate text-gray-500 sm:hidden">
//                       {person.email}
//                     </dd>
//                   </dl>
//                 </td>
//                 <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
//                   {person.title}
//                 </td>
//                 <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
//                   {person.email}
//                 </td>
//                 <td className="px-3 py-4 text-sm text-gray-500">
//                   {person.role}
//                 </td>
//                 <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
//                   <a href="#" className="text-indigo-600 hover:text-indigo-900">
//                     Edit<span className="sr-only">, {person.name}</span>
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
