/**
 * Validates whether the AI response contains a valid JSON array
 * of receipt items before further processing in the n8n workflow.
 */

const text = $input.first().json['0'].content[0].text;

function isValidJsonString(text) {
  const allowedKeys = ["name", "price", "date", "category"];
  const allowedCategories = ["Groceries", "Personal Care", "Leisure", "Car", "Other"];

  let data;

  try {
    data = JSON.parse(text);
  } catch (error) {
    return false;
  }

  if (!Array.isArray(data)) return false;
  if (data.length === 0) return false;

  for (const item of data) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;

    const keys = Object.keys(item);

    if (keys.length !== 4) return false;

    for (const key of keys) {
      if (!allowedKeys.includes(key)) return false;
    }
    for (const key of allowedKeys) {
      if (!keys.includes(key)) return false;
    }

    if (typeof item.name !== "string" || item.name.trim() === "") return false;

    if (
      item.price === null ||
      item.price === undefined ||
      String(item.price).trim() === ""
    ) return false;

    const priceNumber = Number(String(item.price).trim().replace(",", "."));
    if (Number.isNaN(priceNumber) || priceNumber <= 0) return false;

    if (
      item.date !== null &&
      item.date !== undefined &&
      String(item.date).trim() !== ""
    ) {
      const dateString = String(item.date).trim();

      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;

       const date = new Date(dateString + "T00:00:00Z");

  const isValidDate =
    date.getUTCFullYear() === Number(dateString.slice(0, 4)) &&
    date.getUTCMonth() + 1 === Number(dateString.slice(5, 7)) &&
    date.getUTCDate() === Number(dateString.slice(8, 10));

  if (!isValidDate) return false;
    }

    if (typeof item.category !== "string" || item.category.trim() === "") return false;
    if (!allowedCategories.includes(item.category.trim())) return false;
  }

  return true;
}

return [
  {
    json: {
      input: text,
      valid: isValidJsonString(text)
    }
  }
];
