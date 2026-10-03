# calculators/ai_credit_optimizer.py

import math


def optimise_ai_credits(
    allocated,
    used,
    safety_buffer=0.15
):
    """
    Analyse AI credit utilisation and recommend
    an allocation for the following month.

    Recommended allocation:
    usage + 15% safety buffer,
    rounded UP to nearest 100 credits.
    """

    if allocated <= 0:
        return {
            "utilisation_percent": 0,
            "status": "No allocation",
            "recommended_credits": 0,
            "potential_credit_reduction": 0,
            "recommendation":
                "No AI credits are currently allocated."
        }

    utilisation = (
        used / allocated
    )

    utilisation_percent = (
        utilisation * 100
    )

    # ----------------------------------------------
    # Classify utilisation
    # ----------------------------------------------

    if utilisation < 0.60:

        status = "Very Low"

        recommendation = (
            "AI credit utilisation is very low. "
            "Reduce the allocation."
        )

    elif utilisation < 0.75:

        status = "Low"

        recommendation = (
            "AI credit utilisation is below target. "
            "Consider reducing the allocation."
        )

    elif utilisation < 0.90:

        status = "Healthy"

        recommendation = (
            "AI credit utilisation is healthy. "
            "Maintain the current allocation."
        )

    elif utilisation < 1.00:

        status = "High"

        recommendation = (
            "AI credit utilisation is high. "
            "Monitor usage."
        )

    else:

        status = "At Limit"

        recommendation = (
            "AI credit allocation is fully utilised. "
            "Review whether additional credits are required."
        )

    # ----------------------------------------------
    # Recommended future allocation
    # ----------------------------------------------

    recommended = (
        used * (1 + safety_buffer)
    )

    # Round UP to nearest 100
    recommended = (
        math.ceil(recommended / 100)
        * 100
    )

    # Don't recommend more than the existing
    # allocation in this MVP.
    recommended = min(
        recommended,
        allocated
    )

    potential_reduction = max(
        allocated - recommended,
        0
    )

    return {

        "utilisation_percent":
            round(utilisation_percent, 2),

        "status":
            status,

        "recommended_credits":
            recommended,

        "potential_credit_reduction":
            potential_reduction,

        "recommendation":
            recommendation
    }