import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import monthlyEmployee from "../../data/monthlyEmployee.json";
import dailyData from "../../data/dailyData.json";


function EmployeeDetails() {

  const { employeeId } = useParams();

  const navigate = useNavigate();


  // ==========================================
  // EMPLOYEE MONTHLY DATA
  // ==========================================

  const employeeMonthlyData = useMemo(() => {

    return monthlyEmployee.filter(
      (item) =>
        String(item["Employee ID"]) ===
        String(employeeId)
    );

  }, [employeeId]);


  // ==========================================
  // EMPLOYEE DAILY DATA
  // ==========================================

  const employeeDailyData = useMemo(() => {

    return dailyData.filter(
      (item) =>
        String(item["Employee ID"]) ===
        String(employeeId)
    );

  }, [employeeId]);


  // ==========================================
  // EMPLOYEE NOT FOUND
  // ==========================================

  if (!employeeMonthlyData.length) {

    return (

      <div className="p-6">

        <button
          onClick={() =>
            navigate("/manager/team")
          }
          className="mb-5 text-[11px] font-medium text-[#7f1d3a]"
        >
          ← Back to Team Members
        </button>


        <div className="eco-card p-8 text-center">

          <h2 className="text-lg font-semibold text-[#111827]">
            Employee not found
          </h2>

          <p className="mt-2 text-[11px] text-[#6b7280]">
            No data is available for employee {employeeId}.
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // BASIC EMPLOYEE INFORMATION
  // ==========================================

  const firstRecord =
    employeeMonthlyData[0];


  const managerId =
    firstRecord["Manager ID"];


  // ==========================================
  // TOTALS
  // ==========================================

  const totalCO2 = employeeMonthlyData.reduce(
    (sum, item) =>
      sum + Number(item["Total CO2e"] || 0),
    0
  );


  const commuteCO2 = employeeMonthlyData.reduce(
    (sum, item) =>
      sum + Number(item["Commute CO2e"] || 0),
    0
  );


  const electricityCO2 =
    employeeMonthlyData.reduce(
      (sum, item) =>
        sum + Number(item["Electricity CO2e"] || 0),
      0
    );


  const printingCO2 =
    employeeMonthlyData.reduce(
      (sum, item) =>
        sum + Number(item["Printing CO2e"] || 0),
      0
    );


  const aiCO2 =
    employeeMonthlyData.reduce(
      (sum, item) =>
        sum + Number(item["AI CO2e"] || 0),
      0
    );


  // ==========================================
  // AI USAGE
  // ==========================================

  const aiAllocated =
    employeeMonthlyData.reduce(
      (sum, item) =>
        sum +
        Number(
          item["AI Credits Allocated"] || 0
        ),
      0
    );


  const aiUsed =
    employeeMonthlyData.reduce(
      (sum, item) =>
        sum +
        Number(
          item["AI Credits Used"] || 0
        ),
      0
    );


  const aiUtilisation =
    aiAllocated > 0
      ? (aiUsed / aiAllocated) * 100
      : 0;


  // ==========================================
  // OFFICE / WFH
  // ==========================================

  const officeDays =
    employeeMonthlyData.reduce(
      (sum, item) =>
        sum + Number(item["Office Days"] || 0),
      0
    );


  const wfhDays =
    employeeMonthlyData.reduce(
      (sum, item) =>
        sum + Number(item["WFH Days"] || 0),
      0
    );


  // ==========================================
  // COMMUTE
  // ==========================================

  const commuteMode =
    firstRecord["Commute Mode"] || "N/A";


  const commuteMiles =
    employeeMonthlyData.reduce(
      (sum, item) =>
        sum + Number(item["Commute Miles"] || 0),
      0
    );


  // ==========================================
  // AI COST
  // ==========================================

  const aiCost =
    employeeMonthlyData.reduce(
      (sum, item) =>
        sum + Number(item["AI Cost"] || 0),
      0
    );


  // ==========================================
  // MONTHLY CHART
  // ==========================================

  const monthlyChartData =
    employeeMonthlyData.map(
      (item) => ({

        month: String(
          item["Month"] || ""
        ),

        carbon: Number(
          item["Total CO2e"] || 0
        ),

        commute: Number(
          item["Commute CO2e"] || 0
        ),

        electricity: Number(
          item["Electricity CO2e"] || 0
        ),

        printing: Number(
          item["Printing CO2e"] || 0
        ),

        ai: Number(
          item["AI CO2e"] || 0
        ),

      })
    );


  // ==========================================
  // DAILY CHART
  // ==========================================

  const dailyChartData =
    employeeDailyData.map(
      (item) => ({

        date: String(
          item["Date"] || ""
        ),

        carbon: Number(
          item["Total CO2e"] || 0
        ),

      })
    );


  // ==========================================
  // FORMAT
  // ==========================================

  const number = (value) =>
    Number(value || 0).toFixed(2);


  return (

    <div className="space-y-5 p-5 lg:p-6">

      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div>

        <button
          onClick={() =>
            navigate("/manager/team")
          }
          className="mb-4 text-[11px] font-medium text-[#7f1d3a] hover:underline"
        >
          ← Back to Team Members
        </button>


        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] font-medium uppercase tracking-wide text-[#9ca3af]">
              Employee Details
            </p>

            <h2 className="mt-1 text-[21px] font-bold text-[#111827]">
              {employeeId}
            </h2>

            <p className="mt-1 text-[11px] text-[#6b7280]">
              Manager: {managerId}
            </p>

          </div>


          <div className="rounded-lg bg-[#f8e9ee] px-3 py-2">

            <p className="text-[9px] uppercase tracking-wide text-[#9b5269]">
              Commute
            </p>

            <p className="mt-0.5 text-[11px] font-semibold text-[#7f1d3a]">
              {commuteMode}
            </p>

          </div>

        </div>

      </div>


      {/* ====================================== */}
      {/* KPI CARDS */}
      {/* ====================================== */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">


        <div className="eco-card p-4">

          <p className="text-[10px] text-[#6b7280]">
            Total CO₂e
          </p>

          <p className="mt-2 text-xl font-bold text-[#7f1d3a]">
            {number(totalCO2)} kg
          </p>

        </div>


        <div className="eco-card p-4">

          <p className="text-[10px] text-[#6b7280]">
            AI Utilisation
          </p>

          <p className="mt-2 text-xl font-bold text-[#8b5bd6]">
            {aiUtilisation.toFixed(1)}%
          </p>

        </div>


        <div className="eco-card p-4">

          <p className="text-[10px] text-[#6b7280]">
            AI Cost
          </p>

          <p className="mt-2 text-xl font-bold text-[#438fdb]">
            ${number(aiCost)}
          </p>

        </div>


        <div className="eco-card p-4">

          <p className="text-[10px] text-[#6b7280]">
            Office Days
          </p>

          <p className="mt-2 text-xl font-bold text-[#111827]">
            {officeDays}
          </p>

        </div>


        <div className="eco-card p-4">

          <p className="text-[10px] text-[#6b7280]">
            WFH Days
          </p>

          <p className="mt-2 text-xl font-bold text-[#25854f]">
            {wfhDays}
          </p>

        </div>

      </div>


      {/* ====================================== */}
      {/* CARBON BREAKDOWN */}
      {/* ====================================== */}

      <div className="eco-card p-5">

        <div className="mb-5">

          <h3 className="text-[13px] font-semibold text-[#111827]">
            Carbon Breakdown
          </h3>

          <p className="mt-1 text-[10px] text-[#9ca3af]">
            Employee emissions by source
          </p>

        </div>


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">


          <div className="rounded-lg bg-[#faf7f8] p-4">

            <p className="text-[10px] text-[#6b7280]">
              Commute
            </p>

            <p className="mt-2 text-lg font-bold text-[#7f1d3a]">
              {number(commuteCO2)} kg
            </p>

          </div>


          <div className="rounded-lg bg-[#f7f9fc] p-4">

            <p className="text-[10px] text-[#6b7280]">
              Electricity
            </p>

            <p className="mt-2 text-lg font-bold text-[#438fdb]">
              {number(electricityCO2)} kg
            </p>

          </div>


          <div className="rounded-lg bg-[#fcfaf6] p-4">

            <p className="text-[10px] text-[#6b7280]">
              Printing
            </p>

            <p className="mt-2 text-lg font-bold text-[#b97826]">
              {number(printingCO2)} kg
            </p>

          </div>


          <div className="rounded-lg bg-[#faf8fc] p-4">

            <p className="text-[10px] text-[#6b7280]">
              AI
            </p>

            <p className="mt-2 text-lg font-bold text-[#8b5bd6]">
              {number(aiCO2)} kg
            </p>

          </div>

        </div>

      </div>


      {/* ====================================== */}
      {/* MONTHLY TREND */}
      {/* ====================================== */}

      <div className="eco-card p-5">

        <div className="mb-4">

          <h3 className="text-[13px] font-semibold text-[#111827]">
            Monthly CO₂e Trend
          </h3>

          <p className="mt-1 text-[10px] text-[#9ca3af]">
            Historical emissions for this employee
          </p>

        </div>


        <div className="h-[280px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={monthlyChartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#eeeeee"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 10,
                }}
              />

              <YAxis
                tick={{
                  fontSize: 10,
                }}
              />

              <Tooltip
                formatter={(value) =>
                  `${number(value)} kg`
                }
              />

              <Line
                type="monotone"
                dataKey="carbon"
                stroke="#7f1d3a"
                strokeWidth={2}
                dot={{
                  r: 4,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* ====================================== */}
      {/* DAILY TREND */}
      {/* ====================================== */}

      {dailyChartData.length > 0 && (

        <div className="eco-card p-5">

          <div className="mb-4">

            <h3 className="text-[13px] font-semibold text-[#111827]">
              Daily CO₂e
            </h3>

            <p className="mt-1 text-[10px] text-[#9ca3af]">
              Daily emissions recorded for this employee
            </p>

          </div>


          <div className="h-[260px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={dailyChartData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#eeeeee"
                />

                <XAxis
                  dataKey="date"
                  tick={{
                    fontSize: 9,
                  }}
                />

                <YAxis
                  tick={{
                    fontSize: 10,
                  }}
                />

                <Tooltip
                  formatter={(value) =>
                    `${number(value)} kg`
                  }
                />

                <Line
                  type="monotone"
                  dataKey="carbon"
                  stroke="#438fdb"
                  strokeWidth={2}
                  dot={false}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}


      {/* ====================================== */}
      {/* AI USAGE */}
      {/* ====================================== */}

      <div className="eco-card p-5">

        <div className="mb-5">

          <h3 className="text-[13px] font-semibold text-[#111827]">
            AI Usage
          </h3>

          <p className="mt-1 text-[10px] text-[#9ca3af]">
            AI credit allocation and utilisation
          </p>

        </div>


        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">


          <div>

            <p className="text-[10px] text-[#6b7280]">
              Credits Allocated
            </p>

            <p className="mt-1 text-lg font-bold text-[#111827]">
              {aiAllocated.toLocaleString()}
            </p>

          </div>


          <div>

            <p className="text-[10px] text-[#6b7280]">
              Credits Used
            </p>

            <p className="mt-1 text-lg font-bold text-[#8b5bd6]">
              {aiUsed.toLocaleString()}
            </p>

          </div>


          <div>

            <p className="text-[10px] text-[#6b7280]">
              Utilisation
            </p>

            <p className="mt-1 text-lg font-bold text-[#25854f]">
              {aiUtilisation.toFixed(1)}%
            </p>

          </div>

        </div>


        <div className="mt-5">

          <div className="mb-1 flex justify-between">

            <span className="text-[9px] text-[#9ca3af]">
              AI utilisation
            </span>

            <span className="text-[9px] font-semibold text-[#6b7280]">
              {aiUtilisation.toFixed(1)}%
            </span>

          </div>


          <div className="h-2 overflow-hidden rounded-full bg-[#edf0f2]">

            <div
              className="h-full rounded-full bg-[#8b5bd6]"
              style={{
                width: `${Math.min(
                  aiUtilisation,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

      </div>


      {/* ====================================== */}
      {/* COMMUTE */}
      {/* ====================================== */}

      <div className="eco-card p-5">

        <h3 className="text-[13px] font-semibold text-[#111827]">
          Commute Information
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>

            <p className="text-[10px] text-[#6b7280]">
              Primary commute mode
            </p>

            <p className="mt-1 text-[14px] font-semibold text-[#7f1d3a]">
              {commuteMode}
            </p>

          </div>


          <div>

            <p className="text-[10px] text-[#6b7280]">
              Total commute distance
            </p>

            <p className="mt-1 text-[14px] font-semibold text-[#111827]">
              {number(commuteMiles)} miles
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default EmployeeDetails;