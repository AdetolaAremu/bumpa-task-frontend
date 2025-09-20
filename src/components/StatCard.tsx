import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  borderColor,
}) => {
  const formattedValue =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 text-center border-l-4 ${borderColor}`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-gray-600 text-sm">{label}</p>
      <h2 className="text-3xl font-bold text-gray-900">{formattedValue}</h2>
    </div>
  );
};

export default StatCard;
