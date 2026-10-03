# main.py

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

from calculators.carbon_calculator import (
    calculate_commute_co2,
    calculate_total_co2
)

from calculators.cost_calculator import (
    calculate_ai_cost
)

from calculators.ai_credit_optimizer import (
    optimise_ai_credits
)

from rules.incentive_rules import (
    calculate_incentive
)

from rules.recommendation_rules import (
    generate_recommendations
)


# ==================================================
# APP
# ==================================================

app = FastAPI(
    title="EcoBalance AI",
    description=(
        "Sustainability intelligence API for "
        "employee and manager dashboards."
    ),
    version="1.0.0"
)


# ==================================================
# REQUEST MODEL
# ==================================================

class EmployeeData(BaseModel):

    employee_id: str
    manager_id: str

    # Commute
    car_miles: float = 0
    bus_miles: float = 0
    tram_miles: float = 0

    fuel_type: Optional[str] = None

    # Electricity
    electricity_kwh: float = 0

    # Printing
    bw_pages: int = 0
    colour_pages: int = 0

    # AI
    ai_credits_allocated: int = 3000
    ai_credits_used: int = 0

    # Month 1 baseline
    baseline_co2: float


# ==================================================
# HEALTH CHECK
# ==================================================

@app.get("/")
def home():

    return {
        "app": "EcoBalance AI",
        "status": "running"
    }


# ==================================================
# FULL EMPLOYEE DASHBOARD
# ==================================================

@app.post("/dashboard/employee")
def employee_dashboard(
    employee: EmployeeData
):

    # ----------------------------------------------
    # CARBON
    # ----------------------------------------------

    commute_co2 = calculate_commute_co2(

        car_miles=
            employee.car_miles,

        bus_miles=
            employee.bus_miles,

        tram_miles=
            employee.tram_miles,

        fuel_type=
            employee.fuel_type
    )

    carbon = calculate_total_co2(

        commute_co2=
            commute_co2,

        electricity_kwh=
            employee.electricity_kwh,

        bw_pages=
            employee.bw_pages,

        colour_pages=
            employee.colour_pages,

        ai_credits=
            employee.ai_credits_used
    )


    # ----------------------------------------------
    # AI USAGE
    # ----------------------------------------------

    allocated = (
        employee.ai_credits_allocated
    )

    used = (
        employee.ai_credits_used
    )

    unused = max(
        allocated - used,
        0
    )

    if allocated > 0:

        ai_utilisation = (
            used / allocated
        )

    else:

        ai_utilisation = 0


    # ----------------------------------------------
    # COST
    # ----------------------------------------------

    cost = calculate_ai_cost(
        allocated=allocated,
        used=used
    )


    # ----------------------------------------------
    # AI OPTIMISATION
    # ----------------------------------------------

    ai_optimisation = (
        optimise_ai_credits(
            allocated=allocated,
            used=used
        )
    )


    # ----------------------------------------------
    # INCENTIVE
    # ----------------------------------------------

    incentive = calculate_incentive(

        baseline_co2=
            employee.baseline_co2,

        current_co2=
            carbon["total_co2"],

        ai_utilisation=
            ai_utilisation
    )


    # ----------------------------------------------
    # CARBON BREAKDOWN
    # ----------------------------------------------

    total_co2 = carbon["total_co2"]

    if total_co2 > 0:

        commute_percentage = (
            carbon["commute_co2"]
            / total_co2
        )

        electricity_percentage = (
            carbon["electricity_co2"]
            / total_co2
        )

        printing_percentage = (
            carbon["printing_co2"]
            / total_co2
        )

        ai_percentage = (
            carbon["ai_co2"]
            / total_co2
        )

    else:

        commute_percentage = 0
        electricity_percentage = 0
        printing_percentage = 0
        ai_percentage = 0


    # ----------------------------------------------
    # RECOMMENDATIONS
    # ----------------------------------------------

    recommendation_data = {

        "ai_utilisation":
            ai_utilisation,

        "commute_percentage":
            commute_percentage,

        "electricity_percentage":
            electricity_percentage,

        "printing_percentage":
            printing_percentage,

        "ai_percentage":
            ai_percentage
    }

    recommendations = (
        generate_recommendations(
            recommendation_data
        )
    )


    # ----------------------------------------------
    # CARBON CHANGE FROM BASELINE
    # ----------------------------------------------

    if employee.baseline_co2 > 0:

        carbon_change = (

            (
                carbon["total_co2"]
                - employee.baseline_co2
            )

            / employee.baseline_co2

        ) * 100

    else:

        carbon_change = 0


    # ==================================================
    # FINAL JSON RESPONSE
    # ==================================================

    return {

        "employee": {

            "employee_id":
                employee.employee_id,

            "manager_id":
                employee.manager_id
        },


        "ai_usage": {

            "allocated":
                allocated,

            "used":
                used,

            "unused":
                unused,

            "utilisation_percent":
                round(
                    ai_utilisation * 100,
                    2
                )
        },


        "carbon": {

            "commute_co2":
                round(
                    carbon["commute_co2"],
                    3
                ),

            "electricity_co2":
                round(
                    carbon["electricity_co2"],
                    3
                ),

            "printing_co2":
                round(
                    carbon["printing_co2"],
                    3
                ),

            "ai_co2":
                round(
                    carbon["ai_co2"],
                    3
                ),

            "total_co2":
                round(
                    carbon["total_co2"],
                    3
                ),

            "baseline_co2":
                round(
                    employee.baseline_co2,
                    3
                ),

            "change_from_baseline_percent":
                round(
                    carbon_change,
                    2
                )
        },


        "carbon_breakdown_percent": {

            "commute":
                round(
                    commute_percentage * 100,
                    2
                ),

            "electricity":
                round(
                    electricity_percentage * 100,
                    2
                ),

            "printing":
                round(
                    printing_percentage * 100,
                    2
                ),

            "ai":
                round(
                    ai_percentage * 100,
                    2
                )
        },


        "cost":
            cost,


        "ai_optimisation":
            ai_optimisation,


        "incentive":
            incentive,


        "recommendations":
            recommendations
    }