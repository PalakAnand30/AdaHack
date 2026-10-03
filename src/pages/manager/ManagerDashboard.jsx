import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import KPICard from "../../components/KPICard";
import ChartCard from "../../components/ChartCard";
import RecommendationCard from "../../components/RecommendationCard";

import managerSummary from "../../data/managerSummary.json";
import monthlyEmployee from "../../data/monthlyEmployee.json";


function ManagerDashboard() {

  const [selectedManager, setSelectedManager] = useState("MGR01");


  // --------------------------------------------------
  // AVAILABLE MANAGERS
  // --------------------------------------------------

  const managers = useMemo(() => {

    return [
      ...new Set(
        managerSummary.map((item) => item["Manager ID"])
      ),
    ];

  }, []);


  // --------------------------------------------------
  // SELECTED MANAGER DATA
  // --------------------------------------------------

  const managerData = useMemo(() => {

    return managerSummary.filter(
      (item) => item["Manager ID"] === selectedManager
    );

  }, [selectedManager]);


  // --------------------------------------------------
  // EMPLOYEES BELONGING TO MANAGER
  // --------------------------------------------------

  const teamData = useMemo(() => {

    return monthlyEmployee.filter(
      (employee) =>
        employee["Manager ID"] === selectedManager
    );

  }, [selectedManager]);


  // --------------------------------------------------
  // TOTAL EMPLOYEES
  // --------------------------------------------------

  const employeeCount = useMemo(() => {

    return new Set(
      teamData.map((employee) => employee["Employee ID"])
    ).size;

  }, [teamData]);


  // --------------------------------------------------
  // TOTAL CO2
  // --------------------------------------------------

  const totalCO2 = useMemo(() => {

    return managerData.reduce(
      (sum, item) =>
        sum + Number(item["Total CO2e"] || 0),
      0
    );

  }, [managerData]);


  // --------------------------------------------------
  // AI CREDITS
  // --------------------------------------------------

  const aiAllocated = useMemo(() => {

    return teamData.reduce(
      (sum, employee) =>
        sum + Number(employee["AI Credits Allocated"] || 0),
      0
    );

  }, [teamData]);


  const aiUsed = useMemo(() => {

    return teamData.reduce(
      (sum, employee) =>
        sum + Number(employee["AI Credits Used"] || 0),
      0
    );

  }, [teamData]);


  const aiUtilisation =
    aiAllocated > 0
      ? (aiUsed / aiAllocated) * 100
      : 0;


  // --------------------------------------------------
  // CO2 BREAKDOWN
  // --------------------------------------------------

  const carbonData = useMemo(() => {

    return [
      {
        name: "Commute",
        value: managerData.reduce(
          (sum, item) =>
            sum + Number(item["Commute CO2e"] || 0),
          0
        ),
      },

      {
        name: "Electricity",
        value: managerData.reduce(
          (sum, item) =>
            sum + Number(item["Electricity CO2e"] || 0),
          0
        ),
      },

      {
        name: "Printing",
        value: managerData.reduce(
          (sum, item) =>
            sum + Number(item["Printing CO2e"] || 0),
          0
        ),
      },

      {
        name: "AI Usage",
        value: managerData.reduce(
          (sum, item) =>
            sum + Number(item["AI CO2e"] || 0),
          0
        ),
      },
    ];

  }, [managerData]);


  // --------------------------------------------------
  // CHART COLOURS
  // --------------------------------------------------

  const carbonColors = [
    "#48ad7c",
    "#438fdb",
    "#f3a15b",
    "#8b5bd6",
  ];


  // --------------------------------------------------
  // FORMAT NUMBER
  // --------------------------------------------------

  const formatNumber = (value, decimals = 1) => {

    return Number(value || 0).toLocaleString(
      "en-GB",
      {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }
    );

  };


  return (

    <div className="space-y-5 p-5 lg:p-6">

      {/* -------------------------------------------- */}
      {/* PAGE HEADER */}
      {/* -------------------------------------------- */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div>

          <h2 className="text-[20px] font-bold text-[#111827]">
            Team Dashboard
          </h2>

          <p className="mt-1 text-[11px] text-[#6b7280]">
            Sustainability and productivity overview
          </p>

        </div>


        {/* MANAGER SELECTOR */}

        <div className="flex items-center gap-2">

          <span className="text-[10px] font-medium text-[#6b7280]">
            Manager
          </span>

          <select
            value={selectedManager}
            onChange={(event) =>
              setSelectedManager(event.target.value)
            }
            className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[11px] font-medium text-[#374151] outline-none focus:border-[#7f1d3a]"
          >

            {managers.map((manager) => (

              <option
                key={manager}
                value={manager}
              >
                {manager}
              </option>

            ))}

          </select>

        </div>

      </div>


      {/* -------------------------------------------- */}
      {/* KPI CARDS */}
      {/* -------------------------------------------- */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">

        <KPICard
          title="Employees"
          value={employeeCount}
          subtitle="Team members"
          accent="burgundy"
        />

        <KPICard
          title="AI Credits Allocated"
          value={aiAllocated.toLocaleString()}
          subtitle="Total allocated"
          accent="blue"
        />

        <KPICard
          title="AI Credits Used"
          value={aiUsed.toLocaleString()}
          subtitle={`${aiUtilisation.toFixed(1)}% utilised`}
          percentage={aiUtilisation}
          accent="purple"
        />

        <KPICard
          title="AI Credits Unused"
          value={Math.max(aiAllocated - aiUsed, 0).toLocaleString()}
          subtitle="Remaining credits"
          accent="green"
        />

        <KPICard
          title="Total CO₂e"
          value={`${formatNumber(totalCO2)} kg`}
          subtitle="Team emissions"
          accent="green"
        />

      </div>


      {/* -------------------------------------------- */}
      {/* CARBON + PRODUCTIVITY */}
      {/* -------------------------------------------- */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">


        {/* CARBON BREAKDOWN */}

        <ChartCard
          title="CO₂e by Source"
          subtitle={`Total: ${formatNumber(totalCO2)} kg CO₂e`}
        >

          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">

            <div className="h-[230px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={carbonData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={2}
                  >

                    {carbonData.map(
                      (entry, index) => (

                        <Cell
                          key={entry.name}
                          fill={
                            carbonColors[index]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `${formatNumber(value)} kg`
                    }
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>


            <div className="space-y-4">

              {carbonData.map(
                (item, index) => {

                  const percentage =
                    totalCO2 > 0
                      ? (item.value / totalCO2) * 100
                      : 0;

                  return (

                    <div
                      key={item.name}
                      className="space-y-1"
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                carbonColors[index],
                            }}
                          />

                          <span className="text-[10px] text-[#4b5563]">
                            {item.name}
                          </span>

                        </div>

                        <span className="text-[10px] font-semibold text-[#374151]">
                          {formatNumber(item.value)} kg
                        </span>

                      </div>


                      <div className="h-1.5 overflow-hidden rounded-full bg-[#edf0f2]">

                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor:
                              carbonColors[index],
                          }}
                        />

                      </div>


                      <p className="text-right text-[9px] text-[#9ca3af]">
                        {percentage.toFixed(1)}%
                      </p>

                    </div>

                  );

                }
              )}

            </div>

          </div>

        </ChartCard>


        {/* TEAM INFORMATION */}

        <ChartCard
          title="Team Overview"
          subtitle="Current manager information"
        >

          <div className="grid grid-cols-2 gap-3">

            <div className="rounded-lg bg-[#faf7f8] p-4">

              <p className="text-[10px] text-[#6b7280]">
                Manager
              </p>

              <p className="mt-2 text-lg font-bold text-[#7f1d3a]">
                {selectedManager}
              </p>

            </div>


            <div className="rounded-lg bg-[#f7faf9] p-4">

              <p className="text-[10px] text-[#6b7280]">
                Employees
              </p>

              <p className="mt-2 text-lg font-bold text-[#111827]">
                {employeeCount}
              </p>

            </div>


            <div className="rounded-lg bg-[#f7f9fc] p-4">

              <p className="text-[10px] text-[#6b7280]">
                AI Utilisation
              </p>

              <p className="mt-2 text-lg font-bold text-[#438fdb]">
                {aiUtilisation.toFixed(1)}%
              </p>

            </div>


            <div className="rounded-lg bg-[#faf8fc] p-4">

              <p className="text-[10px] text-[#6b7280]">
                Total CO₂e
              </p>

              <p className="mt-2 text-lg font-bold text-[#8b5bd6]">
                {formatNumber(totalCO2)} kg
              </p>

            </div>

          </div>

        </ChartCard>

      </div>


      {/* -------------------------------------------- */}
      {/* EMISSION CARDS */}
      {/* -------------------------------------------- */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

        {carbonData.map((item, index) => (

          <KPICard
            key={item.name}
            title={`${item.name} CO₂e`}
            value={`${formatNumber(item.value)} kg`}
            subtitle="Team emissions"
            percentage={
              totalCO2 > 0
                ? (item.value / totalCO2) * 100
                : 0
            }
            accent={
              index === 0
                ? "green"
                : index === 1
                ? "blue"
                : index === 2
                ? "orange"
                : "purple"
            }
          />

        ))}

      </div>


      {/* -------------------------------------------- */}
      {/* RECOMMENDATIONS */}
      {/* -------------------------------------------- */}

      <RecommendationCard />

    </div>

  );

}

export default ManagerDashboard;