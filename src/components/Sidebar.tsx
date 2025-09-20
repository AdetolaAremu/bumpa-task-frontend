import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  toggleModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  toggleModal,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

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
          {/* {!isOpen && <Hamburger />} */}
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
            onClick={toggleModal}
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
