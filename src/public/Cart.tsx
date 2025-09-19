import React from "react";

const Cart = () => {
  const items = [
    {
      id: 1,
      name: "Nike Air Sneakers",
      price: 35000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1606813903219-9a8c2d30e12d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 15000,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Shopping Cart
          </h2>

          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white rounded-2xl shadow-sm p-4 hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500">
                    ₦{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center mt-3 gap-3">
                    <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                      +
                    </button>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Order Summary
          </h3>

          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 text-lg border-t pt-3">
              <span>Total</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-[1.02]">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
