import React, { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy data for products
  const purchasedProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 129.99,
      date: "2024-03-15",
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      date: "2024-03-12",
      status: "Shipped",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: 45.99,
      date: "2024-03-10",
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Coffee Maker",
      price: 89.99,
      date: "2024-03-08",
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop&crop=center",
    },
  ];

  // Dummy achievements data
  const achievements = [
    {
      id: 1,
      title: "First Purchase",
      description: "Made your very first purchase",
      icon: "🛍️",
      unlockedAt: "2024-03-08",
      isUnlocked: true,
      category: "purchase",
    },
    {
      id: 2,
      title: "Big Spender",
      description: "Spent over $500 in total",
      icon: "💰",
      unlockedAt: "2024-03-12",
      isUnlocked: true,
      category: "purchase",
    },
    {
      id: 3,
      title: "Tech Enthusiast",
      description: "Purchased 3 tech products",
      icon: "🔧",
      unlockedAt: "2024-03-15",
      isUnlocked: true,
      category: "special",
    },
    {
      id: 4,
      title: "Loyal Customer",
      description: "Made 5 successful purchases",
      icon: "⭐",
      unlockedAt: null,
      isUnlocked: false,
      category: "loyalty",
    },
    {
      id: 5,
      title: "VIP Member",
      description: "Spent over $1000 in total",
      icon: "👑",
      unlockedAt: null,
      isUnlocked: false,
      category: "special",
    },
    {
      id: 6,
      title: "Speed Shopper",
      description: "Made 3 purchases in one week",
      icon: "⚡",
      unlockedAt: null,
      isUnlocked: false,
      category: "special",
    },
  ];

  // Dummy badges data
  const badges = [
    {
      id: 1,
      name: "Bronze",
      description: "Welcome to our store!",
      icon: "🥉",
      color: "from-amber-400 to-amber-600",
      requiredPoints: 0,
    },
    {
      id: 2,
      name: "Silver",
      description: "You're getting the hang of it!",
      icon: "🥈",
      color: "from-gray-400 to-gray-600",
      requiredPoints: 100,
    },
    {
      id: 3,
      name: "Gold",
      description: "Outstanding customer!",
      icon: "🥇",
      color: "from-yellow-400 to-yellow-600",
      requiredPoints: 500,
    },
    {
      id: 4,
      name: "Platinum",
      description: "Elite status achieved!",
      icon: "💎",
      color: "from-blue-400 to-blue-600",
      requiredPoints: 1000,
    },
  ];

  // User progress data
  const userProgress = {
    currentPoints: 350,
    currentBadge: badges[1], // Silver
    nextBadge: badges[2], // Gold
    progressToNext: 70, // 350/500 * 100 = 70%
  };

  const totalSpent = purchasedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );
  const totalOrders = purchasedProducts.filter(
    (product) => product.status === "Delivered"
  ).length;
  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.isUnlocked
  );

  // SVG Icons
  const ShoppingBagIcon = () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z"
      />
    </svg>
  );

  const DollarIcon = () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
      />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const TrophyIcon = () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const TruckIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case "purchase":
        return "from-blue-500 to-blue-600";
      case "loyalty":
        return "from-purple-500 to-purple-600";
      case "special":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Customer Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Track your purchases, achievements, and progress.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("achievements")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "achievements"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Achievements & Badges
              </button>
            </nav>
          </div>
        </div>

        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <ShoppingBagIcon />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    +12%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {purchasedProducts.length}
                </h3>
                <p className="text-gray-600">Total Products</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <DollarIcon />
                  </div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    +8%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  ${totalSpent.toFixed(2)}
                </h3>
                <p className="text-gray-600">Total Spent</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <CheckCircleIcon />
                  </div>
                  <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    100%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {totalOrders}
                </h3>
                <p className="text-gray-600">Successful Orders</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <TrophyIcon />
                  </div>
                  <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                    {unlockedAchievements.length}/{achievements.length}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {unlockedAchievements.length}
                </h3>
                <p className="text-gray-600">Achievements</p>
              </div>
            </div>

            {/* Current Badge & Progress */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Your Current Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Badge */}
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${userProgress.currentBadge.color} text-white text-3xl mb-4 shadow-lg`}
                  >
                    {userProgress.currentBadge.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {userProgress.currentBadge.name} Badge
                  </h3>
                  <p className="text-gray-600">
                    {userProgress.currentBadge.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {userProgress.currentPoints} points
                  </p>
                </div>

                {/* Progress to Next */}
                {userProgress.nextBadge && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Progress to {userProgress.nextBadge.name}
                    </h3>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>
                          Current: {userProgress.currentPoints} points
                        </span>
                        <span>
                          Target: {userProgress.nextBadge.requiredPoints} points
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${userProgress.progressToNext}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {userProgress.progressToNext}% complete
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${userProgress.nextBadge.color} text-white text-xl flex items-center justify-center mr-3`}
                      >
                        {userProgress.nextBadge.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {userProgress.nextBadge.name} Badge
                        </p>
                        <p className="text-xs text-gray-500">
                          {userProgress.nextBadge.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Purchases Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Purchases
                </h2>
                <p className="text-gray-600 mt-1">
                  Your latest product purchases and their status
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {purchasedProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-12 w-12 rounded-lg object-cover shadow-sm"
                              src={product.image}
                              alt={product.name}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: #{product.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            ${product.price}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon />
                            <span className="ml-2">
                              {new Date(product.date).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              product.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : product.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {product.status === "Delivered" ? (
                              <CheckCircleIcon />
                            ) : (
                              <TruckIcon />
                            )}
                            <span className="ml-1">{product.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab Content */}
        {activeTab === "achievements" && (
          <div className="space-y-8">
            {/* Achievements Grid */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Achievements
                </h2>
                <p className="text-gray-600 mt-1">
                  Unlock achievements by making purchases and being an active
                  customer
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`rounded-xl p-6 border-2 transition-all duration-300 ${
                      achievement.isUnlocked
                        ? "border-green-200 bg-green-50 shadow-md"
                        : "border-gray-200 bg-gray-50 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`text-4xl ${
                          achievement.isUnlocked ? "" : "grayscale"
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      {achievement.isUnlocked && (
                        <div className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Unlocked
                        </div>
                      )}
                    </div>
                    <h3
                      className={`font-semibold mb-2 ${
                        achievement.isUnlocked
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      className={`text-sm mb-3 ${
                        achievement.isUnlocked
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {achievement.description}
                    </p>
                    {achievement.isUnlocked && achievement.unlockedAt && (
                      <p className="text-xs text-gray-500">
                        Unlocked on{" "}
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                    <div
                      className={`mt-3 w-full h-1 rounded-full bg-gradient-to-r ${getCategoryColor(
                        achievement.category
                      )} ${
                        achievement.isUnlocked ? "opacity-100" : "opacity-30"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* All Badges */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Badge System
                </h2>
                <p className="text-gray-600 mt-1">
                  Earn points through purchases to unlock higher tier badges
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {badges.map((badge) => {
                  const isUnlocked =
                    userProgress.currentPoints >= badge.requiredPoints;
                  const isCurrent = badge.id === userProgress.currentBadge.id;

                  return (
                    <div
                      key={badge.id}
                      className={`text-center p-6 rounded-xl border-2 transition-all duration-300 ${
                        isCurrent
                          ? "border-blue-500 bg-blue-50 shadow-lg transform scale-105"
                          : isUnlocked
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-gray-50 opacity-60"
                      }`}
                    >
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${
                          badge.color
                        } text-white text-2xl mb-4 shadow-lg ${
                          !isUnlocked ? "grayscale" : ""
                        }`}
                      >
                        {badge.icon}
                      </div>
                      <h3
                        className={`font-semibold mb-2 ${
                          isUnlocked ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {badge.name}
                      </h3>
                      <p
                        className={`text-sm mb-3 ${
                          isUnlocked ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {badge.description}
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          isUnlocked ? "text-gray-700" : "text-gray-400"
                        }`}
                      >
                        {badge.requiredPoints} points required
                      </p>
                      {isCurrent && (
                        <div className="mt-3 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          Current Badge
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
