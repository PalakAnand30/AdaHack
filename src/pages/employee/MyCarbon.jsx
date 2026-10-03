import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyCarbon() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("employeePrediction");

    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading carbon data:", error);
      }
    }
  }, []);

  const carbon = data?.carbon || {};
  const breakdown = data?.carbon_breakdown_percent || {};

  const total = Number(carbon.total_co2 || 0);
  const baseline = Number(carbon.baseline_co2 || 0);
  const change = Number(
    carbon.change_from_baseline_percent || 0
  );

  return (
    <div className="min-h-screen bg-[#f8f5f6]">

      {/* HEADER */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-7">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a4964]">
            Environmental Impact
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            My Carbon Footprint
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Understand and monitor your personal carbon emissions.
          </p>

        </div>

      </div>


      <main className="mx-auto max-w-7xl px-6 py-8">

        {!data ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <h2 className="text-xl font-bold text-slate-900">
              No carbon data available
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Complete your sustainability analysis to
              calculate your carbon footprint.
            </p>

            <button
              onClick={() => navigate("/employee/prediction")}
              className="mt-6 rounded-xl bg-[#7f1d3d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#64162f]"
            >
              Go to Analysis
            </button>

          </div>

        ) : (

          <>

            {/* TOTAL CARBON */}

            <section className="rounded-2xl bg-[#7f1d3d] p-7 text-white shadow-sm">

              <p className="text-sm text-white/70">
                Current Carbon Footprint
              </p>

              <div className="mt-3 flex items-baseline gap-3">

                <p className="text-4xl font-bold">
                  {total}
                </p>

                <span className="text-sm text-white/70">
                  kg CO₂
                </span>

              </div>

              <p className="mt-3 text-sm text-white/70">
                Baseline: {baseline} kg CO₂
              </p>

            </section>


            {/* BREAKDOWN */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                Emission Sources
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Carbon Breakdown
              </h2>

              <div className="mt-8 space-y-7">

                <CarbonSource
                  label="Commute"
                  value={carbon.commute_co2}
                  percentage={breakdown.commute}
                />

                <CarbonSource
                  label="Electricity"
                  value={carbon.electricity_co2}
                  percentage={breakdown.electricity}
                />

                <CarbonSource
                  label="Printing"
                  value={carbon.printing_co2}
                  percentage={breakdown.printing}
                />

                <CarbonSource
                  label="AI Usage"
                  value={carbon.ai_co2}
                  percentage={breakdown.ai}
                />

              </div>

            </section>


            {/* BASELINE COMPARISON */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                Performance
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Baseline Comparison
              </h2>


              <div className="mt-6 grid gap-4 md:grid-cols-3">

                <StatCard
                  label="Baseline"
                  value={`${baseline} kg`}
                />

                <StatCard
                  label="Current"
                  value={`${total} kg`}
                />

                <StatCard
                  label="Change"
                  value={`${change}%`}
                  highlight={change <= 0}
                />

              </div>

            </section>


            {/* INDIVIDUAL VALUES */}

            <section className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              <SmallCard
                title="Commute"
                value={carbon.commute_co2}
              />

              <SmallCard
                title="Electricity"
                value={carbon.electricity_co2}
              />

              <SmallCard
                title="Printing"
                value={carbon.printing_co2}
              />

              <SmallCard
                title="AI"
                value={carbon.ai_co2}
              />

            </section>

          </>

        )}

      </main>

    </div>
  );
}


/* ============================= */
/* CARBON SOURCE */
/* ============================= */

function CarbonSource({
  label,
  value = 0,
  percentage = 0,
}) {

  const percent = Math.min(
    Math.max(Number(percentage) || 0, 0),
    100
  );

  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>

        <div>

          <span className="text-sm font-bold text-slate-800">
            {value || 0} kg
          </span>

          <span className="ml-3 text-xs text-slate-400">
            {percent}%
          </span>

        </div>

      </div>


      <div className="h-3 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-[#7f1d3d] transition-all duration-500"
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>
  );
}


/* ============================= */
/* STAT CARD */
/* ============================= */

function StatCard({
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p
        className={
          highlight
            ? "mt-2 text-2xl font-bold text-emerald-600"
            : "mt-2 text-2xl font-bold text-slate-900"
        }
      >
        {value}
      </p>

    </div>
  );
}


/* ============================= */
/* SMALL CARD */
/* ============================= */

function SmallCard({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-2xl font-bold text-slate-900">
        {value || 0}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        kg CO₂
      </p>

    </div>
  );
}


export default MyCarbon;