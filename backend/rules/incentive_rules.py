# rules/incentive_rules.py

# --------------------------------------------------
# EcoBalance AI - Incentive Eligibility Rules
# --------------------------------------------------

MAX_AI_UTILISATION = 0.90


def calculate_incentive(
    baseline_co2,
    current_co2,
    ai_utilisation,
    data_valid=True
):
    """
    Determine whether an employee qualifies
    for a sustainability incentive.

    Requirements:
    1. Carbon reduction >= 10%
    2. AI utilisation <= 90%
    3. Employee data must be valid
    """

    if baseline_co2 <= 0:

        return {
            "eligible": False,
            "carbon_reduction_percent": 0,
            "tier": "Not Eligible",
            "reward": 0,
            "reason": "No valid carbon baseline."
        }

    # ----------------------------------------------
    # Carbon reduction
    # ----------------------------------------------

    reduction = (
        (baseline_co2 - current_co2)
        / baseline_co2
    ) * 100

    # ----------------------------------------------
    # Eligibility checks
    # ----------------------------------------------

    if not data_valid:

        return {
            "eligible": False,
            "carbon_reduction_percent":
                round(reduction, 2),

            "tier": "Not Eligible",
            "reward": 0,

            "reason":
                "Employee data did not pass validation."
        }

    if ai_utilisation > MAX_AI_UTILISATION:

        return {
            "eligible": False,
            "carbon_reduction_percent":
                round(reduction, 2),

            "tier": "Not Eligible",
            "reward": 0,

            "reason":
                "AI utilisation is above the 90% "
                "incentive threshold."
        }

    # ----------------------------------------------
    # Incentive tiers
    # ----------------------------------------------

    if reduction > 20:

        tier = "Gold"
        reward = 50
        eligible = True

    elif reduction >= 15:

        tier = "Silver"
        reward = 40
        eligible = True

    elif reduction >= 10:

        tier = "Green"
        reward = 25
        eligible = True

    else:

        tier = "Not Eligible"
        reward = 0
        eligible = False

    # ----------------------------------------------
    # Response
    # ----------------------------------------------

    if eligible:

        reason = (
            f"Carbon emissions decreased by "
            f"{reduction:.1f}% from baseline."
        )

    else:

        reason = (
            "Carbon reduction has not yet reached "
            "the 10% incentive threshold."
        )

    return {
        "eligible": eligible,

        "carbon_reduction_percent":
            round(reduction, 2),

        "tier": tier,

        "reward": reward,

        "reason": reason
    }