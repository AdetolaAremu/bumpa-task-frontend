import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
import { useAppSelector } from "../store/Hook";
import {
  addToCart,
  clearUserCart,
  getUserCart,
  proceedToPayment,
  removeFromCart,
} from "../store/Action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, cart, getUrl } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  const subtotal = cart?.items.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const handleRemoveFromCart = async (product_id: number) => {
    const resultAction = await dispatch(removeFromCart({ product_id }));
    if (removeFromCart.fulfilled.match(resultAction)) {
      toast.success("Removed from cart!");
      dispatch(getUserCart());
    } else {
      toast.error("Failed to remove from cart");
    }
  };

  const handleAddToCart = async (product_id: number, quantity: number) => {
    const resultAction = await dispatch(addToCart({ product_id, quantity }));
    if (addToCart.fulfilled.match(resultAction)) {
      toast.success("Cart updated successfully");
      // Refresh cart data to update UI immediately
      dispatch(getUserCart());
    } else {
      toast.error("Failed to add to cart");
    }
  };

  const handleIncreaseQuantity = (
    product_id: number,
    currentQuantity: number
  ) => {
    handleAddToCart(product_id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (
    product_id: number,
    currentQuantity: number
  ) => {
    if (currentQuantity > 1) {
      handleAddToCart(product_id, currentQuantity - 1);
    }
  };

  const clearEntireCart = async () => {
    const resultAction = await dispatch(clearUserCart());

    if (clearUserCart.fulfilled.match(resultAction)) {
      toast.success("Cart cleared successfully");
      dispatch(getUserCart());
    } else {
      toast.error("Failed to clear cart");
    }
  };

  const redirectToCheckout = async () => {
    const resultAction = await dispatch(proceedToPayment());

    if (proceedToPayment.fulfilled.match(resultAction)) {
      const paymentUrl = resultAction.payload;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error("No payment URL received");
      }
    } else {
      toast.error("Failed to proceed to payment");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-300 mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Start shopping to add items to your cart
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Shopping Cart ({cart?.items?.length} items)
          </h2>

          <div className="space-y-6">
            {cart?.items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white rounded-2xl shadow-sm p-4 hover:shadow-lg transition group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleRemoveFromCart(item.product_id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                      title="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-gray-500 mb-3">
                    ₦{Number(item.price).toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleDecreaseQuantity(item.product_id, item.quantity)
                      }
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    </button>

                    <span className="font-medium text-lg min-w-[2rem] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleIncreaseQuantity(item.product_id, item.quantity)
                      }
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    ₦{(Number(item.price) * item.quantity).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ₦{Number(item.price).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Clear Cart Button */}
          <div className="mt-6">
            <button
              onClick={clearEntireCart}
              className="text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Order Summary
          </h3>

          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Items ({cart?.items?.length})</span>
              <span>₦{subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 text-lg border-t pt-3">
              <span>Total</span>
              <span>₦{subtotal?.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={redirectToCheckout}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-[1.02]"
          >
            Proceed to Checkout
          </button>

          <div className="mt-4 text-center">
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
