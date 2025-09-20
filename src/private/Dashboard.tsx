import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
import {
  getUserStats,
  getAllAchievements,
  getAllBadges,
  getUserAchievements,
  getUserBadges,
} from "../store/Action";
import { useAppSelector } from "../store/Hook";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    userStat,
    allAchievements,
    allBadges,
    allUserAchievements,
    allUserBadges,
    loading,
  } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getUserStats());
    dispatch(getAllAchievements());
    dispatch(getAllBadges());
    dispatch(getUserAchievements());
    dispatch(getUserBadges());
  }, [dispatch]);

  const unlockedAchievementIds = new Set(
    Array.isArray(allUserAchievements)
      ? allUserAchievements.map((item) => item.achievement_id)
      : []
  );

  const unlockedBadgeIds = new Set(
    Array.isArray(allUserBadges)
      ? allUserBadges.map((item) => item.badge_id)
      : []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        )}

        {/* User Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-blue-500">
            <div className="text-3xl mb-2">📦</div>
            <p className="text-gray-600 text-sm">Total Products</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {userStat?.total_products ?? 0}
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-green-500">
            <div className="text-3xl mb-2">💰</div>
            <p className="text-gray-600 text-sm">Total Spent</p>
            <h2 className="text-3xl font-bold text-gray-900">
              ₦{userStat?.total_spent ?? "0.00"}
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-purple-500">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-gray-600 text-sm">Successful Orders</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {userStat?.successful_orders ?? 0}
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-yellow-500">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-gray-600 text-sm">Achievements</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {userStat?.achievements ?? 0}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
              🏆 Achievements
            </h2>
            {allAchievements?.length ? (
              <div className="space-y-3">
                {allAchievements.map((ach) => {
                  const isUnlocked = unlockedAchievementIds.has(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isUnlocked
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`text-lg ${isUnlocked ? "🌟" : "⭐"}`}
                            >
                              {isUnlocked ? "🌟" : "⭐"}
                            </span>
                            <h3
                              className={`font-semibold ${
                                isUnlocked ? "text-green-800" : "text-gray-700"
                              }`}
                            >
                              {ach.name}
                            </h3>
                          </div>
                          <p
                            className={`text-sm ${
                              isUnlocked ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {ach.condition_type}: {ach.condition_value}
                          </p>
                        </div>
                        {isUnlocked && (
                          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Unlocked
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No achievements available
              </p>
            )}
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
              🎖️ Badges
            </h2>
            {allBadges?.length ? (
              <div className="space-y-3">
                {allBadges?.map((badge) => {
                  const isUnlocked = unlockedBadgeIds.has(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isUnlocked
                          ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 shadow-md"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {isUnlocked ? "🏅" : "🥉"}
                          </span>
                          <div>
                            <h3
                              className={`font-semibold ${
                                isUnlocked ? "text-yellow-800" : "text-gray-700"
                              }`}
                            >
                              {badge.name}
                            </h3>
                            <p
                              className={`text-sm ${
                                isUnlocked ? "text-yellow-600" : "text-gray-500"
                              }`}
                            >
                              Requires {badge.required_achievements}{" "}
                              achievements
                            </p>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isUnlocked
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {isUnlocked ? "Earned" : "Locked"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No badges available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
