import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";

export default function Homepage() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <Loader />;
  return (
    <>
      <PageNav />

      <section className="homepage mt-40">
        <h1>
          User Management System
          <br />
        </h1>

        <NavLink
          to="/users"
          className="relative inline-flex  mx-4 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Start User Management
          </span>
        </NavLink>
      </section>
    </>
  );
}
