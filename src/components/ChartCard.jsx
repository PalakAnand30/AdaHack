function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <div
      className={`eco-card overflow-hidden p-4 ${className}`}
    >

      <div className="mb-4">

        <h3 className="text-[13px] font-semibold text-[#111827]">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1 text-[10px] text-[#9ca3af]">
            {subtitle}
          </p>
        )}

      </div>

      {children}

    </div>
  );
}

export default ChartCard;