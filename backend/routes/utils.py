# utils.py
def validate_items(items):
    if not items or not all('price' in item for item in items):
        raise ValueError("Each item must have a price.")
