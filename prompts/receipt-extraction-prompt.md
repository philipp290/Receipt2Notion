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

1.) Groceries
All expenses related to food and nutrition, excluding restaurant visits.
Typical item names include: tomatoes, rice, salami, ...
Typical issuers/stores include: Lidl, Edeka, Aldi, ...

2.) Personal Care
Everything related to personal care, including hairdresser visits.
Typical item names include: deodorant, shower gel, razors, ...
Typical issuers/stores include: DM, Rossmann, Müller, ...

3.) Car
All expenses related to my car.
Typical item names include: fuel, tire change, parking, ...

4.) Leisure
All expenses related to leisure activities.
Typical item names include: amusement park, restaurant, video games, ...

5.) Other
Use this category only if an item cannot be assigned to any other category.
