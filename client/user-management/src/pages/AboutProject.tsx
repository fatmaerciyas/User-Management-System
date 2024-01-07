import PageNav from "../components/PageNav";

export default function AboutProject() {
  return (
    <>
      <PageNav />
      <section className=" text-black  text-center table w-full h-screen lg:py-8 bg-slate-100 ">
        <div className="container ml-24 top-56 left-1/3">
          <div className="grid grid-cols-1 mt-14">
            <h3 className="text-3xl leading-normal text-black font-semibold">
              About Project
            </h3>
          </div>

          <div className="relative mt-3 ">
            <ul className="tracking-[0.5px] mb-0 inline-block">
              <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out  text-black hover:text-indigo-600">
                User Management System :)
              </li>
              <li className="inline-block text-base text-slate-950 dark:text-black mx-0.5 ltr:rotate-0 rtl:rotate-180">
                <i className="uil uil-angle-right-b"></i>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mt-20 ml-24 border p-20">
          <p className="text-center text-xl">
            Fill Labs Software Development Test Question-4 Technologies i Use
          </p>

          <div className=" flex justify-around mt-16">
            <div className="flex flex-col">
              <p className="text-2xl font-bold mb-3">Backend</p>
              <p className="text-md ">
                <span className="text-rose-600 mr-3">*</span>Go
              </p>
              <p className="text-md ">
                <span className="text-rose-600 mr-3">*</span>Models
              </p>
              <p className="text-md ">
                <span className="text-rose-600 mr-3">*</span>Sqlite
              </p>
              <p className="text-md ">
                <span className="text-rose-600 mr-3">*</span>Gin library
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-bold mb-3">Frontend</p>
              <p className="text-md ">
                <span className="text-rose-600 mr-3">*</span>React.js v-18
              </p>
              <p className="text-md ">
                <span className="text-rose-600 mr-3">*</span>Tailwind Css
              </p>
              <p className="text-md ">
                <span className="text-rose-600 mr-3">*</span>Proxy
              </p>
              <p className="text-md ">
                <span className="text-rose-600 mr-3">*</span>Html
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
