# calculators/carbon_calculator.py

# --------------------------------------------------
# EcoBalance AI - Carbon Calculator
# --------------------------------------------------
# MVP emission factors.
# These are assumptions used by our synthetic dataset.
# They can later be replaced with authoritative factors.
# --------------------------------------------------

PETROL_CO2_PER_MILE = 0.170
DIESEL_CO2_PER_MILE = 0.168

BUS_CO2_PER_MILE = 0.103
TRAM_CO2_PER_MILE = 0.035

ELECTRICITY_CO2_PER_KWH = 0.207

BW_PRINT_CO2_PER_PAGE = 0.0045
COLOUR_PRINT_CO2_PER_PAGE = 0.009

AI_CO2_PER_CREDIT = 0.0005


def calculate_commute_co2(
    car_miles=0,
    bus_miles=0,
    tram_miles=0,
    fuel_type=None
):
    """
    Calculate commute-related CO2e.

    Distances are TWO-WAY commute distances.
    """

    # Car emissions
    if car_miles > 0:

        if fuel_type == "Petrol":
            car_co2 = car_miles * PETROL_CO2_PER_MILE

        elif fuel_type == "Diesel":
            car_co2 = car_miles * DIESEL_CO2_PER_MILE

        else:
            # If no valid fuel type is supplied,
            # we cannot calculate car emissions.
            car_co2 = 0

    else:
        car_co2 = 0

    # Public transport emissions
    bus_co2 = bus_miles * BUS_CO2_PER_MILE
    tram_co2 = tram_miles * TRAM_CO2_PER_MILE

    total_commute_co2 = (
        car_co2
        + bus_co2
        + tram_co2
    )

    return round(total_commute_co2, 4)


def calculate_electricity_co2(electricity_kwh):
    """
    Calculate CO2e from office desk electricity usage.
    """

    return round(
        electricity_kwh * ELECTRICITY_CO2_PER_KWH,
        4
    )


def calculate_printing_co2(
    bw_pages=0,
    colour_pages=0
):
    """
    Calculate CO2e from printing.
    """

    bw_co2 = (
        bw_pages
        * BW_PRINT_CO2_PER_PAGE
    )

    colour_co2 = (
        colour_pages
        * COLOUR_PRINT_CO2_PER_PAGE
    )

    return round(
        bw_co2 + colour_co2,
        4
    )


def calculate_ai_co2(ai_credits=0):
    """
    Calculate estimated AI-related CO2e.
    """

    return round(
        ai_credits * AI_CO2_PER_CREDIT,
        4
    )


def calculate_total_co2(
    commute_co2,
    electricity_kwh,
    bw_pages,
    colour_pages,
    ai_credits
):
    """
    Calculate complete employee carbon footprint.
    """

    electricity_co2 = calculate_electricity_co2(
        electricity_kwh
    )

    printing_co2 = calculate_printing_co2(
        bw_pages,
        colour_pages
    )

    ai_co2 = calculate_ai_co2(
        ai_credits
    )

    total_co2 = (
        commute_co2
        + electricity_co2
        + printing_co2
        + ai_co2
    )

    return {
        "commute_co2": round(commute_co2, 4),
        "electricity_co2": electricity_co2,
        "printing_co2": printing_co2,
        "ai_co2": ai_co2,
        "total_co2": round(total_co2, 4)
    }