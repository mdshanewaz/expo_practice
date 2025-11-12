// utils/api.js
const API_URL = "https://your-django-api.com/api/";

export async function fetchBooks() {
  const res = await fetch(`${API_URL}books/`);
  return res.json();
}