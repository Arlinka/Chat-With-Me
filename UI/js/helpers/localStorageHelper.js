export default function localStorageHelper({ key, value }) {
  if (!value) {
    return JSON.parse(localStorage.getItem(key));
  }
  return localStorage.setItem(key, JSON.stringify(value));
}
