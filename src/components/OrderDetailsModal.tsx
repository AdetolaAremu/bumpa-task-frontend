import React from "react";
import type { IOrder } from "../interfaces/responses/Ecom.response";

interface Props {
  order: IOrder | null;
  isOpen: boolean;
  onClose: () => void;
  getStatusColor: (status: string) => string;
  CloseIcon: React.FC;
}

const OrderDetailsModal: React.FC<Props> = ({
  order,
  isOpen,
  onClose,
  getStatusColor,
  CloseIcon,
}) => {
  if (!isOpen || !order) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Order Code
              </h3>
              <p className="text-sm text-gray-900">{order.order_code}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Payment Status
              </h3>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                  order.payment_status
                )}`}
              >
                {order.payment_status}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Order Status
              </h3>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                  order.order_status
                )}`}
              >
                {order.order_status}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Order Date
              </h3>
              <p className="text-sm text-gray-900">
                {order.created_at
                  ? new Date(order.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Updated
              </h3>
              <p className="text-sm text-gray-900">
                {order.updated_at
                  ? new Date(order.updated_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Order Items ({order.items?.length || 0})
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₦{Number(item.price).toLocaleString()} each
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium text-gray-900">
                          ₦
                          {Number(
                            Number(item.price) * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No items found
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">
                Total Amount:
              </span>
              <span className="text-xl font-bold text-gray-900">
                ₦{Number(order.total_amount).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
