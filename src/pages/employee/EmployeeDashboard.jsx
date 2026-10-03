import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("employeePrediction");

    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error("Unable to read saved employee data:", error);
      }
    }
  }, []);

  const employeeId = data?.employee?.employee_id || "EMP001";

  const totalCO2 = data?.carbon?.total_co2 ?? 0;
  const baselineCO2 = data?.carbon?.baseline_co2 ?? 0;
  const carbonChange =
    data?.carbon?.change_from_baseline_percent ?? 0;

  const aiUtilisation =
    data?.ai_usage?.utilisation_percent ?? 0;

  const aiUsed = data?.ai_usage?.used ?? 0;
  const aiAllocated = data?.ai_usage?.allocated ?? 0;
  const aiUnused = data?.ai_usage?.unused ?? 0;

  const breakdown =
    data?.carbon_breakdown_percent || {};

  const recommendations =
    data?.recommendations || [];

  const incentive = data?.incentive;


  return (
    <div className="min-h-screen bg-[#f8f5f6]">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-7">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a4964]">
                Employee Workspace
              </p>

              <h1 className="mt-2 text-2xl font-bold text-slate-900">
                Sustainability Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Monitor your environmental impact, AI usage
                and sustainability performance.
              </p>

            </div>


            <div className="flex items-center gap-5">

              <div className="text-right">

                <p className="text-xs text-slate-400">
                  Employee ID
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {employeeId}
                </p>

              </div>


              <button
                onClick={() =>
                  navigate("/employee/prediction")
                }
                className="rounded-xl bg-[#7f1d3d] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#64162f]"
              >
                New Analysis
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-8">


        {/* ==================================================
            NO DATA
        ================================================== */}

        {!data ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto max-w-md">

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a4964]">
                No Analysis Available
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                Start your sustainability assessment
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Complete the sustainability analysis form
                to calculate your carbon footprint, AI usage,
                environmental impact and recommendations.
              </p>

              <button
                onClick={() =>
                  navigate("/employee/prediction")
                }
                className="mt-6 rounded-xl bg-[#7f1d3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#64162f]"
              >
                Start Analysis
              </button>

            </div>

          </div>

        ) : (

          <>

            {/* ==================================================
                KPI CARDS
            ================================================== */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              <MetricCard
                title="Total CO₂"
                value={totalCO2}
                unit="kg CO₂"
                description="Current footprint"
              />

              <MetricCard
                title="AI Utilisation"
                value={`${aiUtilisation}%`}
                description="Of allocated credits"
              />

              <MetricCard
                title="AI Credits Used"
                value={aiUsed}
                unit="credits"
                description={`${aiUnused} credits remaining`}
              />

              <MetricCard
                title="Baseline Change"
                value={`${Math.abs(carbonChange)}%`}
                description={
                  carbonChange <= 0
                    ? "Reduction from baseline"
                    : "Increase from baseline"
                }
                positive={carbonChange <= 0}
              />

            </div>


            {/* ==================================================
                CARBON + AI
            ================================================== */}

            <div className="mt-6 grid gap-6 lg:grid-cols-3">


              {/* CARBON BREAKDOWN */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                      Environmental Impact
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-slate-900">
                      Carbon Breakdown
                    </h2>

                  </div>


                  <div className="text-right">

                    <p className="text-xs text-slate-400">
                      Total
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#7f1d3d]">
                      {totalCO2} kg
                    </p>

                  </div>

                </div>


                <div className="mt-7 space-y-6">

                  <CarbonBar
                    label="Commute"
                    value={breakdown.commute}
                  />

                  <CarbonBar
                    label="Electricity"
                    value={breakdown.electricity}
                  />

                  <CarbonBar
                    label="Printing"
                    value={breakdown.printing}
                  />

                  <CarbonBar
                    label="AI Usage"
                    value={breakdown.ai}
                  />

                </div>

              </section>


              {/* AI USAGE */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                  AI Resources
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  AI Usage
                </h2>


                <div className="mt-7">

                  <div className="flex items-end justify-between">

                    <div>

                      <p className="text-3xl font-bold text-[#7f1d3d]">
                        {aiUtilisation}%
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Utilisation
                      </p>

                    </div>


                    <p className="text-sm font-medium text-slate-500">
                      {aiUsed} / {aiAllocated}
                    </p>

                  </div>


                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="h-full rounded-full bg-[#7f1d3d]"
                      style={{
                        width: `${Math.min(
                          Number(aiUtilisation) || 0,
                          100
                        )}%`,
                      }}
                    />

                  </div>


                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <SmallStat
                      label="Allocated"
                      value={aiAllocated}
                    />

                    <SmallStat
                      label="Used"
                      value={aiUsed}
                    />

                    <SmallStat
                      label="Unused"
                      value={aiUnused}
                    />

                    <SmallStat
                      label="Utilisation"
                      value={`${aiUtilisation}%`}
                    />

                  </div>

                </div>

              </section>

            </div>


            {/* ==================================================
                BASELINE + INCENTIVE
            ================================================== */}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">


              {/* BASELINE */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                  Performance
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Baseline Comparison
                </h2>


                <div className="mt-6 grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-slate-50 p-5">

                    <p className="text-xs text-slate-500">
                      Baseline CO₂
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {baselineCO2}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      kg CO₂
                    </p>

                  </div>


                  <div className="rounded-xl bg-[#faf1f4] p-5">

                    <p className="text-xs text-[#9a4964]">
                      Current CO₂
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#7f1d3d]">
                      {totalCO2}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      kg CO₂
                    </p>

                  </div>

                </div>


                <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">

                  <span className="text-sm text-slate-600">
                    Change from baseline
                  </span>

                  <span
                    className={
                      carbonChange <= 0
                        ? "text-sm font-bold text-emerald-600"
                        : "text-sm font-bold text-red-600"
                    }
                  >
                    {carbonChange > 0 ? "+" : ""}
                    {carbonChange}%
                  </span>

                </div>

              </section>


              {/* INCENTIVE */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                  Sustainability Programme
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Incentive Status
                </h2>


                <div className="mt-6 rounded-xl bg-[#faf1f4] p-5">

                  <p className="text-sm text-slate-600">
                    Current incentive
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#7f1d3d]">
                    {formatValue(incentive)}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Your incentive is calculated based on
                    sustainability performance and AI
                    utilisation.
                  </p>

                </div>

              </section>

            </div>


            {/* ==================================================
                RECOMMENDATIONS
            ================================================== */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                    Personalised Guidance
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Recommendations
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Actions based on your current sustainability data.
                  </p>

                </div>


                <button
                  onClick={() =>
                    navigate("/employee/tips")
                  }
                  className="text-sm font-semibold text-[#7f1d3d] transition hover:text-[#64162f]"
                >
                  View all
                </button>

              </div>


              <div className="mt-6 space-y-4">

                {Array.isArray(recommendations) &&
                recommendations.length > 0 ? (

                  recommendations.map(
                    (recommendation, index) => (
                      <Recommendation
                        key={index}
                        recommendation={recommendation}
                        index={index}
                      />
                    )
                  )

                ) : (

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">

                    <p className="text-sm font-semibold text-slate-700">
                      No recommendations available
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Complete another sustainability
                      analysis to receive personalised
                      recommendations.
                    </p>

                  </div>

                )}

              </div>

            </section>


            {/* ==================================================
                ACTION
            ================================================== */}

            <div className="mt-6 flex justify-end">

              <button
                onClick={() =>
                  navigate("/employee/prediction")
                }
                className="rounded-xl bg-[#7f1d3d] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#64162f]"
              >
                Run New Analysis
              </button>

            </div>

          </>

        )}

      </main>

    </div>
  );
}


/* ==========================================================
   METRIC CARD
========================================================== */

function MetricCard({
  title,
  value,
  unit,
  description,
  positive = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <div className="mt-4 flex items-baseline gap-2">

        <p className="text-2xl font-bold text-slate-900">
          {value}
        </p>

        {unit && (
          <span className="text-xs text-slate-400">
            {unit}
          </span>
        )}

      </div>

      <p
        className={
          positive
            ? "mt-2 text-xs text-emerald-600"
            : "mt-2 text-xs text-slate-400"
        }
      >
        {description}
      </p>

    </div>
  );
}


/* ==========================================================
   CARBON BAR
========================================================== */

function CarbonBar({
  label,
  value = 0,
}) {
  const numericValue = Number(value) || 0;

  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>

        <span className="text-sm font-semibold text-slate-900">
          {numericValue}%
        </span>

      </div>


      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-[#7f1d3d]"
          style={{
            width: `${Math.min(
              Math.max(numericValue, 0),
              100
            )}%`,
          }}
        />

      </div>

    </div>
  );
}


/* ==========================================================
   SMALL STAT
========================================================== */

function SmallStat({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value}
      </p>

    </div>
  );
}


/* ==========================================================
   RECOMMENDATION CARD
========================================================== */

function Recommendation({
  recommendation,
  index,
}) {

  /* ----------------------------------------------
     STRING RESPONSE
  ---------------------------------------------- */

  if (typeof recommendation === "string") {

    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-[#d9aebe]">

        <div className="flex gap-4">

          <RecommendationNumber index={index} />

          <div className="min-w-0">

            <p className="text-sm font-semibold text-slate-800">
              Sustainability Recommendation
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {recommendation}
            </p>

          </div>

        </div>

      </div>
    );
  }


  /* ----------------------------------------------
     OBJECT RESPONSE
  ---------------------------------------------- */

  if (
    recommendation &&
    typeof recommendation === "object"
  ) {

    const title =
      recommendation.title ||
      recommendation.name ||
      recommendation.category ||
      recommendation.type ||
      "Sustainability Recommendation";

    const message =
      recommendation.message ||
      recommendation.recommendation ||
      recommendation.description ||
      recommendation.text ||
      recommendation.reason ||
      "";

    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-[#d9aebe]">

        <div className="flex gap-4">

          <RecommendationNumber index={index} />


          <div className="min-w-0 flex-1">

            <p className="text-sm font-semibold text-slate-800">
              {title}
            </p>


            {message && (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {message}
              </p>
            )}


            {recommendation.impact && (
              <div className="mt-4">

                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Impact
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-600">
                  {formatValue(
                    recommendation.impact
                  )}
                </p>

              </div>
            )}


            {recommendation.action && (
              <div className="mt-4 rounded-lg bg-[#faf1f4] px-4 py-3">

                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7f1d3d]">
                  Suggested Action
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-600">
                  {formatValue(
                    recommendation.action
                  )}
                </p>

              </div>
            )}


            {recommendation.priority && (
              <div className="mt-3">

                <span className="inline-flex rounded-full bg-[#faf1f4] px-3 py-1 text-xs font-medium text-[#7f1d3d]">
                  Priority:{" "}
                  {formatValue(
                    recommendation.priority
                  )}
                </span>

              </div>
            )}

          </div>

        </div>

      </div>
    );
  }


  /* ----------------------------------------------
     FALLBACK
  ---------------------------------------------- */

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">

      <div className="flex gap-4">

        <RecommendationNumber index={index} />

        <p className="text-sm leading-6 text-slate-600">
          {String(recommendation)}
        </p>

      </div>

    </div>
  );
}


/* ==========================================================
   RECOMMENDATION NUMBER
========================================================== */

function RecommendationNumber({ index }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#faf1f4] text-sm font-bold text-[#7f1d3d]">
      {String(index + 1).padStart(2, "0")}
    </div>
  );
}


/* ==========================================================
   FORMAT OBJECT VALUES
========================================================== */

function formatValue(value) {

  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }


  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value);
  }


  if (Array.isArray(value)) {
    return value.join(", ");
  }


  if (typeof value === "object") {

    return (
      value.amount ??
      value.value ??
      value.reward ??
      value.incentive ??
      value.message ??
      value.description ??
      JSON.stringify(value)
    );
  }


  return String(value);
}


export default EmployeeDashboard;