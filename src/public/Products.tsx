import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // or whatever toast library you're using
import { useAppDispatch, useAppSelector } from "../store/Hook";
import type { IAllPagination } from "../interfaces/types/Ecom.type";
import {
  addToCart,
  getAllProducts,
  getUserCart,
  removeFromCart,
} from "../store/Action";
// import { useAppDispatch, useAppSelector } from '../hooks/redux';
// import { getAllProducts } from '../actions/productActions';
// import { addToCart, removeFromCart, getUserCart } from '../actions/cartActions';
// import type { IAllPagination } from '../interfaces/requests/Ecom.request';

const Products = () => {
  const dispatch = useAppDispatch();

  const { products, loading } = useAppSelector((state) => state.products);
  const { cart } = useAppSelector((state) => state.cart);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const params: IAllPagination = {
      pageSize: 20,
      page: 1,
      searchQuery: searchTerm,
    };
    dispatch(getAllProducts(params));
    dispatch(getUserCart());
  }, [dispatch, searchTerm]);

  const handleAddToCart = async (product_id: number) => {
    const resultAction = await dispatch(addToCart({ product_id, quantity: 1 }));
    if (addToCart.fulfilled.match(resultAction)) {
      toast.success("Added to cart!");
      dispatch(getUserCart());
    } else {
      toast.error("Failed to add to cart");
    }
  };

  const handleRemoveFromCart = async (product_id: number) => {
    const resultAction = await dispatch(removeFromCart({ product_id }));
    if (removeFromCart.fulfilled.match(resultAction)) {
      toast.success("Removed from cart!");
      // Refresh cart data to update UI immediately
      dispatch(getUserCart());
    } else {
      toast.error("Failed to remove from cart");
    }
  };

  const isProductInCart = (product_id: number) => {
    return cart?.items?.some((item) => item.product_id === product_id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Product Catalog
          </h1>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {products?.total || 0} products
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.data?.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product?.image_url}
                      alt={product?.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product?.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product?.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          NGN {product?.price}
                        </span>
                      </div>
                    </div>

                    {/* Conditional Button */}
                    {isProductInCart(product.id) ? (
                      <button
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {products?.total === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Products;
