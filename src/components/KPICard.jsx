function KPICard({
  title,
  value,
  subtitle,
  percentage,
  accent = "burgundy",
}) {
  const accentColors = {
    burgundy: "bg-[#7f1d3a]",
    blue: "bg-[#3b82f6]",
    green: "bg-[#3ca982]",
    purple: "bg-[#8b5cf6]",
    orange: "bg-[#f59e0b]",
  };

  return (
    <div className="eco-card relative overflow-hidden p-4">

      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          accentColors[accent]
        }`}
      />

      <div className="pl-2">

        <p className="text-[11px] font-medium text-[#6b7280]">
          {title}
        </p>

        <p className="mt-2 text-[21px] font-bold text-[#111827]">
          {value}
        </p>

        {subtitle && (
          <p className="mt-1 text-[10px] text-[#9ca3af]">
            {subtitle}
          </p>
        )}

        {percentage !== undefined && (
          <div className="mt-3">

            <div className="h-1.5 overflow-hidden rounded-full bg-[#eef0f2]">

              <div
                className={`h-full rounded-full ${
                  accentColors[accent]
                }`}
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

            <p className="mt-1 text-[9px] text-[#9ca3af]">
              {percentage}% of total
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default KPICard;