# rules/recommendation_rules.py

# --------------------------------------------------
# EcoBalance AI - Recommendation Engine
# --------------------------------------------------


def generate_recommendations(data):
    """
    Generate sustainability recommendations
    from employee metrics.

    Expected values in data:

    ai_utilisation
    commute_percentage
    electricity_percentage
    printing_percentage
    ai_percentage
    """

    recommendations = []

    # ----------------------------------------------
    # AI usage
    # ----------------------------------------------

    if data["ai_utilisation"] < 0.60:

        recommendations.append({
            "category": "AI",
            "priority": "High",
            "message":
                "AI utilisation is below 60%. "
                "Consider reducing allocated AI credits."
        })

    elif data["ai_utilisation"] < 0.75:

        recommendations.append({
            "category": "AI",
            "priority": "Medium",
            "message":
                "AI utilisation is below 75%. "
                "Review whether the current allocation "
                "can be reduced."
        })

    # ----------------------------------------------
    # Commute
    # ----------------------------------------------

    if data["commute_percentage"] > 0.50:

        recommendations.append({
            "category": "Commute",
            "priority": "High",
            "message":
                "Commuting contributes more than 50% "
                "of your carbon footprint. Consider "
                "lower-carbon transport options where feasible."
        })

    # ----------------------------------------------
    # Electricity
    # ----------------------------------------------

    if data["electricity_percentage"] > 0.20:

        recommendations.append({
            "category": "Electricity",
            "priority": "Medium",
            "message":
                "Office electricity contributes more than "
                "20% of your carbon footprint. Review "
                "desk electricity consumption."
        })

    # ----------------------------------------------
    # Printing
    # ----------------------------------------------

    if data["printing_percentage"] > 0.15:

        recommendations.append({
            "category": "Printing",
            "priority": "Medium",
            "message":
                "Printing contributes more than 15% "
                "of your carbon footprint. Reduce "
                "unnecessary printing and use duplex printing."
        })

    # ----------------------------------------------
    # If everything looks reasonable
    # ----------------------------------------------

    if not recommendations:

        recommendations.append({
            "category": "General",
            "priority": "Low",
            "message":
                "Your current sustainability metrics "
                "are within the recommended ranges. "
                "Continue monitoring your usage."
        })

    return recommendations