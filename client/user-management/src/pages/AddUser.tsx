import { useEffect, useState } from "react";
import { User } from "../models/User";
import axios from "axios";
import { baseUrl } from "../api/url.contants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddUser(props) {
  const { userId } = props;

  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  //   const [loading, setLoading] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (userId != null) {
      axios
        .get<User>(`${baseUrl}/${userId}`)
        .then((response) => {
          setUser(response.data);
          if (response.data.image) {
            setImageURL(response.data.image);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [userId]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageURL = URL.createObjectURL(e.target.files[0]);
      setImageURL(imageURL);
      setUser({
        ...user,
        image: imageURL,
      } as User);
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      } as User);
    }
  };

  const handleSaveBtnClick = (e) => {
    e.preventDefault();

    if (
      user?.first_name === "" ||
      user?.last_name === "" ||
      imageURL === "" ||
      user?.email === "" ||
      user?.address === "" ||
      user?.user_name === ""
    ) {
      alert("Please Enter All Values");
      return;
    }

    try {
      if (userId) {
        axios.patch(baseUrl + `/${userId}`, user);
      } else {
        axios.post(baseUrl, user);
      }

      if (userId) {
        alert("Updated user");
      } else {
        alert("Added new  user");
      }

      navigate("/users");
      window.location.reload();

      // setLoading(true);
    } catch (error) {
      // setLoading(true);
      const err = error as { data: string; status: number };
      const { status } = err;
      if (status === 500) {
        toast.error("Try different email address please");
      } else {
        toast.error("An Error occurred. Please contact admins");
      }
    }
  };

  return (
    <div
      id="root"
      className="min-h-screen mt-32 bg-slate-50 dark:bg-navy-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <form className="w-full max-w-lg">
        <div className="space-y-12">
          <div className="">
            <p className="mt-6 text-2xl text-indigo-500 mb-8">
              {userId ? "Update User" : "Add User"}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="user_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="user_name"
                    value={user?.user_name}
                    onChange={changeHandler}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    value={user?.first_name}
                    onChange={changeHandler}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last_name"
                  value={user?.last_name}
                  onChange={changeHandler}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="email"
                  value={user?.email}
                  onChange={changeHandler}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  value={user?.address}
                  onChange={changeHandler}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 h-40">
              <label
                htmlFor="image"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                User Image
              </label>
              <div className="mt-2 w-48 h-56">
                <input type="file" className="mb-4" onChange={changeHandler} />
                <img src={imageURL} alt="uploaded" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            onClick={(e) => handleSaveBtnClick(e)}
            className="rounded-md mb-24 px-8 bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {userId ? "Edit" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
