import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
import { useAppSelector } from "../store/Hook";
import { confirmPayment, getUserCart } from "../store/Action";
import { toast } from "react-toastify";

const PaymentConfirmation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasRun = useRef(false);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const trxref = queryParams.get("trxref");
  const reference = queryParams.get("reference");

  const { loading, error } = useAppSelector((state) => state.payment);

  const confirmOrderPayment = async () => {
    const resultAction = await dispatch(
      confirmPayment({ reference_no: reference as string })
    );
    if (confirmPayment.fulfilled.match(resultAction)) {
      dispatch(getUserCart());
    } else {
      toast.error("Failed to verify payment");
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      confirmOrderPayment();
      hasRun.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-gray-600">Confirming your payment...</p>
          </div>
        )}

        {!loading && error && (
          <div>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-.01-12a9 9 0 100 18 9 9 0 000-18z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-3">
              Payment Failed
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              to="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block"
            >
              Try Again
            </Link>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed and
              will be processed shortly.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-green-600 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.268-.268-1.268-.732 0-.464.543-.732 1.268-.732.725 0 1.268.268 1.268.732"
                  />
                </svg>
                <span className="text-sm font-semibold text-green-700">
                  🎉 Cashback Earned!
                </span>
              </div>
              <p className="text-center text-green-700 font-bold text-lg">
                ₦300 cashback credited to your wallet
              </p>
              <p className="text-center text-green-600 text-sm mt-1">
                Use it on your next purchase!
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Order Number:</span>
                <span className="font-semibold text-gray-800">#{trxref}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Email:</span>
                <span className="text-sm text-gray-800">confirmation sent</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Estimated delivery:
                </span>
                <span className="text-sm text-gray-800">3-5 business days</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/orders"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block"
              >
                Track Your Order
              </Link>
              <Link
                to="/"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
