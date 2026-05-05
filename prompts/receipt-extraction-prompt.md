# Receipt Extraction Prompt

## Role
Analyze the receipt shown in the image.

## Output Format
Return only a valid JSON array, without Markdown and without any explanation.

Each detected item must use this format:

[
  {
    "name": "",
    "price": null,
    "date": "",
    "category": ""
  }
]

## Rules
- Each purchased item must be a separate entry.
- The name must always be the issuer/store followed by the item name, e.g. "Edeka - Strawberry Yogurt".
- "price" is the final price of the individual item as a number, e.g. 2.49.
- "date" must use the format YYYY-MM-DD.
- "category" must always be one of the categories described below.
- Do not include summary lines such as "Total", "Sum", "Cash", "Card", or payment method lines.
- "date" must use the format YYYY-MM-DD.
- "date" is the only optional field.
- If the date is not readable, use "".
- Do not output any additional fields.
- If the required information cannot be read from the image, return only the word "error".

## Categories
These are the 5 categories into which you should classify the transactions.

| Category | Description | Typical items | Typical issuers / stores |
|---|---|---|---|
| Groceries | Food and nutrition expenses, excluding restaurant visits | tomatoes, rice, salami | Lidl, Edeka, Aldi |
| Personal Care | Personal care expenses, including hairdresser visits | deodorant, shower gel, razors | DM, Rossmann, Müller |
| Car | Car-related expenses | fuel, tire change, parking | gas stations, parking providers |
| Leisure | Leisure-related expenses | amusement parks, restaurants, video games | cinemas, restaurants, entertainment providers |
| Other | Fallback category if no other category applies | unclear or mixed items | unknown or uncategorized issuers |
