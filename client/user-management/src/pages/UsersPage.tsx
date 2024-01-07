import { useEffect, useState } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import { User } from "../models/User";
// import Loader from "../components/Loader";
import { baseUrl } from "../api/url.contants";
import dayjs from "dayjs";
import PageNav from "../components/PageNav";
import AddUser from "./AddUser";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [modal, setModal] = useState(false);

  const [id, setId] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleModal = (id: number | null) => {
    setModal(!modal);
    setId(id);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<User[]>(baseUrl);
        setUsers(response.data);
        setIsLoaded(true);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (shouldDelete) {
        axios.delete<User[]>(baseUrl + `/${id}`);
      }
      navigate("/users");
      window.location.reload();
      // baseUrl + "Product/" + id

      setIsLoaded(true);

      alert("Deleted user");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  if (!isLoaded) return <Loader />;

  return (
    <>
      <PageNav />

      {modal && (
        <div className="modal">
          <div onClick={() => toggleModal(null)} className="overlay"></div>
          <div className="modal-content">
            {id ? <AddUser userId={id} /> : <AddUser />}
            <button className="close-modal" onClick={() => toggleModal(null)}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      <main className=" bg-slate-100 py-20 px-12  w-full h-100vh ">
        <div className="flex justify-between">
          <p className=" text-2xl text-indigo-500 mb-8">User Management</p>
          <button
            onClick={() => toggleModal(null)}
            className="relative px-10 py-1 font-medium h-10 text-white transition duration-300 bg-green-400 rounded-md hover:bg-green-500 ease"
          >
            <span className="absolute bottom-0 left-0 h-full -ml-2">
              <svg
                viewBox="0 0 487 487"
                className="w-auto h-full opacity-100 object-stretch"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                  fill="#FFF"
                  fill-rule="nonzero"
                  fill-opacity=".1"
                ></path>
              </svg>
            </span>
            <span className="absolute top-0 right-0 w-12 h-full -mr-3">
              <svg
                viewBox="0 0 487 487"
                className="object-cover w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                  fill="#FFF"
                  fill-rule="nonzero"
                  fill-opacity=".1"
                ></path>
              </svg>
            </span>
            <span className="relative">New User</span>
          </button>
        </div>
        <div className="mb-12 flex cursor-pointer flex-row border-b border-zinc-400 p-2.5 font-semibold text-slate-700 hover:bg-slate-100 dark:border-navy-500 dark:text-navy-100 dark:hover:bg-navy-600 sm:flex-row sm:items-left">
          <div className="flex items-left justify-between">
            <div className="flex space-x-2 sm:w-48">
              <div className="flex items-left  space-x-2">
                <div className="avatar h-6 w-6 pl-12 font-bold text-black">
                  Username
                </div>
              </div>
            </div>
            <div className=" px-1 font-bold text-black text-md ">Name</div>
          </div>
          <div className="mr-16 ml-28 items-left font-bold text-black justify-between ">
            Image
          </div>
          <div className="px-2 font-bold text-black mx-8 sm:flex ">Email</div>
          <div className="px-2 font-bold text-black mr-8 ml-16 sm:flex">
            Address
          </div>
          <div className="px-2 font-bold text-black mx-6 sm:flex">
            Created Date
          </div>
          <div className="px-2 font-bold text-black mx-6 sm:flex">
            Updated Date
          </div>
          <div className="px-2 font-bold  text-indigo-600 mx-8 sm:flex">
            Update
          </div>
          <div className="px-2 font-bold text-rose-600 mx-8 sm:flex">
            Delete
          </div>
        </div>
        <div className="card ">
          {users.map((item) => (
            <div
              key={item.email}
              className="flex h-16 cursor-pointer flex-row border-b p-2.5 font-semibold text-slate-700 hover:bg-slate-100 dark:border-navy-500 dark:text-navy-100 dark:hover:bg-navy-600 sm:flex-row sm:items-left"
            >
              <div className="flex items-left justify-between">
                <div className="flex  space-x-2 sm:w-48">
                  <div className="flex items-left ">
                    <div className="avatar h-6 w-6 pl-12 text-indigo-700">
                      {item.user_name}
                    </div>
                  </div>
                </div>
                <div className="w-16 px-1 text-sm ">
                  {item.first_name} {item.last_name}
                </div>
              </div>
              <div className="  items-left justify-between space-x-2">
                <img
                  className="rounded-full ml-24 w-10 h-12 "
                  src={item.image}
                  alt="avatar"
                />
              </div>
              <div className=" mx-16 text-xs w-16 ">{item.email}</div>
              <div className="  ml-16 mr-8 text-xs w-20">{item.address}</div>
              <div className=" mx-8 text-xs w-24">
                {dayjs(item.created_date).format("MM/DD/YYYY HH:mm:ss A")}
              </div>
              <div className=" mx-8 text-xs w-24">
                {dayjs(item.updated_date).format("MM/DD/YYYY HH:mm:ss A")}
              </div>
              <div className=" mx-8 w-24">
                <button
                  onClick={() => toggleModal(item.id)}
                  className={`relative ${
                    modal
                      ? "-z-10"
                      : "rounded relative inline-flex group  items-center justify-center px-3.5 py-2 cursor-pointer border-b-4 border-l-2 active:border-indigo-600 active:shadow-none shadow-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 border-indigo-700 text-white"
                  }`}
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Edit</span>
                </button>
              </div>
              <div className=" mx-2  w-24">
                <button
                  onClick={() => handleDelete(item.id)}
                  className={`relative ${
                    modal
                      ? "-z-10"
                      : "rounded relative inline-flex group  items-center justify-center px-3.5 py-2 cursor-pointer border-b-4 border-l-2 active:border-red-500 active:shadow-none shadow-lg bg-gradient-to-tr from-red-500 to-red-400 border-red-500 text-white"
                  }`}
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Delete</span>
                </button>
              </div>
              {/* <Modal /> */}

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
    </>
  );
}
