import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../private/Dashboard";
import Orders from "../private/Orders";
import { useAppDispatch, useAppSelector } from "../store/Hook";
import { getUserCashBack, logoutUser } from "../store/Action";

const Private = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { userToken } = useAppSelector((state) => state.auth);
  const { userCashback } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    dispatch(getUserCashBack());

    if (!userToken) {
      navigate("/");

      dispatch(logoutUser());

      return;
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        toggleModal={toggleModal}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex justify-end pt-3 px-10 bg-gray-100">
          <div
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 
        hover:to-emerald-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl 
        transform hover:-translate-y-0.5 transition-all duration-200 mt-3"
          >
            ₦{userCashback} <span className="text-xs">cashback</span>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Private;
