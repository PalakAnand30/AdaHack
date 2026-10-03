const recommendations = [
  {
    title: "Reduce unused AI credits by 20%",
    description: "Potential saving of AI cost and energy usage.",
    impact: "High Impact",
  },
  {
    title: "Encourage car-pool or public transport",
    description: "Potential reduction in commute emissions.",
    impact: "Medium Impact",
  },
  {
    title: "Implement paperless processes",
    description: "Reduce printing-related emissions.",
    impact: "Medium Impact",
  },
];

function RecommendationCard() {
  return (
    <div className="eco-card p-4">

      <div className="mb-4 flex items-center justify-between">

        <h3 className="text-[13px] font-semibold text-[#111827]">
          Top Recommendations
        </h3>

        <button
          type="button"
          className="text-[10px] font-medium text-[#7f1d3a]"
        >
          View All →
        </button>

      </div>


      <div className="space-y-3">

        {recommendations.map((item, index) => (

          <div
            key={item.title}
            className="flex gap-3 border-b border-[#f0f1f3] pb-3 last:border-0 last:pb-0"
          >

            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#edf7ef] text-[10px] font-bold text-[#32945f]">
              {index + 1}
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex items-start justify-between gap-2">

                <p className="text-[11px] font-semibold text-[#1f2937]">
                  {item.title}
                </p>

                <span
                  className={`shrink-0 rounded px-1.5 py-1 text-[8px] font-medium ${
                    item.impact === "High Impact"
                      ? "bg-[#eaf7ee] text-[#25854f]"
                      : "bg-[#fff5df] text-[#a56b08]"
                  }`}
                >
                  {item.impact}
                </span>

              </div>

              <p className="mt-1 text-[9px] text-[#9ca3af]">
                {item.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecommendationCard;