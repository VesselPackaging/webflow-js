import re

data = "10 layers of Heart of Gold - 250ml Slim - Printed/Imprimée. 15 layers of Merlot - 250ml Slim - Printed/Imprimée."

def split_data(data):
    delimiters = ["."]
    sections = []

    # Construct the regular expression pattern by joining the delimiters with the "|" OR operator
    pattern = "|".join(map(re.escape, delimiters))

    # Split the data using the pattern
    split_data = re.split(pattern, data, flags=re.IGNORECASE)

    # Remove leading/trailing spaces and exclude empty sections
    sections = [section.strip() for section in split_data if section.strip() != ""]

    formatted_sections = "<br>".join(sections)

    return {'formatted_sections': formatted_sections}

print(split_data(data))


