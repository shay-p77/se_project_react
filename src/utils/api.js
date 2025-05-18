const baseUrl = "http://localhost:3002"; // Using 3002 since json-server runs there

export function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (!res.ok) throw new Error(`Error fetching items: ${res.status}`);
    return res.json();
  });
}

export function addItem({ name, link, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link, weather }),
  }).then((res) => {
    if (!res.ok) throw new Error(`Error adding item: ${res.status}`);
    return res.json();
  });
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error(`Error deleting item: ${res.status}`);
  });
}
