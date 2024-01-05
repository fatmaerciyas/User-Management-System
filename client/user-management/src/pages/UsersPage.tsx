import { useEffect, useState } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import { User } from "../models/User";
// import Loader from "../components/Loader";
import { baseUrl } from "../api/url.contants";
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<User[]>(baseUrl);
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [users]);
  // const handleDelete = async (id) => {
  //   try {
  //     const productsResponse = await axios.delete<Product[]>(
  //       baseUrl + "Product/" + id
  //     );

  //     // baseUrl + "Product/" + id
  //     console.log(productsResponse.data);

  //     setIsLoaded(true);

  //     toast.success("Deleted product");
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // };
  // if (!isLoaded) return <Loader />;

  return (
    <>
      <div
        id="root"
        className="min-h-100vh flex md:px-12 lg:px-24  bg-slate-50 dark:bg-navy-900"
      >
        <main className=" mt-20  w-full  px-[var(--margin-x)] pb-6">
          <div className="flex justify-between">
            <p className=" text-2xl text-indigo-500 mb-8">User Management</p>
            <button>New User</button>
          </div>
          <div className="mb-12 flex cursor-pointer flex-row border-b border-zinc-400 p-2.5 font-semibold text-slate-700 hover:bg-slate-100 dark:border-navy-500 dark:text-navy-100 dark:hover:bg-navy-600 sm:flex-row sm:items-left">
            <div className="flex items-left justify-between">
              <div className="flex space-x-2 sm:w-72">
                <div className="flex items-left  space-x-2">
                  <div className="avatar h-6 w-6 pl-12 font-bold text-black">
                    Name
                  </div>
                </div>
              </div>
              <div className="shrink-0 px-1 font-bold text-black text-md ">
                Brand
              </div>
            </div>
            <div className="flex flex-1 items-left font-bold text-black justify-between space-x-2">
              Image
            </div>
            <div className="shrink-0 px-1 mr-8 font-bold text-black ">
              Stock
            </div>
            <div className="hidden px-2font-bold text-black mx-20 sm:flex">
              Price
            </div>
          </div>
          <div className="card ">
            {users.map((item) => (
              <div
                key={item.email}
                className="flex h-16 cursor-pointer flex-row border-b p-2.5 font-semibold text-slate-700 hover:bg-slate-100 dark:border-navy-500 dark:text-navy-100 dark:hover:bg-navy-600 sm:flex-row sm:items-left"
              >
                <div className="flex items-left justify-between">
                  <div className="flex  space-x-2 sm:w-72">
                    <div className="flex items-left  space-x-2">
                      <div className="avatar h-6 w-6 pl-12 text-indigo-700">
                        {item.email}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 px-1 text-md ">
                    {item.first_name}
                  </div>
                </div>
                <div className="flex flex-1 items-left justify-between space-x-2">
                  <img
                    className="rounded-full ml-24 w-10 h-12 "
                    src={item.last_name}
                    alt="avatar"
                  />
                </div>
                <div className="shrink-0 px-1 mr-8 text-xs ">
                  {item.last_name}
                </div>
                {/* <div className="hidden px-2 text-xs+ mx-20 sm:flex">
                  {item.price}
                </div>
                <div className="mr-6">
                  <NavLink to={`/dashboard/order/${item.productId}`}>
                    <Button label="Details" type="button" variant="primary" />
                  </NavLink>
                </div>
                <Button
                  label="Delete"
                  onClick={() => handleDelete(item.productId)}
                  type="button"
                  variant="delete"
                /> */}
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
