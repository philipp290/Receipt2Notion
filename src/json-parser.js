const text = $json.input;

const posten = JSON.parse(text);

return posten.map(p => {
  return {
    json: {
      name: p.name,
      price: Number(p.price),
      date: p.date,
      category: p.category
    }
  };
});
