import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyAIUsage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("employeePrediction");

    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading employee data:", error);
      }
    }
  }, []);

  const ai = data?.ai_usage || {};

  const allocated = Number(ai.allocated || 0);
  const used = Number(ai.used || 0);
  const unused = Number(ai.unused || 0);
  const utilisation = Number(ai.utilisation_percent || 0);

  const progress = Math.min(Math.max(utilisation, 0), 100);

  return (
    <div className="min-h-screen bg-[#f8f5f6]">

      {/* HEADER */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-7">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a4964]">
            Employee Workspace
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            My AI Usage
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor your AI credit consumption and utilisation.
          </p>

        </div>

      </div>


      <main className="mx-auto max-w-7xl px-6 py-8">

        {!data ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <h2 className="text-xl font-bold text-slate-900">
              No AI usage data available
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Complete your sustainability analysis first to
              view your AI usage information.
            </p>

            <button
              onClick={() => navigate("/employee/prediction")}
              className="mt-6 rounded-xl bg-[#7f1d3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#64162f]"
            >
              Go to Analysis
            </button>

          </div>

        ) : (

          <>

            {/* KPI CARDS */}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <MetricCard
                title="Allocated Credits"
                value={allocated}
                subtitle="Monthly allocation"
              />

              <MetricCard
                title="Credits Used"
                value={used}
                subtitle="Credits consumed"
              />

              <MetricCard
                title="Credits Remaining"
                value={unused}
                subtitle="Available credits"
              />

              <MetricCard
                title="Utilisation"
                value={`${utilisation}%`}
                subtitle="Overall AI usage"
              />

            </div>


            {/* MAIN GRID */}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">

              {/* USAGE */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                  AI Resources
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Credit Utilisation
                </h2>

                <div className="mt-8">

                  <div className="flex items-end justify-between">

                    <div>

                      <p className="text-4xl font-bold text-[#7f1d3d]">
                        {utilisation}%
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        of your allocated credits
                      </p>

                    </div>

                    <p className="text-sm text-slate-500">
                      {used} / {allocated}
                    </p>

                  </div>


                  {/* PROGRESS BAR */}

                  <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="h-full rounded-full bg-[#7f1d3d] transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>


                  {/* USAGE DETAILS */}

                  <div className="mt-6 grid grid-cols-2 gap-4">

                    <div className="rounded-xl bg-[#faf1f4] p-5">

                      <p className="text-xs text-[#9a4964]">
                        Credits Used
                      </p>

                      <p className="mt-2 text-2xl font-bold text-[#7f1d3d]">
                        {used}
                      </p>

                    </div>


                    <div className="rounded-xl bg-slate-50 p-5">

                      <p className="text-xs text-slate-500">
                        Credits Remaining
                      </p>

                      <p className="mt-2 text-2xl font-bold text-slate-800">
                        {unused}
                      </p>

                    </div>

                  </div>

                </div>

              </section>


              {/* STATUS */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                  Usage Overview
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Current AI Consumption
                </h2>


                <div className="mt-6 rounded-xl bg-[#faf1f4] p-6">

                  <p className="text-sm text-slate-500">
                    Current utilisation
                  </p>

                  <p className="mt-2 text-3xl font-bold text-[#7f1d3d]">
                    {utilisation}%
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    You have used{" "}
                    <strong>{used}</strong>{" "}
                    out of{" "}
                    <strong>{allocated}</strong>{" "}
                    allocated AI credits.
                  </p>

                </div>


                <div className="mt-5 space-y-3">

                  <InfoRow
                    label="Allocated Credits"
                    value={allocated}
                  />

                  <InfoRow
                    label="Credits Used"
                    value={used}
                  />

                  <InfoRow
                    label="Credits Remaining"
                    value={unused}
                  />

                  <InfoRow
                    label="Utilisation"
                    value={`${utilisation}%`}
                  />

                </div>

              </section>

            </div>


            {/* AI OPTIMISATION */}

            {data.ai_optimisation && (

              <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                  AI Optimisation
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  AI Credit Recommendations
                </h2>

                <div className="mt-5 rounded-xl bg-[#faf1f4] p-5">

                  <p className="text-sm leading-6 text-slate-600">
                    {formatValue(data.ai_optimisation)}
                  </p>

                </div>

              </section>

            )}

          </>

        )}

      </main>

    </div>
  );
}


/* ============================= */
/* COMPONENTS */
/* ============================= */

function MetricCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-4 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {subtitle}
      </p>

    </div>
  );
}


function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-800">
        {value}
      </span>

    </div>
  );
}


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
      value.message ||
      value.description ||
      value.recommendation ||
      value.value ||
      JSON.stringify(value)
    );

  }

  return String(value);
}


export default MyAIUsage;