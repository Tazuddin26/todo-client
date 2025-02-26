import { useEffect, useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
import { SiTodoist } from "react-icons/si";
import { IoNotifications } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { MdOutlineNightlightRound } from "react-icons/md";

const Navbar = () => {
  const { user, signOutUser } = UseAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handlelogOut = () => {
    signOutUser()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const menuLink = (
    <>
      {/* <Link className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
        Home
      </Link> */}
      {user ? (
        <>
          <button
            onClick={handlelogOut}
            className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
          >
            Login
          </Link>
        </>
      )}
    </>
  );
  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-1">
            <SiTodoist size={32} className="text-cyan-600" />{" "}
            <span className="uppercase text-rose-500 text-xl font-bold font-mono">
              ToDo
            </span>
          </h1>

          {/* <!-- Mobile menu button --> */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {isOpen ? (
                <RxCross1 size={24} className="dark:text-white" />
              ) : (
                <HiOutlineMenuAlt4 size={24} className="dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out dark:bg-gray-800  lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          }`}
        >
          <label className="swap swap-rotate lg:mr-4 mr-4">
            <input
              className="hidden"
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "light" ? false : true}
            />
            <CiLight
              size={20}
              className="swap-on h-6 w-6 fill-current border bg-slate-50 rounded-full border-white"
            />
            <MdOutlineNightlightRound
              size={20}
              className="swap-off transition duration-300 ease-in-out -rotate-45 h-6 w-6 fill-current border bg-slate-200 rounded-full border-stone-950 "
            />
          </label>
          <div className="flex flex-col md:flex-row md:mx-6">{menuLink}</div>

          <div className="flex justify-center md:block">
            <a className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300">
              <IoNotifications size={24} />

              <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
