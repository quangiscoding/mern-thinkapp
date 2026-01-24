const fetchJSON = async (url, options = {}) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const { message } = await res.json();

    const error = new Error(message || "Request failed!");
    error.status = res.status;

    throw error;
  }

  return res.status === 204 ? null : res.json();
};

export async function createNote({ title, content }) {
  return fetchJSON("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });
}
