import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
import {
  getUserStats,
  getAllAchievements,
  getAllBadges,
  getUserAchievements,
  getUserBadges,
  userCombinedBadgeAndAchievements,
} from "../store/Action";
import { useAppSelector } from "../store/Hook";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userStat, loading: userLoading } = useAppSelector(
    (state) => state.user
  );

  const {
    allAchievements,
    allBadges,
    allUserAchievements,
    allUserBadges,
    combinedAchievementBadge,
    loading: gamificationLoading,
  } = useAppSelector((state) => state.gamification);

  useEffect(() => {
    dispatch(getUserStats());
    dispatch(getAllAchievements());
    dispatch(getAllBadges());
    dispatch(getUserAchievements());
    dispatch(getUserBadges());
    dispatch(userCombinedBadgeAndAchievements());
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

  const getBadgeEmoji = (badge: string) => {
    switch (badge?.toLowerCase()) {
      case "bronze":
        return "🥉";
      case "silver":
        return "🥈";
      case "gold":
        return "🥇";
      case "platinum":
        return "💎";
      default:
        return "🎖️";
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge?.toLowerCase()) {
      case "bronze":
        return "from-amber-50 to-orange-50 border-amber-200 text-amber-800";
      case "silver":
        return "from-gray-50 to-slate-50 border-gray-300 text-gray-800";
      case "gold":
        return "from-yellow-50 to-amber-50 border-yellow-300 text-yellow-800";
      case "platinum":
        return "from-purple-50 to-indigo-50 border-purple-300 text-purple-800";
      default:
        return "from-blue-50 to-indigo-50 border-blue-200 text-blue-800";
    }
  };

  const isNextAvailable = (achievementName: string) => {
    return combinedAchievementBadge?.next_available_achievements?.includes(
      achievementName
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {gamificationLoading && userLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon="📦"
            label="Total Products"
            value={userStat?.total_products ?? 0}
            borderColor="border-blue-500"
          />
          <StatCard
            icon="💰"
            label="Total Spent"
            value={`₦${userStat?.total_spent ?? "0.00"}`}
            borderColor="border-green-500"
          />
          <StatCard
            icon="✅"
            label="Successful Orders"
            value={userStat?.successful_orders ?? 0}
            borderColor="border-purple-500"
          />
          <StatCard
            icon="🏆"
            label="Achievements"
            value={userStat?.achievements ?? 0}
            borderColor="border-yellow-500"
          />
        </div>

        {combinedAchievementBadge?.current_badge && (
          <div className="mb-8">
            <div
              className={`bg-gradient-to-r ${getBadgeColor(
                combinedAchievementBadge.current_badge
              )} rounded-xl shadow-lg p-6 border-2`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">
                    {getBadgeEmoji(combinedAchievementBadge.current_badge)}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Current Badge: {combinedAchievementBadge.current_badge}
                    </h2>
                    {combinedAchievementBadge.next_badge && (
                      <p className="text-sm opacity-75 mt-1">
                        Next: {combinedAchievementBadge.next_badge} Badge
                      </p>
                    )}
                  </div>
                </div>
                {combinedAchievementBadge.next_badge &&
                  combinedAchievementBadge.remaining_to_unlock_next_badge && (
                    <div className="text-right">
                      <div className="bg-white/80 rounded-lg p-3">
                        <p className="text-sm opacity-75 mb-1">
                          Progress to Next Badge
                        </p>
                        <p className="text-lg font-semibold">
                          {
                            combinedAchievementBadge.remaining_to_unlock_next_badge
                          }{" "}
                          more needed
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
            🏆 Achievements
          </h2>
          {allAchievements?.length ? (
            <div className="space-y-3">
              {allAchievements.map((ach) => {
                const isUnlocked = unlockedAchievementIds.has(ach.id);
                const isNextAvailableItem = isNextAvailable(ach.name);

                return (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isUnlocked
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md"
                        : isNextAvailableItem
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">
                            {isUnlocked
                              ? "🌟"
                              : isNextAvailableItem
                              ? "🎯"
                              : "⭐"}
                          </span>
                          <h3
                            className={`font-semibold ${
                              isUnlocked
                                ? "text-green-800"
                                : isNextAvailableItem
                                ? "text-blue-800"
                                : "text-gray-700"
                            }`}
                          >
                            {ach.name}
                          </h3>
                        </div>
                        <p
                          className={`text-sm ${
                            isUnlocked
                              ? "text-green-600"
                              : isNextAvailableItem
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        >
                          {ach.condition_type}: {ach.condition_value}
                        </p>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isUnlocked
                            ? "bg-green-500 text-white"
                            : isNextAvailableItem
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isUnlocked
                          ? "Unlocked"
                          : isNextAvailableItem
                          ? "In Progress"
                          : "Locked"}
                      </div>
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

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
            🎖️ Badges
          </h2>
          {allBadges?.length ? (
            <div className="space-y-3">
              {allBadges?.map((badge) => {
                const isUnlocked = unlockedBadgeIds.has(badge.id);
                const isCurrentBadge =
                  combinedAchievementBadge?.current_badge?.toLowerCase() ===
                  badge.name?.toLowerCase();
                const isNextBadge =
                  combinedAchievementBadge?.next_badge?.toLowerCase() ===
                  badge.name?.toLowerCase();

                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isCurrentBadge
                        ? `bg-gradient-to-r ${getBadgeColor(
                            badge.name
                          )} border-2 shadow-md`
                        : isUnlocked
                        ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 shadow-md"
                        : isNextBadge
                        ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 shadow-sm"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {isCurrentBadge || isUnlocked
                            ? getBadgeEmoji(badge.name)
                            : "🥉"}
                        </span>
                        <div>
                          <h3
                            className={`font-semibold ${
                              isCurrentBadge
                                ? getBadgeColor(badge.name).split(" ").pop()
                                : isUnlocked
                                ? "text-yellow-800"
                                : isNextBadge
                                ? "text-purple-800"
                                : "text-gray-700"
                            }`}
                          >
                            {badge.name}
                            {isCurrentBadge && (
                              <span className="ml-2 text-sm font-normal">
                                (Current)
                              </span>
                            )}
                          </h3>
                          <p
                            className={`text-sm ${
                              isCurrentBadge
                                ? "text-current opacity-75"
                                : isUnlocked
                                ? "text-yellow-600"
                                : isNextBadge
                                ? "text-purple-600"
                                : "text-gray-500"
                            }`}
                          >
                            Requires {badge.required_achievements} achievements
                            {isNextBadge &&
                              combinedAchievementBadge?.remaining_to_unlock_next_badge && (
                                <span className="block text-xs mt-1">
                                  (
                                  {
                                    combinedAchievementBadge.remaining_to_unlock_next_badge
                                  }{" "}
                                  more needed)
                                </span>
                              )}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isCurrentBadge
                            ? "bg-blue-500 text-white"
                            : isUnlocked
                            ? "bg-yellow-500 text-white"
                            : isNextBadge
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {isCurrentBadge
                          ? "Current"
                          : isUnlocked
                          ? "Earned"
                          : isNextBadge
                          ? "Next"
                          : "Locked"}
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
  );
};

export default Dashboard;
