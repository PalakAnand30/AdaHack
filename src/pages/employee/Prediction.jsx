import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateEmployeeDashboard } from "../../api/api";

function Prediction() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    commuteMode: "",
    distance: "",
    fuelType: "Petrol",
    electricity: "",
    bwPages: "",
    colourPages: "",
    aiUsage: "",
  });

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const distanceValues = {
    "0-2": 1,
    "2-5": 3.5,
    "5-10": 7.5,
    "10+": 12,
  };

  const electricityValues = {
    Low: 3,
    Medium: 7,
    High: 12,
  };

  const pageValues = {
    "0": 0,
    "1-10": 5,
    "11-25": 18,
    "25+": 30,
  };

  const aiValues = {
    Low: 500,
    Medium: 1500,
    High: 3000,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    if (
      !form.commuteMode ||
      !form.distance ||
      !form.electricity ||
      !form.bwPages ||
      !form.colourPages ||
      !form.aiUsage
    ) {
      setError("Please complete all sections before generating the analysis.");
      return;
    }

    setLoading(true);

    try {
      const distance = distanceValues[form.distance];

      const payload = {
        employee_id: "EMP001",
        manager_id: "MGR001",

        car_miles:
          form.commuteMode === "Car"
            ? distance
            : 0,

        bus_miles:
          form.commuteMode === "Bus"
            ? distance
            : 0,

        tram_miles:
          form.commuteMode === "Tram"
            ? distance
            : 0,

        fuel_type:
          form.commuteMode === "Car"
            ? form.fuelType
            : null,

        electricity_kwh:
          electricityValues[form.electricity],

        bw_pages:
          pageValues[form.bwPages],

        colour_pages:
          pageValues[form.colourPages],

        ai_credits_allocated: 3000,

        ai_credits_used:
          aiValues[form.aiUsage],

        baseline_co2: 0,
      };

      console.log("Sending:", payload);

      

        const data = await generateEmployeeDashboard(payload);

localStorage.setItem(
  "employeePrediction",
  JSON.stringify(data)
);

setResult(data);

      console.log("Received:", data);

      setResult(data);

    } catch (err) {
      console.error("Prediction error:", err);

      setError(
        err.message ||
          "Unable to generate the analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f6] px-6 py-8">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8">

          <button
            onClick={() => navigate("/employee")}
            className="mb-5 text-sm font-medium text-[#7f1d3d] hover:text-[#64162f]"
          >
            ← Back to Dashboard
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a4964]">
            EcoBalance AI
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Sustainability Analysis
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter your activity information to calculate your
            environmental impact.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">

            <p className="text-sm font-semibold text-red-700">
              Analysis failed
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>

          </div>
        )}


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <div className="space-y-6">


            {/* COMMUTE */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-slate-900">
                Commute
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select your main method of travel.
              </p>


              <div className="mt-5 grid gap-4 md:grid-cols-3">

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Travel Mode
                  </label>

                  <select
                    value={form.commuteMode}
                    onChange={(e) =>
                      update(
                        "commuteMode",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#7f1d3d] focus:ring-2 focus:ring-[#7f1d3d]/10"
                  >

                    <option value="">
                      Select mode
                    </option>

                    <option value="Car">
                      Car
                    </option>

                    <option value="Bus">
                      Bus
                    </option>

                    <option value="Tram">
                      Tram
                    </option>

                  </select>

                </div>


                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Distance
                  </label>

                  <select
                    value={form.distance}
                    onChange={(e) =>
                      update(
                        "distance",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#7f1d3d] focus:ring-2 focus:ring-[#7f1d3d]/10"
                  >

                    <option value="">
                      Select distance
                    </option>

                    <option value="0-2">
                      0–2 miles
                    </option>

                    <option value="2-5">
                      2–5 miles
                    </option>

                    <option value="5-10">
                      5–10 miles
                    </option>

                    <option value="10+">
                      10+ miles
                    </option>

                  </select>

                </div>


                {form.commuteMode === "Car" && (

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Fuel Type
                    </label>

                    <select
                      value={form.fuelType}
                      onChange={(e) =>
                        update(
                          "fuelType",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#7f1d3d] focus:ring-2 focus:ring-[#7f1d3d]/10"
                    >

                      <option value="Petrol">
                        Petrol
                      </option>

                      <option value="Diesel">
                        Diesel
                      </option>

                      <option value="Hybrid">
                        Hybrid
                      </option>

                      <option value="Electric">
                        Electric
                      </option>

                    </select>

                  </div>

                )}

              </div>

            </section>


            {/* ELECTRICITY */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-slate-900">
                Electricity Usage
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select your estimated electricity usage.
              </p>


              <div className="mt-5 grid gap-3 md:grid-cols-3">

                {["Low", "Medium", "High"].map(
                  (option) => (

                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        update(
                          "electricity",
                          option
                        )
                      }
                      className={[
                        "rounded-xl border px-5 py-4 text-sm font-semibold transition",
                        form.electricity === option
                          ? "border-[#7f1d3d] bg-[#faf1f4] text-[#7f1d3d]"
                          : "border-slate-200 text-slate-700 hover:border-[#c88ca1]",
                      ].join(" ")}
                    >
                      {option}
                    </button>

                  )
                )}

              </div>

            </section>


            {/* PRINTING */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-slate-900">
                Printing
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select approximately how many pages you printed.
              </p>


              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Black & White Pages
                  </label>

                  <select
                    value={form.bwPages}
                    onChange={(e) =>
                      update(
                        "bwPages",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#7f1d3d]"
                  >

                    <option value="">
                      Select pages
                    </option>

                    <option value="0">
                      0
                    </option>

                    <option value="1-10">
                      1–10
                    </option>

                    <option value="11-25">
                      11–25
                    </option>

                    <option value="25+">
                      25+
                    </option>

                  </select>

                </div>


                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Colour Pages
                  </label>

                  <select
                    value={form.colourPages}
                    onChange={(e) =>
                      update(
                        "colourPages",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#7f1d3d]"
                  >

                    <option value="">
                      Select pages
                    </option>

                    <option value="0">
                      0
                    </option>

                    <option value="1-10">
                      1–10
                    </option>

                    <option value="11-25">
                      11–25
                    </option>

                    <option value="25+">
                      25+
                    </option>

                  </select>

                </div>

              </div>

            </section>


            {/* AI */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-slate-900">
                AI Usage
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select your approximate AI usage today.
              </p>


              <div className="mt-5 grid gap-3 md:grid-cols-3">

                {["Low", "Medium", "High"].map(
                  (option) => (

                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        update(
                          "aiUsage",
                          option
                        )
                      }
                      className={[
                        "rounded-xl border px-5 py-4 text-sm font-semibold transition",
                        form.aiUsage === option
                          ? "border-[#7f1d3d] bg-[#faf1f4] text-[#7f1d3d]"
                          : "border-slate-200 text-slate-700 hover:border-[#c88ca1]",
                      ].join(" ")}
                    >
                      {option}
                    </button>

                  )
                )}

              </div>

            </section>


            {/* SUBMIT */}

            <div className="flex justify-end">

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#7f1d3d] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#64162f] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Generating..."
                  : "Generate Analysis"}

              </button>

            </div>

          </div>

        </form>


        {/* RESULTS */}

        {result && (

          <section className="mt-8">

            <div className="mb-6">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                Analysis Complete
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Your Sustainability Results
              </h2>

            </div>


            {/* KPI CARDS */}

            <div className="grid gap-4 md:grid-cols-4">

              <ResultCard
                title="Total CO₂"
                value={`${result.carbon?.total_co2 ?? 0}`}
                subtitle="kg CO₂"
              />

              <ResultCard
                title="AI Utilisation"
                value={`${result.ai_usage?.utilisation_percent ?? 0}%`}
                subtitle="AI credits"
              />

              <ResultCard
                title="AI Credits Used"
                value={`${result.ai_usage?.used ?? 0}`}
                subtitle="credits"
              />

              <ResultCard
                title="Baseline Change"
                value={`${result.carbon?.change_from_baseline_percent ?? 0}%`}
                subtitle="from baseline"
              />

            </div>


            {/* CARBON BREAKDOWN */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h3 className="text-lg font-bold text-slate-900">
                Carbon Breakdown
              </h3>

              <div className="mt-5 space-y-5">

                <Breakdown
                  label="Commute"
                  value={
                    result.carbon_breakdown_percent?.commute ?? 0
                  }
                />

                <Breakdown
                  label="Electricity"
                  value={
                    result.carbon_breakdown_percent?.electricity ?? 0
                  }
                />

                <Breakdown
                  label="Printing"
                  value={
                    result.carbon_breakdown_percent?.printing ?? 0
                  }
                />

                <Breakdown
                  label="AI"
                  value={
                    result.carbon_breakdown_percent?.ai ?? 0
                  }
                />

              </div>

            </div>


            {/* RECOMMENDATIONS */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h3 className="text-lg font-bold text-slate-900">
                Recommendations
              </h3>

              <div className="mt-4 space-y-3">

                {Array.isArray(result.recommendations) ? (

                  result.recommendations.map(
                    (recommendation, index) => (

                      <div
                        key={index}
                        className="rounded-xl bg-[#faf5f7] px-4 py-3 text-sm text-slate-700"
                      >
                        {typeof recommendation === "string"
                          ? recommendation
                          : JSON.stringify(recommendation)}
                      </div>

                    )
                  )

                ) : (

                  <div className="rounded-xl bg-[#faf5f7] px-4 py-3 text-sm text-slate-700">
                    {typeof result.recommendations === "string"
                      ? result.recommendations
                      : JSON.stringify(
                          result.recommendations
                        )}
                  </div>

                )}

              </div>

            </div>


            {/* ACTION */}

            <div className="mt-6 flex justify-end">

              <button
                type="button"
                onClick={() => navigate("/employee")}
                className="rounded-xl bg-[#7f1d3d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#64162f]"
              >
                Back to Dashboard
              </button>

            </div>

          </section>

        )}

      </div>

    </div>
  );
}


/* ==================================================
   RESULT CARD
================================================== */

function ResultCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-2xl font-bold text-[#7f1d3d]">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {subtitle}
      </p>

    </div>
  );
}


/* ==================================================
   BREAKDOWN
================================================== */

function Breakdown({
  label,
  value,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>

        <span className="text-sm font-semibold text-slate-900">
          {value}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-[#7f1d3d] transition-all"
          style={{
            width: `${Math.min(value, 100)}%`,
          }}
        />

      </div>

    </div>
  );
}


export default Prediction;