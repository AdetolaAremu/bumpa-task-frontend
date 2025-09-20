import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/Hook";
import { logoutUser } from "../store/Action";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  toggleModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const callLogout = async () => {
    await dispatch(logoutUser());

    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSidebar]);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 p-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {!isOpen && (
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out bg-[#216a09] w-64 p-4 z-40`}
      >
        <h2 className="text-white text-2xl font-semibold my-9">
          <NavLink to="/">Bumpa</NavLink>
        </h2>
        <ul>
          <li className="text-gray-300 rounded-md">
            <NavLink
              to="/user/home"
              className={({ isActive }) =>
                `block p-2 rounded-md ${
                  isActive
                    ? "bg-white text-green-600"
                    : "hover:bg-white hover:text-green-600"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="text-gray-300 rounded-md pt-2">
            <NavLink
              to="/user/orders"
              className={({ isActive }) =>
                `block p-2 rounded-md ${
                  isActive
                    ? "bg-white text-green-600"
                    : "hover:bg-white hover:text-green-600"
                }`
              }
            >
              Orders
            </NavLink>
          </li>
          <li
            className="text-gray-300 rounded-md pt-2 cursor-pointer"
            onClick={() => callLogout()}
          >
            <div className="hover:bg-white hover:text-green-600 p-2">
              Logout
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
