# calculators/cost_calculator.py

# --------------------------------------------------
# EcoBalance AI - Cost Calculator
# --------------------------------------------------

DEFAULT_AI_CREDITS = 3000
DEFAULT_AI_COST = 120

COST_PER_AI_CREDIT = (
    DEFAULT_AI_COST / DEFAULT_AI_CREDITS
)


def calculate_ai_cost(
    allocated,
    used
):
    """
    Calculate the cost/value of AI credit usage.

    3000 credits = $120
    Therefore:
    1 credit = $0.04
    """

    if allocated < 0 or used < 0:
        raise ValueError(
            "AI credits cannot be negative."
        )

    unused = max(
        allocated - used,
        0
    )

    allocated_cost = (
        allocated * COST_PER_AI_CREDIT
    )

    used_cost = (
        used * COST_PER_AI_CREDIT
    )

    unused_value = (
        unused * COST_PER_AI_CREDIT
    )

    return {
        "cost_per_credit":
            round(COST_PER_AI_CREDIT, 4),

        "allocated_cost":
            round(allocated_cost, 2),

        "used_cost":
            round(used_cost, 2),

        "unused_credits":
            unused,

        "unused_value":
            round(unused_value, 2)
    }