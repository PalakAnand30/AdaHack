import { useEffect, useState } from "react";

function Tips() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("employeePrediction");

    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error(
          "Error loading recommendations:",
          error
        );
      }
    }
  }, []);

  const recommendations =
    data?.recommendations || [];

  return (
    <div className="min-h-screen bg-[#f8f5f6]">

      {/* HEADER */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-7">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a4964]">
            Sustainability Guidance
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Tips & Recommendations
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Personalised sustainability recommendations based
            on your activity.
          </p>

        </div>

      </div>


      <main className="mx-auto max-w-7xl px-6 py-8">

        {!data ? (

          <EmptyState />

        ) : (

          <>

            {/* INTRODUCTION */}

            <section className="rounded-2xl bg-[#7f1d3d] p-7 text-white shadow-sm">

              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Personalised Guidance
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Actions for a more sustainable workflow
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
                These recommendations are based on your
                commute, electricity, printing and AI usage
                data.
              </p>

            </section>


            {/* RECOMMENDATIONS */}

            <section className="mt-7">

              <div className="mb-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                  Recommendations
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Your personalised actions
                </h2>

              </div>


              {Array.isArray(recommendations) &&
              recommendations.length > 0 ? (

                <div className="space-y-4">

                  {recommendations.map(
                    (recommendation, index) => (
                      <RecommendationCard
                        key={index}
                        recommendation={recommendation}
                        index={index}
                      />
                    )
                  )}

                </div>

              ) : (

                <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                  <h3 className="font-semibold text-slate-900">
                    No specific recommendations
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Your current sustainability indicators
                    do not have additional recommendations.
                  </p>

                </div>

              )}

            </section>


            {/* GENERAL TIPS */}

            <section className="mt-7">

              <div className="mb-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a4964]">
                  Everyday Actions
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Simple sustainability practices
                </h2>

              </div>


              <div className="grid gap-5 md:grid-cols-3">

                <TipCard
                  title="Reduce unnecessary travel"
                  description="Consider public transport, walking or cycling when practical."
                />

                <TipCard
                  title="Reduce printing"
                  description="Use digital documents where possible and avoid unnecessary printing."
                />

                <TipCard
                  title="Use AI efficiently"
                  description="Avoid unnecessary AI requests and reuse useful outputs where appropriate."
                />

              </div>

            </section>

          </>

        )}

      </main>

    </div>
  );
}


/* ============================= */
/* RECOMMENDATION CARD */
/* ============================= */

function RecommendationCard({
  recommendation,
  index,
}) {

  if (typeof recommendation === "string") {

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex gap-5">

          <NumberBadge index={index} />

          <div>

            <h3 className="font-semibold text-slate-900">
              Sustainability Recommendation
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {recommendation}
            </p>

          </div>

        </div>

      </div>
    );
  }


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

    const description =
      recommendation.message ||
      recommendation.recommendation ||
      recommendation.description ||
      recommendation.text ||
      recommendation.reason ||
      "";


    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex gap-5">

          <NumberBadge index={index} />

          <div className="flex-1">

            <h3 className="text-base font-semibold text-slate-900">
              {title}
            </h3>

            {description && (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {formatValue(description)}
              </p>
            )}


            {recommendation.impact && (

              <div className="mt-4">

                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Expected Impact
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {formatValue(
                    recommendation.impact
                  )}
                </p>

              </div>

            )}


            {recommendation.action && (

              <div className="mt-4 rounded-xl bg-[#faf1f4] p-4">

                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7f1d3d]">
                  Suggested Action
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {formatValue(
                    recommendation.action
                  )}
                </p>

              </div>

            )}

          </div>

        </div>

      </div>
    );
  }


  return null;
}


/* ============================= */
/* NUMBER */
/* ============================= */

function NumberBadge({ index }) {

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#faf1f4] text-sm font-bold text-[#7f1d3d]">
      {String(index + 1).padStart(2, "0")}
    </div>
  );

}


/* ============================= */
/* TIP CARD */
/* ============================= */

function TipCard({
  title,
  description,
}) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </div>
  );

}


/* ============================= */
/* EMPTY STATE */
/* ============================= */

function EmptyState() {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

      <h2 className="text-xl font-bold text-slate-900">
        No recommendations yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Complete your sustainability analysis to receive
        personalised recommendations.
      </p>

    </div>
  );

}


/* ============================= */
/* FORMAT VALUE */
/* ============================= */

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


export default Tips;